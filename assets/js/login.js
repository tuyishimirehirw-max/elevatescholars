// assets/js/login.js
// Handles user login authentication

import { supabase } from './supabase-client.js';

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Login page loaded');
    
    // Check for success message in URL (from password reset)
    const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');

if (message === 'password_reset') {
    showSuccess('Password reset email sent! Check your inbox.');
} else if (message === 'email_confirmed') {
    showSuccess('Email confirmed! You can now log in to your account.');
}
    
    // Check if user is already logged in
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        console.log('User already logged in, redirecting to dashboard...');
        window.location.href = 'lms/dashboard.html';
        return;
    }
    
    // Initialize form
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
    
    console.log('Login form initialized');
});

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Clear previous errors
    clearError('emailError');
    clearError('passwordError');
    hideError();
    
    // Validate
    if (!email || !isValidEmail(email)) {
        showError('Please enter a valid email address');
        showFieldError('emailError', 'Valid email required');
        return;
    }
    
    if (!password || password.length < 6) {
        showError('Please enter your password');
        showFieldError('passwordError', 'Password required');
        return;
    }
    
    // Disable form
    const loginButton = document.getElementById('loginButton');
    loginButton.disabled = true;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Signing In...</span>';
    
    // Show loading overlay
    showLoading(true);
    
    try {
        console.log('Attempting to sign in...');
        
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            throw error;
        }
        
        if (!data.user) {
            throw new Error('Login failed - no user returned');
        }
        
        console.log('Login successful!', data.user.id);
        
        // Check if user has a student profile and payment is verified
        const { data: profile, error: profileError } = await supabase
            .from('student_profiles')
            .select('id, full_name')
            .eq('user_id', data.user.id)
            .single();
        
        if (profileError) {
            console.error('Profile fetch error:', profileError);
            // Continue anyway - they might be a new user
        }
        
        // Check payment status
        if (profile) {
            const { data: payment, error: paymentError } = await supabase
                .from('payment_records')
                .select('payment_status, verified_by_admin')
                .eq('student_id', profile.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();
            
            if (paymentError && paymentError.code !== 'PGRST116') {
                console.error('Payment check error:', paymentError);
            }
            
            // Store payment status for dashboard to use
            if (payment) {
                sessionStorage.setItem('paymentStatus', payment.payment_status);
                sessionStorage.setItem('paymentVerified', payment.verified_by_admin);
            } else {
                sessionStorage.setItem('paymentStatus', 'none');
            }
        }
        
        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        // Redirect to dashboard
        showLoading(false);
        window.location.href = 'lms/dashboard.html';
        
    } catch (error) {
        showLoading(false);
        console.error('Login error:', error);
        
        // Re-enable form
        loginButton.disabled = false;
        loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span>Sign In</span>';
        
        // Show user-friendly error message
        let errorMessage = 'Login failed. ';
        
        if (error.message.includes('Invalid login credentials')) {
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
            errorMessage = 'Please verify your email address. Check your inbox for the confirmation link.';
        } else if (error.message.includes('network')) {
            errorMessage = 'Network error. Please check your internet connection.';
        } else {
            errorMessage += error.message;
        }
        
        showError(errorMessage);
    }
}

// Toggle password visibility
window.togglePasswordVisibility = function() {
    const passwordField = document.getElementById('password');
    const icon = document.getElementById('togglePasswordIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorDiv && errorText) {
        errorText.textContent = message;
        errorDiv.style.display = 'block';
        
        // Scroll to error
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Hide error message
function hideError() {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    
    if (successDiv && successText) {
        successText.textContent = message;
        successDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

// Show field-specific error
function showFieldError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear field-specific error
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

console.log('Login script loaded successfully');