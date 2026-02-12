// lms/assets/js/dashboard.js (or assets/js/dashboard.js if in root)
// Dashboard logic with authentication and data loading

import { supabase } from './supabase-client.js';
import { requireAuth, checkPaymentStatus, getUserCourses, signOut, displayPaymentStatus } from './auth-check.js';

let currentUser = null;
let userProfile = null;
let paymentStatus = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Dashboard loading...');
    
    try {
        // Check authentication
        currentUser = await requireAuth();
        
        if (!currentUser) {
            // requireAuth will redirect to login
            return;
        }
        
        console.log('User authenticated:', currentUser.id);
        
        // Load user data
        await loadUserProfile();
        await loadPaymentStatus();
        await loadCourses();
        await loadStats();
        
        // Hide loading overlay
        hideLoading();
        
    } catch (error) {
        console.error('Dashboard initialization error:', error);
        hideLoading();
    }
});

// Load user profile
async function loadUserProfile() {
    try {
        const { data: profile, error } = await supabase
            .from('student_profiles')
            .select('*')
            .eq('user_id', currentUser.id)
            .single();
        
        if (error) {
            console.error('Profile load error:', error);
            return;
        }
        
        userProfile = profile;
        
        // Update UI with user name
        const userNameEl = document.getElementById('userName');
        if (userNameEl && profile.full_name) {
            const firstName = profile.full_name.split(' ')[0];
            userNameEl.textContent = firstName;
        }
        
        console.log('User profile loaded:', profile.full_name);
        
    } catch (error) {
        console.error('Load profile error:', error);
    }
}

// Load payment status
async function loadPaymentStatus() {
    try {
        paymentStatus = await checkPaymentStatus(currentUser.id);
        console.log('Payment status:', paymentStatus);
        
        // Display status message if payment not verified
        displayPaymentStatus(paymentStatus);
        
    } catch (error) {
        console.error('Load payment status error:', error);
    }
}

// Load user's courses
async function loadCourses() {
    try {
        const courses = await getUserCourses(currentUser.id);
        console.log('Loaded courses:', courses.length);
        
        const coursesContainer = document.getElementById('coursesContainer');
        const emptyState = document.getElementById('emptyState');
        const enrolledCount = document.getElementById('enrolledCoursesCount');
        
        if (!courses || courses.length === 0) {
            // Show empty state
            if (coursesContainer) coursesContainer.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            if (enrolledCount) enrolledCount.textContent = '0';
            return;
        }
        
        // Update enrolled courses count
        if (enrolledCount) {
            enrolledCount.textContent = courses.length;
        }
        
        // Hide empty state, show courses
        if (emptyState) emptyState.style.display = 'none';
        if (coursesContainer) coursesContainer.style.display = 'grid';
        
        // Render courses
        const coursesHTML = courses.map(enrollment => {
            const course = enrollment.courses;
            return `
                <div class="course-card">
                    <div class="course-thumbnail">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="course-content">
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description || 'Enhance your skills and knowledge'}</p>
                        <div class="course-meta">
                            <span><i class="fas fa-clock"></i> ${course.duration_weeks || 8} weeks</span>
                            <span><i class="fas fa-signal"></i> All Levels</span>
                        </div>
                        <a href="course.html?id=${course.id}" class="btn btn-primary" style="width: 100%; text-align: center; text-decoration: none;">
                            <i class="fas fa-play-circle"></i>
                            <span>Continue Learning</span>
                        </a>
                    </div>
                </div>
            `;
        }).join('');
        
        if (coursesContainer) {
            coursesContainer.innerHTML = coursesHTML;
        }
        
    } catch (error) {
        console.error('Load courses error:', error);
    }
}

// Load user statistics
async function loadStats() {
    try {
        if (!userProfile) return;
        
        // Get completed modules count
        const { data: progress, error: progressError } = await supabase
            .from('student_progress')
            .select('id, time_spent_minutes')
            .eq('student_id', userProfile.id)
            .eq('completed', true);
        
        if (!progressError && progress) {
            const completedCount = progress.length;
            const totalMinutes = progress.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0);
            const totalHours = Math.round(totalMinutes / 60);
            
            // Update UI
            const completedEl = document.getElementById('completedModulesCount');
            const hoursEl = document.getElementById('studyHours');
            
            if (completedEl) completedEl.textContent = completedCount;
            if (hoursEl) hoursEl.textContent = `${totalHours}h`;
        }
        
        // Achievements count (placeholder - implement later)
        const achievementsEl = document.getElementById('achievementsCount');
        if (achievementsEl) achievementsEl.textContent = '0';
        
    } catch (error) {
        console.error('Load stats error:', error);
    }
}

// Handle logout
window.handleLogout = async function() {
    if (confirm('Are you sure you want to logout?')) {
        showLoading();
        await signOut();
    }
}

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

console.log('Dashboard script loaded');