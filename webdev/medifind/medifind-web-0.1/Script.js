// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .team-card, .benefit-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
    });
});

// Counter Animation for Delivery Counter
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Custom Particle Animation (Backup if Finisher Header fails)
function createParticleAnimation() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const colors = ['#ffe66d', '#4ecdc4', '#2ecc71', '#00fc9f']; // Changed red to green
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 12 + 3;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 1.2 - 0.6;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.2 + 0.15; // 35% max opacity: 0.15-0.35
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            // Outer glow
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(0.5, this.color + '66'); // 40% opacity for mid-glow
            gradient.addColorStop(1, this.color + '00'); // Transparent at edges
            
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner bright core
            ctx.globalAlpha = this.opacity + 0.3;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Initialize counter animation when page loads
window.addEventListener('load', () => {
    const counterElement = document.getElementById('deliveryCounter');
    const targetNumber = 57854;
    animateCounter(counterElement, 0, targetNumber, 2500);

    // Try Finisher Header first, fallback to custom animation
    if (typeof FinisherHeader !== 'undefined') {
        try {
            new FinisherHeader({
                "count": 8,
                "size": {
                    "min": 800,
                    "max": 1200,
                    "pulse": 0
                },
                "speed": {
                    "x": {
                        "min": 0.05,
                        "max": 0.15
                    },
                    "y": {
                        "min": 0.05,
                        "max": 0.15
                    }
                },
                "colors": {
                    "background": "#0a1628",
                    "particles": [
                        "#4ecdc4",
                        "#ffe66d",
                        "#2ecc71",
                        "#00fc9f"
                    ]
                },
                "blending": "overlay",
                "opacity": {
                    "center": 0.35,
                    "edge": 0.05
                },
                "skew": -2,
                "shapes": [
                    "c"
                ]
            });
            console.log('Finisher Header initialized successfully!');
        } catch (error) {
            console.error('Finisher Header failed, using custom animation:', error);
            createParticleAnimation();
        }
    } else {
        console.log('Finisher Header not loaded, using custom animation');
        createParticleAnimation();
    }
});

// Smooth scrolling for navigation links
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

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 22, 40, 0.98)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 22, 40, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    menuToggle.style.fontSize = '30px';
    menuToggle.style.cursor = 'pointer';
    menuToggle.style.color = '#4ECDC4';

    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        document.querySelector('.navbar .container').insertBefore(
            menuToggle,
            navMenu
        );

        menuToggle.addEventListener('click', () => {
            navMenu.style.display = 
                navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Add spinning animation enhancement
const spinningGlobe = document.getElementById('spinningGlobe');
if (spinningGlobe) {
    spinningGlobe.addEventListener('mouseenter', () => {
        spinningGlobe.style.animationDuration = '8s';
    });

    spinningGlobe.addEventListener('mouseleave', () => {
        spinningGlobe.style.animationDuration = '20s';
    });
}

// Modal functionality for 404
const modal = document.getElementById('modal404');
const downloadBtn = document.getElementById('downloadAppBtn');
const closeBtn = document.querySelector('.close');

// Download button in the download section shows 404 modal
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });
}

// Close modal when clicking X
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Stats counter animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/,/g, ''));
                animateCounter(stat, 0, target, 1500);
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && scrolled < window.innerHeight) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    }
});

console.log('MediFind website loaded successfully!');