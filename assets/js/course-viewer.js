// assets/js/course-viewer.js
// Course and module viewer with progress tracking

import { supabase } from './supabase-client.js';
import { requireAuth, signOut } from './auth-check.js';

let currentUser = null;
let currentCourse = null;
let modules = [];
let currentModuleIndex = 0;
let studentProfile = null;
let completedModules = new Set();

// Get course ID from URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Course viewer loading...');
    
    if (!courseId) {
        alert('No course selected');
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Check authentication
    currentUser = await requireAuth();
    if (!currentUser) return;
    
    // Load data
    await loadStudentProfile();
    await loadCourse();
    await loadModules();
    await loadProgress();
    
    // Setup navigation
    setupNavigation();
    
    // Load first module or requested module
    const moduleParam = urlParams.get('module');
    if (moduleParam) {
        const moduleIndex = parseInt(moduleParam) - 1;
        if (moduleIndex >= 0 && moduleIndex < modules.length) {
            currentModuleIndex = moduleIndex;
        }
    }
    
    displayModule(currentModuleIndex);
    hideLoading();
});

// Load student profile
async function loadStudentProfile() {
    try {
        const { data, error } = await supabase
            .from('student_profiles')
            .select('id, full_name')
            .eq('user_id', currentUser.id)
            .single();
        
        if (error) throw error;
        studentProfile = data;
        
    } catch (error) {
        console.error('Failed to load profile:', error);
    }
}

// Load course details
async function loadCourse() {
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();
        
        if (error) throw error;
        
        currentCourse = data;
        document.getElementById('courseTitle').textContent = data.title;
        
    } catch (error) {
        console.error('Failed to load course:', error);
        alert('Failed to load course');
        window.location.href = 'dashboard.html';
    }
}

// Load course modules
async function loadModules() {
    try {
        const { data, error } = await supabase
            .from('course_modules')
            .select('*')
            .eq('course_id', courseId)
            .eq('is_published', true)
            .order('order_number', { ascending: true });
        
        if (error) throw error;
        
        modules = data || [];
        renderModuleList();
        
    } catch (error) {
        console.error('Failed to load modules:', error);
    }
}

// Load student progress
async function loadProgress() {
    if (!studentProfile) return;
    
    try {
        const { data, error } = await supabase
            .from('student_progress')
            .select('module_id, completed')
            .eq('student_id', studentProfile.id)
            .eq('completed', true);
        
        if (error) throw error;
        
        completedModules = new Set((data || []).map(p => p.module_id));
        updateProgressBar();
        
    } catch (error) {
        console.error('Failed to load progress:', error);
    }
}

// Render module list in sidebar
function renderModuleList() {
    const moduleList = document.getElementById('moduleList');
    
    const html = modules.map((module, index) => {
        const isCompleted = completedModules.has(module.id);
        const isActive = index === currentModuleIndex;
        
        return `
            <li class="module-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                data-index="${index}">
                <a class="module-link" onclick="selectModule(${index})">
                    <div class="module-number">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : index + 1}
                    </div>
                    <div class="module-title-text">${module.title}</div>
                </a>
            </li>
        `;
    }).join('');
    
    moduleList.innerHTML = html;
}

// Display selected module
function displayModule(index) {
    if (index < 0 || index >= modules.length) return;
    
    currentModuleIndex = index;
    const module = modules[index];
    
    // Update sidebar
    renderModuleList();
    
    // Update module content
    document.getElementById('moduleTitle').textContent = module.title;
    document.getElementById('moduleDuration').innerHTML = `<i class="fas fa-clock"></i> ${module.duration_minutes || 60} min`;
    document.getElementById('moduleOrder').innerHTML = `<i class="fas fa-book"></i> Module ${module.order_number}`;
    document.getElementById('moduleBody').innerHTML = module.content || '<p>Content coming soon...</p>';
    
    // Update completion status
    const isCompleted = completedModules.has(module.id);
    const statusEl = document.getElementById('completionStatus');
    if (isCompleted) {
        statusEl.innerHTML = '<span class="completion-badge"><i class="fas fa-check-circle"></i> Completed</span>';
    } else {
        statusEl.innerHTML = '';
    }
    
    // Update buttons
    updateNavigationButtons();
    
    // Scroll to top
    document.querySelector('.module-content-area').scrollTop = 0;
    
    // Track time spent (start timer)
    startModuleTimer();
}

