/**
 * Elevate Scholars Rwanda - Main JavaScript
 * Handles navigation, mobile menu, and interactive components
 */

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle) {
  navbarToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (navbarMenu && navbarMenu.classList.contains('active')) {
    if (!event.target.closest('.navbar-menu') && !event.target.closest('.navbar-toggle')) {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.navbar-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 992) {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#0') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Add active class to current page nav link
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (linkPath === currentLocation || (currentLocation === '' && linkPath === 'index.html')) {
    link.classList.add('active');
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.section, .card, .hero-content, .hero-image').forEach(el => {
  observer.observe(el);
});

// Form validation helper
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Phone validation (Rwanda format)
function validatePhone(phone) {
  const re = /^(\+?250|0)?[7][0-9]{8}$/;
  return re.test(phone.replace(/\s/g, ''));
}

// Export utilities for other scripts
window.ElevateScholars = {
  validateForm,
  validateEmail,
  validatePhone
};

// Initialize any tooltips or popovers (if using Bootstrap components)
document.addEventListener('DOMContentLoaded', function() {
  console.log('Elevate Scholars Rwanda website initialized');
});
