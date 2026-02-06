// assets/js/registration.js
// Handles multi-step registration form and Supabase integration

import { supabase } from './supabase-client.js';

// Track current step
let currentStep = 1;
const totalSteps = 7;

// Store form data across steps
let formData = {
    userType: 'student',
    studentInfo: {},
    contactInfo: {},
    programInfo: {},
    accountInfo: {},
    goalsInfo: {}
};

// Initialize form on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Registration form initializing...');
    initializeForm();
});

function initializeForm() {
    // Add event listeners
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        console.log('Form submit listener added');
    }
    
    // Password strength checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
        passwordInput.addEventListener('input', validatePasswordMatch);
    }
    
    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneNumber);
    });
    
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', validateEmail);
    });
    
    console.log('Registration form initialized successfully');
}

// Navigate to next step
window.nextStep = function() {
    console.log(`Attempting to move from step ${currentStep} to step ${currentStep + 1}`);
    
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        console.log('Validation failed for step', currentStep);
        return;
    }
    
    // Save current step data
    saveStepData(currentStep);
    
    // Hide current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const currentProgressEl = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    
    if (currentStepEl) currentStepEl.classList.remove('active');
    if (currentProgressEl) {
        currentProgressEl.classList.remove('active');
        currentProgressEl.classList.add('completed');
    }
    
    // Move to next step
    currentStep++;
    
    // Show next step
    const nextStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const nextProgressEl = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    
    if (nextStepEl) nextStepEl.classList.add('active');
    if (nextProgressEl) nextProgressEl.classList.add('active');
    
    // If final step, show summary
    if (currentStep === 7) {
        displayReviewSummary();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Moved to step', currentStep);
}

