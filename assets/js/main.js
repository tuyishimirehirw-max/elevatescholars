/**
 * The Voices Of Future Rwanda - Main JavaScript
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
  console.log('The Voices Of Future Rwanda website initialized');
});
//for supabase
const SUPABASE_URL = "https://edjegahltxocgamfiquo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkamVnYWhsdHhvY2dhbWZpcXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MjA0NDgsImV4cCI6MjA4NDM5NjQ0OH0.BXX5tum4rzuPKrCt-ouR8BQFfZDFZaVQjcy57SVGMC8";

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      phone: contactForm.phone.value.trim(),
      inquiry_type: contactForm.inquiryType.value,
      program: contactForm.program.value || null,
      message: contactForm.message.value.trim(),
      source: "contact-page"
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.inquiry_type || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      alert("Thank you for contacting The Voices Of Future Rwanda. We will respond within 24 hours.");
      contactForm.reset();

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  });
});
