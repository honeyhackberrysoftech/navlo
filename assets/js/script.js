// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    }
    
    updateCounter();
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-count'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

// Observe all counter elements
document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Car selection interaction
document.querySelectorAll('.car-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        document.querySelectorAll('.car-card').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Add some visual feedback
        this.style.transform = 'translateY(-10px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Button click animations
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// Booking simulation
// function simulateBooking() {
//     const steps = ['Searching for drivers...', 'Driver found!', 'Driver is on the way...', 'Enjoy your ride!'];
//     let currentStep = 0;
    
//     const modal = document.createElement('div');
//     modal.className = 'modal fade';
//     modal.innerHTML = `
//         <div class="modal-dialog modal-dialog-centered">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h5 class="modal-title">Booking Your Ride</h5>
//                     <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
//                 </div>
//                 <div class="modal-body text-center">
//                     <div class="spinner-border text-success mb-3" role="status">
//                         <span class="visually-hidden">Loading...</span>
//                     </div>
//                     <p id="booking-status">${steps[currentStep]}</p>
//                     <div class="progress">
//                         <div class="progress-bar bg-success" role="progressbar" style="width: 25%"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     document.body.appendChild(modal);
//     const bootstrapModal = new bootstrap.Modal(modal);
//     bootstrapModal.show();
    
//     const interval = setInterval(() => {
//         currentStep++;
//         if (currentStep < steps.length) {
//             document.getElementById('booking-status').textContent = steps[currentStep];
//             const progress = ((currentStep + 1) / steps.length) * 100;
//             modal.querySelector('.progress-bar').style.width = progress + '%';
//         } else {
//             clearInterval(interval);
//             setTimeout(() => {
//                 bootstrapModal.hide();
//                 setTimeout(() => {
//                     document.body.removeChild(modal);
//                 }, 300);
//             }, 1500);
//         }
//     }, 2000);
// }

// Add booking functionality to buttons
document.addEventListener('click', function(e) {
    if (e.target.textContent.includes('Book Your Ride') || e.target.textContent.includes('Select Ride')) {
        e.preventDefault();
        simulateBooking();
    }
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const throttledScrollHandler = throttle(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Console welcome message
console.log(`
🚕 Welcome to Cabsy - Your Reliable Transportation Partner!

Built with:
- HTML5 & CSS3
- Bootstrap 5
- Vanilla JavaScript
- AOS Animation Library
- Font Awesome Icons

Features:
✅ Responsive Design
✅ Smooth Animations
✅ Accessibility Support
✅ Performance Optimized
✅ Cross-browser Compatible

Need a ride? Book now! 🚗💨
`);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}