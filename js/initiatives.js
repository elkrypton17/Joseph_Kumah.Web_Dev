/**
 * Kintampo North Initiatives Tab Functionality
 * Handles the tab switching for the initiatives section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab to show
            const tabToShow = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            // Show the corresponding tab content
            document.getElementById(`${tabToShow}-tab`).classList.add('active');
            
            // Add animation class
            document.getElementById(`${tabToShow}-tab`).classList.add('animated');
            
            // Apply transition effect
            const overlay = document.querySelector('.page-transition-overlay');
            if (overlay) {
                overlay.classList.add('active');
                
                setTimeout(() => {
                    // Hide overlay with opposite animation
                    overlay.classList.add('fade-out');
                    
                    // Reset overlay after animation completes
                    setTimeout(() => {
                        overlay.classList.remove('active', 'fade-out');
                    }, 300);
                }, 200);
            }
        });
    });
    
    // Initialize intersection observer for tab content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When initiatives section comes into view, add staggered animation to list items
                const listItems = entry.target.querySelectorAll('li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, 100 * index);
                });
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each tab content
    tabContents.forEach(content => {
        observer.observe(content);
    });
    
    // Add hover effects to initiative items
    const initiativeItems = document.querySelectorAll('.initiative-item');
    initiativeItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('h3').style.color = 'var(--secondary-color)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('h3').style.color = 'var(--primary-color)';
        });
    });
});
