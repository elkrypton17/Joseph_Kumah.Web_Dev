/**
 * Contact Form Handler
 * Handles form submission via AJAX and displays response messages
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create feedback element if it doesn't exist
            let feedbackEl = document.getElementById('form-feedback');
            if (!feedbackEl) {
                feedbackEl = document.createElement('div');
                feedbackEl.id = 'form-feedback';
                contactForm.appendChild(feedbackEl);
            }
            
            // Clear previous feedback
            feedbackEl.innerHTML = '';
            feedbackEl.className = '';
            
            // Send form data via AJAX
            fetch('process-form.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                if (data.success) {
                    // Show success message
                    feedbackEl.className = 'form-success';
                    feedbackEl.innerHTML = `<i class="fas fa-check-circle"></i> ${data.message}`;
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Show transition overlay
                    const overlay = document.querySelector('.page-transition-overlay');
                    if (overlay) {
                        overlay.classList.add('active');
                        
                        setTimeout(() => {
                            // Hide overlay with opposite animation
                            overlay.classList.add('fade-out');
                            
                            // Reset overlay after animation completes
                            setTimeout(() => {
                                overlay.classList.remove('active', 'fade-out');
                            }, 500);
                        }, 1500);
                    }
                } else {
                    // Show error messages
                    feedbackEl.className = 'form-error';
                    let errorHtml = '<i class="fas fa-exclamation-circle"></i> Please correct the following errors:<ul>';
                    data.errors.forEach(error => {
                        errorHtml += `<li>${error}</li>`;
                    });
                    errorHtml += '</ul>';
                    feedbackEl.innerHTML = errorHtml;
                }
            })
            .catch(error => {
                // Handle network errors
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                feedbackEl.className = 'form-error';
                feedbackEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> There was a problem submitting your form. Please try again later.';
                console.error('Error:', error);
            });
        });
    }
});
