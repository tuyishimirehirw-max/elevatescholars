// assets/js/payment-submission.js
// Handles payment proof submission to Supabase

import { supabase } from './supabase-client.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Payment submission page loaded');
    
    // Check if we have a pending student ID
    const studentId = sessionStorage.getItem('pendingStudentId');
    const userEmail = sessionStorage.getItem('pendingUserEmail');
    const studentName = sessionStorage.getItem('pendingStudentName');
    
    if (!studentId) {
        alert('No pending registration found. Redirecting to registration page...');
        window.location.href = 'register.html';
        return;
    }
    
    console.log('Pending student ID found:', studentId);
    
    // Handle form submission
    const form = document.getElementById('paymentForm');
    if (form) {
        form.addEventListener('submit', handlePaymentSubmission);
    }
});

async function handlePaymentSubmission(event) {
    event.preventDefault();
    console.log('Payment form submitted');
    
    const studentId = sessionStorage.getItem('pendingStudentId');
    const userEmail = sessionStorage.getItem('pendingUserEmail');
    const studentName = sessionStorage.getItem('pendingStudentName');
    
    // Get form data
    const paymentMethod = document.getElementById('paymentMethod').value;
    const transactionRef = document.getElementById('transactionRef').value.trim().toUpperCase();
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    
    // Validate
    if (!paymentMethod) {
        showError('paymentMethodError', 'Please select a payment method');
        return;
    }
    
    if (!transactionRef || transactionRef.length < 5) {
        showError('transactionRefError', 'Please enter a valid transaction reference (minimum 5 characters)');
        return;
    }
    
    // Disable submit button
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Submitting...</span>';
    }
    
    // Show loading
    showLoading(true);
    
    try {
        console.log('Inserting payment record...');
        
        // Insert payment record
        const { data, error } = await supabase
            .from('payment_records')
            .insert([
                {
                    student_id: studentId,
                    amount: amount,
                    payment_method: paymentMethod,
                    transaction_reference: transactionRef,
                    payment_status: 'pending',
                    payment_date: new Date().toISOString(),
                    verified_by_admin: false
                }
            ])
            .select()
            .single();
        
        if (error) {
            throw new Error(`Failed to submit payment: ${error.message}`);
        }
        
        console.log('Payment record created successfully:', data.id);
        
        // Clear session storage
        sessionStorage.removeItem('pendingStudentId');
        
        // Redirect to success page with email parameter
        showLoading(false);
        window.location.href = 'payment-pending.html?email=' + encodeURIComponent(userEmail) + '&name=' + encodeURIComponent(studentName);
        
    } catch (error) {
        showLoading(false);
        console.error('Payment submission error:', error);
        
        // Re-enable submit button
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Submit Payment Proof</span>';
        }
        
        // Show error message
        let errorMessage = 'Failed to submit payment proof. ';
        
        if (error.message.includes('duplicate')) {
            errorMessage += 'This transaction reference has already been submitted.';
        } else if (error.message.includes('network')) {
            errorMessage += 'Please check your internet connection and try again.';
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage + '\n\nIf the problem persists, please contact support at +250 786 948 770');
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

console.log('Payment submission script loaded');