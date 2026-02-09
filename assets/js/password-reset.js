// assets/js/password-reset.js
// Handles password reset requests

import { supabase } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Password reset page loaded');
    
    const form = document.getElementById('forgotPasswordForm');
    if (form) {
        form.addEventListener('submit', handlePasswordReset);
    }
});

async function handlePasswordReset(event) {
    event.preventDefault();
    console.log('Password reset form submitted');
    
    // Get email
    const email = document.getElementById('email').value.trim();
    
    // Clear previous errors
    clearError('emailError');
    hideError();
    
    // Validate
    if (!email || !isValidEmail(email)) {
        showError('Please enter a valid email address');
        showFieldError('emailError', 'Valid email required');
        return;
    }
    
    // Disable form
    const resetButton = document.getElementById('resetButton');
    const originalButtonHTML = resetButton.innerHTML;
    resetButton.disabled = true;
    resetButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    
    // Show loading overlay
    showLoading(true);
    
    try {
        console.log('Sending password reset email to:', email);
        
        // Send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password.html`
        });
        
        if (error) {
            throw error;
        }
        
        console.log('Password reset email sent successfully');
        
        // Hide form, show success message
        showLoading(false);
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Optionally redirect to login after a few seconds
        setTimeout(() => {
            window.location.href = 'login.html?message=password_reset';
        }, 5000);
        
    } catch (error) {
        showLoading(false);
        console.error('Password reset error:', error);
        
        // Re-enable form
        resetButton.disabled = false;
        resetButton.innerHTML = originalButtonHTML;
        
        // Show user-friendly error message
        let errorMessage = 'Failed to send reset email. ';
        
        if (error.message.includes('User not found')) {
            errorMessage = 'No account found with this email address. Please check and try again.';
        } else if (error.message.includes('network')) {
            errorMessage = 'Network error. Please check your internet connection.';
        } else {
            errorMessage += error.message;
        }
        
        showError(errorMessage);
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

console.log('Password reset script loaded');