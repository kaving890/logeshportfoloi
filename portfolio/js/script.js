/*
================================================================
  LOGESHWARAN R S - PORTFOLIO JAVASCRIPT
  Pure Vanilla JavaScript | No Libraries | Performance Optimized
================================================================
*/

'use strict';

// ================== DOM Elements ==================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navDropdown = document.getElementById('navDropdown');
const navItems = document.querySelectorAll('.nav-item, .nav-item-mobile, .btn[data-section]');

// Certificate Modal Elements
const certModal = document.getElementById('certModal');
const certModalClose = document.getElementById('certModalClose');
const certModalImage = document.getElementById('certModalImage');
const certCards = document.querySelectorAll('.cert-card[data-cert]');

// Resume Modal Elements
const viewBtn = document.getElementById("resumeBtn");
const downloadBtn = document.querySelector(".btn-download");
const resumeModal = document.getElementById("resumeModal");
const closeBtn = document.getElementById("resumeModalClose");


// Contact Form Elements
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// ================== Navigation Functionality ==================

// Mobile Menu Toggle
navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navDropdown.classList.toggle('active');
});

// Smooth Scroll to Sections
navItems.forEach(function(item) {
    item.addEventListener('click', function(e) {
        const section = this.getAttribute('data-section');
        if (section) {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                navToggle.classList.remove('active');
                navDropdown.classList.remove('active');
            }
        }
    });
});

// Navbar Scroll Effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
}, { passive: true });

// ================== Hero Section Animations ==================

window.addEventListener('load', function() {
    const heroAnimatedElements = document.querySelectorAll('.hero-section .animate-on-load');
    heroAnimatedElements.forEach(function(el) {
        el.classList.add('animated');
    });
});

// ================== Scroll Animations (Intersection Observer) ==================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // For timeline line animation
            if (entry.target.classList.contains('timeline')) {
                entry.target.classList.add('animated');
            }
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(function(el) {
    observer.observe(el);
});

// Observe timeline
const timeline = document.querySelector('.timeline');
if (timeline) {
    observer.observe(timeline);
}

// Observe section headers for title underline animation
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(function(header) {
    observer.observe(header);
});

// ================== Certificate Modal Functionality ==================

// Certificate images (replace with actual certificate image URLs)
const certImages = {
    'aws': './assets/AWSCertificate.png', 
    'python': './assets/PythonCertificate.png',
    'social': './assets/Social.png'
};

// Open Certificate Modal
certCards.forEach(function(card) {
    card.addEventListener('click', function() {
        const certType = this.getAttribute('data-cert');
        certModalImage.src = certImages[certType];
        certModalImage.alt = 'Certificate - ' + this.querySelector('.cert-title').textContent;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close Certificate Modal
certModalClose.addEventListener('click', function() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close on overlay click
certModal.addEventListener('click', function(e) {
    if (e.target === certModal || e.target.classList.contains('cert-modal-overlay')) {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (certModal.classList.contains('active')) {
            certModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (resumeModal.classList.contains('active')) {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ================== Resume Modal Functionality ==================

/* ---------- VIEW RESUME ---------- */
viewBtn.addEventListener("click", () => {
    resumeModal.classList.add("active");
});

/* ---------- CLOSE MODAL BUTTON ---------- */
closeBtn.addEventListener("click", () => {
    resumeModal.classList.remove("active");
});

/* ---------- CLICK OUTSIDE CLOSE ---------- */
resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
        resumeModal.classList.remove("active");
    }
});

/* ---------- ESC KEY CLOSE ---------- */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        resumeModal.classList.remove("active");
    }
});

/* ---------- DOWNLOAD RESUME ---------- */
downloadBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.href = "./assets/resume.pdf"; // your resume path
    link.download = "Logeshwaran_RS_Resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

});
// ================== Contact Form Functionality ==================



contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // UI: Sending
  formStatus.textContent = "Sending message...";
  formStatus.className = "form-status success show";

  emailjs
    .sendForm(
      "service_449no5z",   // 🔁 replace
      "template_s3x0p6u",  // 🔁 replace
      contactForm
    )
    .then(
      function () {
        // ✅ Success UI
        formStatus.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Message sent successfully!</span>
        `;
        formStatus.className = "form-status success show";

        contactForm.reset();

        setTimeout(() => {
          formStatus.classList.remove("show");
        }, 3000);
      },
      function (error) {
        // ❌ Error UI
        console.error(error);
        formStatus.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Failed to send. Please try again.</span>
        `;
        formStatus.className = "form-status error show";

        setTimeout(() => {
          formStatus.classList.remove("show");
        }, 3000);
      }
    );
});

// ================== Scroll to Top Functionality ==================

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'all';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
}, { passive: true });

// ================== Hover Effects ==================

// Button hover effects (handled by CSS)
const buttons = document.querySelectorAll('.btn, .skill-tag, .social-link, .footer-social-link, .tech-badge');
buttons.forEach(function(btn) {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Skill card hover effects
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Education card hover effects
const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Certificate card hover effects
certCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Contact item hover effects
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(function(item) {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ================== Prevent Default on Empty Links ==================

document.querySelectorAll('a[href="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// ================== Performance Optimization ==================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const args = arguments;
        const later = function() {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images for better performance
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(function(img) {
    imageObserver.observe(img);
});

// ================== Console Messages ==================

console.log('%c👋 Hello! Welcome to my portfolio', 'color: #14B8A6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and Vanilla JavaScript', 'color: #06B6D4; font-size: 12px;');
console.log('%c© 2026 Logeshwaran R S', 'color: #F3F4F6; font-size: 12px;');
console.log('%cNo frameworks, no dependencies - just pure web technologies!', 'color: #14B8A6; font-size: 10px;');

// ================== END OF SCRIPT ==================
