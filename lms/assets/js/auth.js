/**
 * Authentication System for The Voices Of Future Rwanda LMS
 * Handles login, logout, and session management
 */

// Demo users for testing (in production, this would connect to a real backend)
const DEMO_USERS = [
  {
    id: 1,
    email: 'student@vofrwanda.com',
    password: 'student123',
    role: 'student',
    name: 'Demo Student',
    avatar: 'assets/img/avatar-student.png'
  },
  {
    id: 2,
    email: 'admin@vofrwanda.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    avatar: 'assets/img/avatar-admin.png'
  }
];

// Check if user is already logged in
function checkAuth() {
  const user = JSON.parse(localStorage.getItem('lms_user'));
  if (user) {
    // Redirect to dashboard if on login page
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/lms/')) {
      window.location.href = 'dashboard/index.html';
    }
    return user;
  }
  return null;
}

// Require authentication for protected pages
function requireAuth() {
  const user = checkAuth();
  if (!user) {
    window.location.href = '../index.html';
    return null;
  }
  return user;
}

// Login form handler
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Clear previous errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('formError').textContent = '';
    
    // Validate inputs
    if (!email) {
      document.getElementById('emailError').textContent = 'Email is required';
      return;
    }
    
    if (!password) {
      document.getElementById('passwordError').textContent = 'Password is required';
      return;
    }
    
    // Check credentials
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store user session
      const sessionData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('lms_user', JSON.stringify(sessionData));
      
      // Redirect to dashboard
      window.location.href = 'dashboard/index.html';
    } else {
      document.getElementById('formError').textContent = 'Invalid email or password';
    }
  });
}

// Logout function
function logout() {
  localStorage.removeItem('lms_user');
  window.location.href = '../index.html';
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('lms_user'));
}

// Update user profile display
function updateUserProfile() {
  const user = getCurrentUser();
  if (user) {
    const userNameElements = document.querySelectorAll('.user-name');
    const userEmailElements = document.querySelectorAll('.user-email');
    const userAvatarElements = document.querySelectorAll('.user-avatar');
    
    userNameElements.forEach(el => el.textContent = user.name);
    userEmailElements.forEach(el => el.textContent = user.email);
    userAvatarElements.forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = user.avatar || 'assets/img/default-avatar.png';
        el.alt = user.name;
      }
    });
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check auth on protected pages
  if (!window.location.pathname.includes('index.html') && !window.location.pathname.endsWith('/lms/')) {
    requireAuth();
    updateUserProfile();
  }
});
