document.addEventListener('DOMContentLoaded', function() {
    // Hide page loader after content is loaded
    setTimeout(function() {
        document.querySelector('.page-loader').classList.add('loaded');
    }, 800);
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && !nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .hero-content a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    function headerScrollEffect() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    }
    
    window.addEventListener('scroll', headerScrollEffect);
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show transition overlay for form submission
            const overlay = document.querySelector('.page-transition-overlay');
            if (overlay) {
                overlay.classList.add('active');
                
                setTimeout(() => {
                    // In a real-world scenario, you would send this data to a server
                    // For this demo, we'll just show a success message
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    
                    // Hide overlay with opposite animation
                    overlay.classList.add('fade-out');
                    
                    // Reset overlay after animation completes
                    setTimeout(() => {
                        overlay.classList.remove('active', 'fade-out');
                    }, 500);
                }, 300);
            } else {
                // Fallback if overlay doesn't exist
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Add hover animation classes to elements
    document.querySelectorAll('.achievement-card, .gallery-item, .contact-item').forEach(item => {
        item.classList.add('hover-lift');
    });
    
    // Add smooth color transition to all buttons and links
    document.querySelectorAll('.btn, a').forEach(item => {
        item.classList.add('color-transition');
    });
});
