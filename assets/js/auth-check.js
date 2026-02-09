// assets/js/auth-check.js
// Authentication middleware for protecting pages

import { supabase, getCurrentUser, getStudentProfile } from './supabase-client.js';

/**
 * Check if user is authenticated and has access to the page
 * Call this at the top of any protected page
 */
export async function requireAuth() {
    console.log('Checking authentication...');
    
    try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Session error:', error);
            redirectToLogin('Session error');
            return null;
        }
        
        if (!session || !session.user) {
            console.log('No active session found');
            redirectToLogin('No active session');
            return null;
        }
        
        console.log('User authenticated:', session.user.id);
        return session.user;
        
    } catch (error) {
        console.error('Auth check error:', error);
        redirectToLogin('Authentication error');
        return null;
    }
}

/**
 * Check if user has verified payment
 * Returns payment status object or null if not verified
 */
export async function checkPaymentStatus(userId) {
    console.log('Checking payment status for user:', userId);
    
    try {
        // Get student profile
        const { data: profile, error: profileError } = await supabase
            .from('student_profiles')
            .select('id')
            .eq('user_id', userId)
            .single();
        
        if (profileError) {
            console.error('Profile not found:', profileError);
            return { status: 'no_profile', verified: false };
        }
        
        // Get payment records
        const { data: payment, error: paymentError } = await supabase
            .from('payment_records')
            .select('payment_status, verified_by_admin, amount, payment_date')
            .eq('student_id', profile.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        
        if (paymentError) {
            console.error('No payment found:', paymentError);
            return { status: 'no_payment', verified: false };
        }
        
        console.log('Payment status:', payment.payment_status);
        
        return {
            status: payment.payment_status,
            verified: payment.verified_by_admin,
            amount: payment.amount,
            date: payment.payment_date
        };
        
    } catch (error) {
        console.error('Payment check error:', error);
        return { status: 'error', verified: false };
    }
}

/**
 * Check if user has access to specific course
 */
export async function checkCourseAccess(userId, courseId) {
    console.log('Checking course access for user:', userId, 'course:', courseId);
    
    try {
        // Get student profile
        const { data: profile, error: profileError } = await supabase
            .from('student_profiles')
            .select('id')
            .eq('user_id', userId)
            .single();
        
        if (profileError) {
            console.error('Profile not found:', profileError);
            return false;
        }
        
        // Check enrollment
        const { data: enrollment, error: enrollmentError } = await supabase
            .from('course_enrollments')
            .select('access_granted')
            .eq('student_id', profile.id)
            .eq('course_id', courseId)
            .single();
        
        if (enrollmentError) {
            console.error('No enrollment found:', enrollmentError);
            return false;
        }
        
        console.log('Course access:', enrollment.access_granted);
        return enrollment.access_granted;
        
    } catch (error) {
        console.error('Course access check error:', error);
        return false;
    }
}

/**
 * Get user's enrolled courses
 */
export async function getUserCourses(userId) {
    console.log('Fetching enrolled courses for user:', userId);
    
    try {
        // Get student profile
        const { data: profile, error: profileError } = await supabase
            .from('student_profiles')
            .select('id')
            .eq('user_id', userId)
            .single();
        
        if (profileError) {
            console.error('Profile not found:', profileError);
            return [];
        }
        
        // Get enrollments with course details
        const { data: enrollments, error: enrollmentError } = await supabase
            .from('course_enrollments')
            .select(`
                id,
                access_granted,
                enrollment_date,
                courses (
                    id,
                    title,
                    description,
                    thumbnail_url,
                    duration_weeks
                )
            `)
            .eq('student_id', profile.id)
            .eq('access_granted', true);
        
        if (enrollmentError) {
            console.error('Error fetching enrollments:', enrollmentError);
            return [];
        }
        
        console.log('Found', enrollments?.length || 0, 'enrolled courses');
        return enrollments || [];
        
    } catch (error) {
        console.error('Get courses error:', error);
        return [];
    }
}

/**
 * Redirect to login page with return URL
 */
function redirectToLogin(reason = '') {
    console.log('Redirecting to login:', reason);
    
    // Save current URL to return after login
    const returnUrl = encodeURIComponent(window.location.pathname);
    
    // Redirect to login
    window.location.href = `/login.html?returnUrl=${returnUrl}`;
}

/**
 * Sign out user
 */
export async function signOut() {
    console.log('Signing out user...');
    
    try {
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('Sign out error:', error);
            return false;
        }
        
        // Clear session storage
        sessionStorage.clear();
        
        // Redirect to home
        window.location.href = '/index.html';
        return true;
        
    } catch (error) {
        console.error('Sign out error:', error);
        return false;
    }
}

/**
 * Display payment status message
 */
export function displayPaymentStatus(paymentStatus) {
    if (!paymentStatus || paymentStatus.verified) {
        return; // No message needed if verified
    }
    
    const messageContainer = document.getElementById('paymentStatusMessage');
    if (!messageContainer) return;
    
    let message = '';
    let className = '';
    
    if (paymentStatus.status === 'pending') {
        message = `
            <i class="fas fa-clock"></i>
            <div>
                <strong>Payment Verification Pending</strong>
                <p>Your payment is being verified. You'll get full access once approved (usually within 24-48 hours).</p>
            </div>
        `;
        className = 'warning';
    } else if (paymentStatus.status === 'rejected') {
        message = `
            <i class="fas fa-times-circle"></i>
            <div>
                <strong>Payment Verification Failed</strong>
                <p>There was an issue with your payment. Please contact support at +250 786 948 770</p>
            </div>
        `;
        className = 'error';
    } else if (paymentStatus.status === 'no_payment') {
        message = `
            <i class="fas fa-exclamation-triangle"></i>
            <div>
                <strong>Payment Required</strong>
                <p>Please complete your payment to access the learning materials. <a href="/payment-instructions.html">Pay Now</a></p>
            </div>
        `;
        className = 'error';
    }
    
    if (message) {
        messageContainer.innerHTML = message;
        messageContainer.className = `payment-status-message ${className}`;
        messageContainer.style.display = 'flex';
    }
}

console.log('Auth check module loaded');