// Navigate to previous step
window.previousStep = function() {
    console.log(`Moving back from step ${currentStep} to step ${currentStep - 1}`);
    
    // Hide current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const currentProgressEl = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    
    if (currentStepEl) currentStepEl.classList.remove('active');
    if (currentProgressEl) currentProgressEl.classList.remove('active');
    
    // Move to previous step
    currentStep--;
    
    // Show previous step
    const prevStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const prevProgressEl = document.querySelector(`.progress-step[data-step="${currentStep}"]`);
    
    if (prevStepEl) prevStepEl.classList.add('active');
    if (prevProgressEl) {
        prevProgressEl.classList.add('active');
        prevProgressEl.classList.remove('completed');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validate each step
function validateStep(step) {
    let isValid = true;
    
    switch(step) {
        case 1: // User Type
            const userType = document.querySelector('input[name="userType"]:checked');
            if (!userType) {
                alert('Please select who is enrolling');
                isValid = false;
            }
            break;
            
        case 2: // Student Information
            const studentName = document.getElementById('studentName').value.trim();
            const studentAge = document.getElementById('studentAge').value;
            const studentGender = document.getElementById('studentGender').value;
            const schoolName = document.getElementById('schoolName').value.trim();
            
            if (!studentName || studentName.length < 3) {
                showError('studentNameError', 'Please enter a valid full name (minimum 3 characters)');
                isValid = false;
            } else {
                clearError('studentNameError');
            }
            
            if (!studentAge || studentAge < 10 || studentAge > 100) {
                showError('studentAgeError', 'Please enter a valid age');
                isValid = false;
            } else {
                clearError('studentAgeError');
            }
            
            if (!studentGender) {
                showError('studentGenderError', 'Please select a gender');
                isValid = false;
            } else {
                clearError('studentGenderError');
            }
            
            if (!schoolName || schoolName.length < 3) {
                showError('schoolNameError', 'Please enter your school/university name');
                isValid = false;
            } else {
                clearError('schoolNameError');
            }
            break;
            
        case 3: // Contact Information
            const studentPhone = document.getElementById('studentPhone').value.trim();
            const studentEmail = document.getElementById('studentEmail').value.trim();
            
            const phoneRegex = /^(\+?250)?[0-9]{9}$/;
            if (!phoneRegex.test(studentPhone.replace(/\s/g, ''))) {
                showError('studentPhoneError', 'Please enter a valid Rwandan phone number');
                isValid = false;
            } else {
                clearError('studentPhoneError');
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(studentEmail)) {
                showError('studentEmailError', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('studentEmailError');
            }
            break;
            
        case 4: // Program Selection
            const program = document.querySelector('input[name="program"]:checked');
            if (!program) {
                alert('Please select a program');
                isValid = false;
            }
            break;
            
        case 5: // Account Creation
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password.length < 8) {
                showError('passwordError', 'Password must be at least 8 characters');
                isValid = false;
            } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
                showError('passwordError', 'Password must contain both letters and numbers');
                isValid = false;
            } else {
                clearError('passwordError');
            }
            
            if (password !== confirmPassword) {
                showError('confirmPasswordError', 'Passwords do not match');
                isValid = false;
            } else {
                clearError('confirmPasswordError');
            }
            break;
            
        case 6: // Goals
            // This step is optional, so always valid
            break;
            
        case 7: // Review
            const termsAccepted = document.getElementById('termsAccepted').checked;
            if (!termsAccepted) {
                showError('termsError', 'You must accept the Terms & Conditions');
                isValid = false;
            } else {
                clearError('termsError');
            }
            break;
    }
    
    return isValid;
}

// Save data from current step
function saveStepData(step) {
    switch(step) {
        case 1:
            formData.userType = document.querySelector('input[name="userType"]:checked')?.value || 'student';
            break;
            
        case 2:
            formData.studentInfo = {
                name: document.getElementById('studentName').value.trim(),
                age: parseInt(document.getElementById('studentAge').value),
                gender: document.getElementById('studentGender').value,
                dateOfBirth: document.getElementById('dateOfBirth').value || null,
                schoolName: document.getElementById('schoolName').value.trim()
            };
            break;
            
        case 3:
            formData.contactInfo = {
                studentPhone: document.getElementById('studentPhone').value.trim(),
                studentEmail: document.getElementById('studentEmail').value.trim(),
                address: document.getElementById('address').value.trim() || null,
                guardianName: document.getElementById('guardianName').value.trim() || null,
                guardianPhone: document.getElementById('guardianPhone').value.trim() || null,
                guardianEmail: document.getElementById('guardianEmail').value.trim() || null
            };
            break;
            
        case 4:
            formData.programInfo = {
                program: document.querySelector('input[name="program"]:checked')?.value || null
            };
            break;
            
        case 5:
            formData.accountInfo = {
                password: document.getElementById('password').value
            };
            break;
            
        case 6:
            const goals = Array.from(document.querySelectorAll('input[name="goals"]:checked'))
                .map(cb => cb.value);
            
            formData.goalsInfo = {
                goals: goals,
                experience: document.getElementById('experience').value || null,
                hearAbout: document.getElementById('hearAbout').value || null,
                additionalInfo: document.getElementById('additionalInfo').value.trim() || null
            };
            break;
    }
    
    // Save to sessionStorage as backup
    sessionStorage.setItem('registrationData', JSON.stringify(formData));
    console.log('Step data saved:', formData);
}

// Display review summary on final step
function displayReviewSummary() {
    const summaryDiv = document.getElementById('reviewSummary');
    
    if (!summaryDiv) return;
    
    const summaryHTML = `
        <div style="display: grid; gap: var(--space-6);">
            <div>
                <h4 style="color: var(--agaciro-gold); margin-bottom: var(--space-3); display: flex; align-items: center; gap: var(--space-2);">
                    <i class="fas fa-user"></i> Student Information
                </h4>
                <div style="display: grid; gap: var(--space-2); font-size: var(--font-sm);">
                    <p><strong>Name:</strong> ${formData.studentInfo.name}</p>
                    <p><strong>Age:</strong> ${formData.studentInfo.age}</p>
                    <p><strong>Gender:</strong> ${formData.studentInfo.gender}</p>
                    ${formData.studentInfo.dateOfBirth ? `<p><strong>Date of Birth:</strong> ${formData.studentInfo.dateOfBirth}</p>` : ''}
                    <p><strong>School/University:</strong> ${formData.studentInfo.schoolName}</p>
                </div>
            </div>
            
            <div style="border-top: 1px solid var(--neutral-300); padding-top: var(--space-4);">
                <h4 style="color: var(--agaciro-gold); margin-bottom: var(--space-3); display: flex; align-items: center; gap: var(--space-2);">
                    <i class="fas fa-phone"></i> Contact Information
                </h4>
                <div style="display: grid; gap: var(--space-2); font-size: var(--font-sm);">
                    <p><strong>Email:</strong> ${formData.contactInfo.studentEmail}</p>
                    <p><strong>Phone:</strong> ${formData.contactInfo.studentPhone}</p>
                    ${formData.contactInfo.address ? `<p><strong>Address:</strong> ${formData.contactInfo.address}</p>` : ''}
                    ${formData.contactInfo.guardianName ? `<p><strong>Guardian:</strong> ${formData.contactInfo.guardianName}</p>` : ''}
                    ${formData.contactInfo.guardianPhone ? `<p><strong>Guardian Phone:</strong> ${formData.contactInfo.guardianPhone}</p>` : ''}
                </div>
            </div>
            
            <div style="border-top: 1px solid var(--neutral-300); padding-top: var(--space-4);">
                <h4 style="color: var(--agaciro-gold); margin-bottom: var(--space-3); display: flex; align-items: center; gap: var(--space-2);">
                    <i class="fas fa-graduation-cap"></i> Program Selection
                </h4>
                <div style="display: grid; gap: var(--space-2); font-size: var(--font-sm);">
                    <p><strong>Selected Program:</strong> ${formData.programInfo.program}</p>
                    ${formData.goalsInfo.experience ? `<p><strong>Experience Level:</strong> ${formData.goalsInfo.experience}</p>` : ''}
                    ${formData.goalsInfo.goals && formData.goalsInfo.goals.length > 0 ? `<p><strong>Goals:</strong> ${formData.goalsInfo.goals.join(', ')}</p>` : ''}
                </div>
            </div>
        </div>
    `;
    
    summaryDiv.innerHTML = summaryHTML;
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    console.log('Form submission started');
    
    // Validate final step
    if (!validateStep(7)) {
        return;
    }
    
    // Disable submit button
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing...</span>';
    }
    
    // Show loading overlay
    showLoading(true);
    
    try {
        console.log('Creating user account in Supabase Auth...');
        
        // Step 1: Create user account in Supabase Auth
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email: formData.contactInfo.studentEmail,
            password: formData.accountInfo.password,
            options: {
                data: {
                    full_name: formData.studentInfo.name,
                    user_type: formData.userType
                }
            }
        });
        
        if (signUpError) {
            throw new Error(`Account creation failed: ${signUpError.message}`);
        }
        
        if (!authData.user) {
            throw new Error('Failed to create user account');
        }
        
        console.log('User account created successfully:', authData.user.id);
        
        // Step 2: Create student profile
        console.log('Creating student profile...');
        
        const { data: profileData, error: profileError } = await supabase
            .from('student_profiles')
            .insert([
                {
                    user_id: authData.user.id,
                    full_name: formData.studentInfo.name,
                    phone_number: formData.contactInfo.studentPhone,
                    date_of_birth: formData.studentInfo.dateOfBirth,
                    address: formData.contactInfo.address,
                    guardian_name: formData.contactInfo.guardianName,
                    guardian_phone: formData.contactInfo.guardianPhone,
                    age: formData.studentInfo.age,
                    gender: formData.studentInfo.gender,
                    school_name: formData.studentInfo.schoolName,
                    guardian_email: formData.contactInfo.guardianEmail,
                    selected_program: formData.programInfo.program,
                    experience_level: formData.goalsInfo.experience,
                    goals: formData.goalsInfo.goals,
                    hear_about: formData.goalsInfo.hearAbout,
                    additional_info: formData.goalsInfo.additionalInfo,
                    registration_date: new Date().toISOString()
                }
            ])
            .select()
            .single();
        
        if (profileError) {
            console.error('Profile creation error:', profileError);
            throw new Error(`Profile creation failed: ${profileError.message}`);
        }
        
        console.log('Student profile created successfully:', profileData.id);
        
        // Step 3: Store data for payment page
        sessionStorage.setItem('pendingStudentId', profileData.id);
        sessionStorage.setItem('pendingUserEmail', formData.contactInfo.studentEmail);
        sessionStorage.setItem('pendingStudentName', formData.studentInfo.name);
        
        // Step 4: Clear form data
        sessionStorage.removeItem('registrationData');
        
        // Step 5: Redirect to payment instructions
        console.log('Redirecting to payment page...');
        showLoading(false);
        window.location.href = 'payment-instructions.html';
        
    } catch (error) {
        showLoading(false);
        console.error('Registration error:', error);
        
        // Re-enable submit button
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-check-circle"></i> <span>Complete Registration</span>';
        }
        
        // Show user-friendly error message
        let errorMessage = 'Registration failed. ';
        
        if (error.message.includes('already registered')) {
            errorMessage += 'This email address is already registered. Please use a different email or try logging in.';
        } else if (error.message.includes('network')) {
            errorMessage += 'Please check your internet connection and try again.';
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage + '\n\nIf the problem persists, please contact support at +250 786 948 770');
    }
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const strengthContainer = document.getElementById('passwordStrength');
    
    if (!password) {
        strengthContainer.style.display = 'none';
        return;
    }
    
    strengthContainer.style.display = 'block';
    
    let strength = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength++;
        feedback.push('mixed case');
    }
    if (/[0-9]/.test(password)) {
        strength++;
        feedback.push('numbers');
    }
    if (/[^a-zA-Z0-9]/.test(password)) {
        strength++;
        feedback.push('special characters');
    }
    
    // Update visual indicator
    if (strength <= 2) {
        strengthBar.style.width = '33%';
        strengthBar.style.background = '#f44336';
        strengthText.textContent = 'Weak password';
        strengthText.style.color = '#f44336';
    } else if (strength <= 4) {
        strengthBar.style.width = '66%';
        strengthBar.style.background = '#ff9800';
        strengthText.textContent = 'Medium strength';
        strengthText.style.color = '#ff9800';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.background = '#4CAF50';
        strengthText.textContent = 'Strong password';
        strengthText.style.color = '#4CAF50';
    }
}

// Validate password match
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (confirmPassword && password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
    } else if (confirmPassword) {
        clearError('confirmPasswordError');
    }
}

// Toggle password visibility
window.togglePassword = function(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = document.getElementById(fieldId + '-toggle-icon');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Format phone number
function formatPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.startsWith('250')) {
        value = '+' + value;
    } else if (value.startsWith('0')) {
        value = '+250' + value.substring(1);
    } else if (value.length > 0 && !value.startsWith('+')) {
        value = '+250' + value;
    }
    
    event.target.value = value;
}

// Validate email
function validateEmail(event) {
    const email = event.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        event.target.style.borderColor = '#f44336';
    } else {
        event.target.style.borderColor = '';
    }
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.color = '#f44336';
    }
}

// Clear error message
function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Show/hide loading overlay
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = show ? 'flex' : 'none';
    }
}

console.log('Registration script loaded successfully');