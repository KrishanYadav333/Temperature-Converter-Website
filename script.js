/*
    TempConvert - Temperature Conversion Tool
    Copyright (c) 2025 Krishan Yadav. All rights reserved.
    
    This software is protected by copyright.
    Exact copying or commercial use without permission is prohibited.
    See LICENSE file for complete terms and conditions.
*/

// Temperature Conversion Web Application JavaScript

// Temperature conversion functions
const temperatureConverter = {
    // Convert from any unit to Celsius first, then to target unit
    convert: function(value, fromUnit, toUnit) {
        if (isNaN(value)) return 0;
        
        // Convert to Celsius first
        let celsius;
        switch (fromUnit) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
            case 'reaumur':
                celsius = value * 5/4;
                break;
            case 'rankine':
                celsius = (value - 491.67) * 5/9;
                break;
            default:
                celsius = value;
        }
        
        // Convert from Celsius to target unit
        switch (toUnit) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return (celsius * 9/5) + 32;
            case 'kelvin':
                return celsius + 273.15;
            case 'reaumur':
                return celsius * 4/5;
            case 'rankine':
                return (celsius + 273.15) * 9/5;
            default:
                return celsius;
        }
    },
    
    // Format the result to appropriate decimal places
    formatResult: function(value) {
        if (Math.abs(value) >= 1000) {
            return value.toFixed(1);
        } else if (Math.abs(value) >= 100) {
            return value.toFixed(2);
        } else {
            return value.toFixed(3);
        }
    }
};

// Scroll to converter function
function scrollToConverter() {
    document.getElementById('converter').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Swap units function
function swapUnits() {
    const fromSelect = document.getElementById('from-unit');
    const input = document.getElementById('temperature-input');
    
    // Get current values
    const currentFromUnit = fromSelect.value;
    const currentValue = parseFloat(input.value) || 0;
    
    // Find the active result card to swap with
    const activeCard = document.querySelector('.result-card.active');
    if (activeCard) {
        const targetUnit = activeCard.dataset.unit;
        const targetValue = parseFloat(activeCard.querySelector('.unit-value').textContent);
        
        // Swap the values
        fromSelect.value = targetUnit;
        input.value = temperatureConverter.formatResult(targetValue);
        
        // Update conversions
        updateConversions();
    }
}

// Update all temperature conversions
function updateConversions() {
    const input = document.getElementById('temperature-input');
    const fromUnit = document.getElementById('from-unit').value;
    const inputValue = parseFloat(input.value) || 0;
    
    const units = ['celsius', 'fahrenheit', 'kelvin', 'reaumur', 'rankine'];
    
    // Remove active class from all cards
    document.querySelectorAll('.result-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to the source unit card
    const activeCard = document.querySelector(`[data-unit="${fromUnit}"]`);
    if (activeCard) {
        activeCard.classList.add('active');
    }
    
    // Update all conversion results
    units.forEach(unit => {
        const resultElement = document.getElementById(`${unit}-result`);
        const convertedValue = temperatureConverter.convert(inputValue, fromUnit, unit);
        resultElement.textContent = temperatureConverter.formatResult(convertedValue);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize temperature converter
    const temperatureInput = document.getElementById('temperature-input');
    const fromUnitSelect = document.getElementById('from-unit');
    
    // Add event listeners for real-time conversion
    if (temperatureInput && fromUnitSelect) {
        temperatureInput.addEventListener('input', updateConversions);
        fromUnitSelect.addEventListener('change', updateConversions);
        
        // Initial conversion
        updateConversions();
    }
    
    // Add click handlers to result cards for easy swapping
    document.querySelectorAll('.result-card').forEach(card => {
        card.addEventListener('click', function() {
            const unit = this.dataset.unit;
            const value = this.querySelector('.unit-value').textContent;
            
            fromUnitSelect.value = unit;
            temperatureInput.value = value;
            updateConversions();
        });
    });

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

    // Minimal hover effects - removed excessive animations

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Focus input with Ctrl/Cmd + F
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            temperatureInput.focus();
        }
        
        // Clear input with Escape
        if (e.key === 'Escape' && document.activeElement === temperatureInput) {
            temperatureInput.value = '';
            updateConversions();
        }
    });
    
    // Add preset temperature buttons
    const presetTemperatures = [
        { label: 'Absolute Zero', value: -273.15, unit: 'celsius' },
        { label: 'Water Freezing', value: 0, unit: 'celsius' },
        { label: 'Room Temperature', value: 20, unit: 'celsius' },
        { label: 'Body Temperature', value: 37, unit: 'celsius' },
        { label: 'Water Boiling', value: 100, unit: 'celsius' }
    ];
    
    // Create preset buttons if converter exists
    const converterCard = document.querySelector('.converter-card');
    if (converterCard) {
        const presetsContainer = document.createElement('div');
        presetsContainer.className = 'presets-container';
        presetsContainer.innerHTML = '<h3>Quick Presets</h3><div class="presets-buttons"></div>';
        
        const buttonsContainer = presetsContainer.querySelector('.presets-buttons');
        
        presetTemperatures.forEach(preset => {
            const button = document.createElement('button');
            button.className = 'glass-btn preset-btn';
            button.textContent = preset.label;
            button.addEventListener('click', () => {
                fromUnitSelect.value = preset.unit;
                temperatureInput.value = preset.value;
                updateConversions();
            });
            buttonsContainer.appendChild(button);
        });
        
        converterCard.appendChild(presetsContainer);
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

    // Add very subtle 3D tilt effect on mouse position
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.glass-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 200; // Extremely subtle rotation
                const rotateY = (centerX - x) / 200; // Extremely subtle rotation
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }
        });
    });

    // Update copyright year automatically
    function updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        const copyrightElements = document.querySelectorAll('.copyright-year');
        copyrightElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // Call on page load
    updateCopyrightYear();

    // Console welcome message
    console.log('%c🌡️ TempConvert - Temperature Conversion Tool Loaded Successfully!', 
        'color: #ffffff; background: linear-gradient(45deg, #333333, #666666); padding: 10px; border-radius: 5px; font-size: 14px;');
    console.log('%cSupported units: Celsius, Fahrenheit, Kelvin, Réaumur, Rankine', 
        'color: #cccccc; font-size: 12px;');
    console.log(`%cCopyright © ${new Date().getFullYear()} Krishan Yadav. All rights reserved.`, 
        'color: #999999; font-size: 10px;');
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