// Select module
window.selectModule = function(index) {
    displayModule(index);
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const completeButton = document.getElementById('completeButton');
    
    // Previous button
    if (currentModuleIndex > 0) {
        prevButton.style.display = 'flex';
        prevButton.onclick = () => displayModule(currentModuleIndex - 1);
    } else {
        prevButton.style.display = 'none';
    }
    
    // Next button
    if (currentModuleIndex < modules.length - 1) {
        nextButton.style.display = 'flex';
        nextButton.onclick = () => displayModule(currentModuleIndex + 1);
    } else {
        nextButton.style.display = 'none';
    }
    
    // Complete button
    const currentModule = modules[currentModuleIndex];
    const isCompleted = completedModules.has(currentModule.id);
    
    if (isCompleted) {
        completeButton.innerHTML = '<i class="fas fa-check-circle"></i> <span>Completed</span>';
        completeButton.classList.add('btn-success');
        completeButton.disabled = true;
    } else {
        completeButton.innerHTML = '<i class="fas fa-check"></i> <span>Mark as Complete</span>';
        completeButton.classList.remove('btn-success');
        completeButton.disabled = false;
        completeButton.onclick = markModuleComplete;
    }
}

// Mark module as complete
async function markModuleComplete() {
    if (!studentProfile) return;
    
    const module = modules[currentModuleIndex];
    const completeButton = document.getElementById('completeButton');
    
    completeButton.disabled = true;
    completeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Saving...</span>';
    
    try {
        // Check if progress record exists
        const { data: existing, error: checkError } = await supabase
            .from('student_progress')
            .select('id, completed')
            .eq('student_id', studentProfile.id)
            .eq('module_id', module.id)
            .maybeSingle();
        
        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }
        
        if (existing) {
            // Update existing record
            const { error: updateError } = await supabase
                .from('student_progress')
                .update({
                    completed: true,
                    completed_at: new Date().toISOString(),
                    time_spent_minutes: (existing.time_spent_minutes || 0) + getModuleTimeSpent()
                })
                .eq('id', existing.id);
            
            if (updateError) throw updateError;
            
        } else {
            // Insert new record
            const { error: insertError } = await supabase
                .from('student_progress')
                .insert([{
                    student_id: studentProfile.id,
                    module_id: module.id,
                    completed: true,
                    completed_at: new Date().toISOString(),
                    time_spent_minutes: getModuleTimeSpent()
                }]);
            
            if (insertError) throw insertError;
        }
        
        // Update local state
        completedModules.add(module.id);
        updateProgressBar();
        updateNavigationButtons();
        renderModuleList();
        
        // Show success message
        showToast('Module completed! ✓');
        
        // Auto-advance to next module after 1.5 seconds
        if (currentModuleIndex < modules.length - 1) {
            setTimeout(() => {
                displayModule(currentModuleIndex + 1);
            }, 1500);
        }
        
    } catch (error) {
        console.error('Failed to mark complete:', error);
        alert('Failed to save progress. Please try again.');
        
        completeButton.disabled = false;
        completeButton.innerHTML = '<i class="fas fa-check"></i> <span>Mark as Complete</span>';
    }
}

// Update progress bar
function updateProgressBar() {
    const total = modules.length;
    const completed = completedModules.size;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressText').textContent = percentage + '%';
}

// Module timer (track time spent)
let moduleStartTime = null;

function startModuleTimer() {
    moduleStartTime = Date.now();
}

function getModuleTimeSpent() {
    if (!moduleStartTime) return 0;
    const timeSpent = Math.round((Date.now() - moduleStartTime) / 60000); // Convert to minutes
    return Math.max(1, timeSpent); // At least 1 minute
}

// Setup navigation
function setupNavigation() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentModuleIndex > 0) {
            displayModule(currentModuleIndex - 1);
        } else if (e.key === 'ArrowRight' && currentModuleIndex < modules.length - 1) {
            displayModule(currentModuleIndex + 1);
        }
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Logout handler
window.handleLogout = async function() {
    if (confirm('Are you sure you want to logout?')) {
        await signOut();
    }
}

// Hide loading state
function hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('moduleContent').style.display = 'block';
}

console.log('Course viewer script loaded');