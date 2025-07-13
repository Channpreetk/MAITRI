// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupSmoothScrolling();
    setupNavigationHighlight();
    setupAnimations();
    setupFeatureCards();
    setupCloudNavigation();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Highlight active navigation on scroll
function setupNavigationHighlight() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Setup scroll animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);

    // Observe all feature cards and sections
    const elementsToAnimate = document.querySelectorAll('.feature-card, .feature-item, .about-image-placeholder');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Feature card interactions
function setupFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Cloud navigation setup
function setupCloudNavigation() {
    const cloudItems = document.querySelectorAll('.cloud-item');
    
    cloudItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                // Add a nice transition effect
                this.querySelector('.cloud').style.transform = 'scale(1.2)';
                setTimeout(() => {
                    window.location.href = page;
                }, 200);
            }
        });
        
        // Add hover sound effect simulation
        item.addEventListener('mouseenter', function() {
            const cloud = this.querySelector('.cloud');
            cloud.style.transform = 'translateY(-8px) scale(1.08)';
        });
        
        item.addEventListener('mouseleave', function() {
            const cloud = this.querySelector('.cloud');
            cloud.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Scroll to features section
function scrollToFeatures() {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Utility functions for future pages
const MaitriUtils = {
    // Show loading spinner
    showLoading: function(element) {
        element.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x text-pink"></i></div>';
    },
    
    // Hide loading spinner
    hideLoading: function(element, content) {
        element.innerHTML = content;
    },
    
    // Show toast notification
    showToast: function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 100px; right: 20px; z-index: 1050; min-width: 300px;';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(toast);
        
        // Auto dismiss after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    },
    
    // Format date
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.transparent-navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        console.log('Scrolled class added'); // Debug line
    } else {
        navbar.classList.remove('scrolled');
        console.log('Scrolled class removed'); // Debug line
    }
});

// Handle page navigation (for when we add more pages)
function navigateToPage(page) {
    // Add transition effect
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        window.location.href = page;
    }, 200);
}

// Add click events to buttons with navigation
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-navigate]')) {
        e.preventDefault();
        const page = e.target.getAttribute('data-navigate');
        navigateToPage(page);
    }
});

console.log('Maitri application initialized successfully!');
