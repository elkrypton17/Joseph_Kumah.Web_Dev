/**
 * Back to Top Button Functionality
 * Controls the visibility and behavior of the back-to-top button
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show the button when user scrolls down 300px from the top
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add transition overlay effect
        const overlay = document.querySelector('.page-transition-overlay');
        if (overlay) {
            overlay.classList.add('active');
            
            setTimeout(() => {
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Hide overlay with opposite animation
                overlay.classList.add('fade-out');
                
                // Reset overlay after animation completes
                setTimeout(() => {
                    overlay.classList.remove('active', 'fade-out');
                }, 500);
            }, 300);
        } else {
            // Fallback if overlay doesn't exist
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Add hover animation
    backToTopButton.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.back-to-top-icon i');
        icon.classList.add('animated');
        
        // Bounce animation
        icon.style.animation = 'bounce 0.8s ease infinite alternate';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.back-to-top-icon i');
        icon.classList.remove('animated');
        icon.style.animation = '';
    });
});
