// Glass Morphism Web Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add interactive hover effects to glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate statistics numbers
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalNumber = stat.textContent;
            const isPercentage = finalNumber.includes('%');
            const isDollar = finalNumber.includes('$');
            const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
            
            let currentNumber = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                
                if (currentNumber >= numericValue) {
                    currentNumber = numericValue;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(currentNumber).toLocaleString();
                
                if (isDollar) {
                    displayValue = '$' + displayValue;
                } else if (isPercentage) {
                    displayValue = '+' + Math.floor(currentNumber) + '%';
                }
                
                stat.textContent = displayValue;
            }, 50);
        });
    }

    // Trigger number animation when dashboard comes into view
    const dashboardSection = document.querySelector('.dashboard-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (dashboardSection) {
        observer.observe(dashboardSection);
    }

    // Add parallax effect to background shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.glass-btn');
    
    buttons.forEach(button => {
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

    // Add dynamic glass effect based on mouse position
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            }
        });
    });

    // Console welcome message
    console.log('%c🚀 Glass Morphism App Loaded Successfully!', 
        'color: #ffffff; background: linear-gradient(45deg, #333333, #666666); padding: 10px; border-radius: 5px; font-size: 14px;');
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .glass-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
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
document.head.appendChild(style);