/**
 * Page Transition Effects
 * This file handles smooth transitions between sections of the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add js-enabled class to body to enable transitions
    document.body.classList.add('js-enabled');
    
    // Initialize page transition elements
    initPageTransitions();
    
    // Make the first section visible immediately
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.classList.add('visible');
    }
    
    // Add transition classes to main sections (except the first one)
    const sections = document.querySelectorAll('section:not(:first-child)');
    sections.forEach(section => {
        section.classList.add('transition-section');
    });
    
    // Handle navigation clicks for smooth transitions
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .hero-buttons a');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Trigger entrance animations when sections come into view
    const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the section is visible
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Make all elements visible after a short delay if they haven't been made visible by the observer
    setTimeout(() => {
        document.querySelectorAll('.transition-section:not(.visible)').forEach(section => {
            section.classList.add('visible');
        });
        document.querySelectorAll('.transition-stagger:not(.visible)').forEach(element => {
            element.classList.add('visible');
        });
    }, 1000);
});

/**
 * Initialize page transition elements
 */
function initPageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Add transition styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.5s ease-in-out;
            pointer-events: none;
        }
        
        .page-transition-overlay.active {
            transform: translateY(0);
        }
        
        .page-transition-overlay.fade-out {
            transform: translateY(-100%);
        }
        
        .transition-section {
            opacity: 1; /* Visible by default */
            transform: translateY(0);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        /* Only apply transitions when js-enabled */
        .js-enabled .transition-section {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .js-enabled .transition-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .transition-stagger > * {
            opacity: 1; /* Visible by default */
            transform: translateY(0);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        /* Only apply transitions when js-enabled */
        .js-enabled .transition-stagger > * {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .js-enabled .transition-stagger.visible > *:nth-child(1) { transition-delay: 0.1s; }
        .js-enabled .transition-stagger.visible > *:nth-child(2) { transition-delay: 0.2s; }
        .js-enabled .transition-stagger.visible > *:nth-child(3) { transition-delay: 0.3s; }
        .js-enabled .transition-stagger.visible > *:nth-child(4) { transition-delay: 0.4s; }
        .js-enabled .transition-stagger.visible > *:nth-child(5) { transition-delay: 0.5s; }
        .js-enabled .transition-stagger.visible > *:nth-child(6) { transition-delay: 0.6s; }
        
        .js-enabled .transition-stagger.visible > * {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add stagger effect to grid elements
    document.querySelectorAll('.achievements-grid, .gallery-grid, .contact-info').forEach(grid => {
        grid.classList.add('transition-stagger');
    });
}

/**
 * Handle navigation link clicks
 * @param {Event} e - Click event
 */
function handleNavClick(e) {
    // Only handle internal links
    if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Show transition overlay
            const overlay = document.querySelector('.page-transition-overlay');
            overlay.classList.add('active');
            
            // Close mobile menu if open
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.querySelector('.mobile-menu-btn i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Wait for transition and then scroll
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Hide overlay with opposite animation
                overlay.classList.add('fade-out');
                
                // Reset overlay after animation completes
                setTimeout(() => {
                    overlay.classList.remove('active', 'fade-out');
                }, 500);
                
            }, 300);
        }
    }
}

/**
 * Handle intersection observations for section animations
 * @param {IntersectionObserverEntry[]} entries - Intersection entries
 */
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}
