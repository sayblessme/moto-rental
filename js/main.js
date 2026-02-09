/**
 * MOTO ELITE - Premium Motorcycle Rental
 * Main JavaScript with GSAP animations and Lenis smooth scroll
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Lenis Smooth Scroll
// ============================================
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

const lenis = new Lenis({
    duration: isMobile ? 0.8 : 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothTouch: true,
    touchMultiplier: 1.8,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ============================================
// Preloader
// ============================================
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
    setTimeout(() => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                preloader.style.display = 'none';
                initAnimations();
            }
        });
    }, 2500);
});

// ============================================
// Menu Toggle
// ============================================
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');

    if (menu.classList.contains('active')) {
        lenis.stop();
    } else {
        lenis.start();
    }
});

// Close menu on link click
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        menu.classList.remove('active');
        lenis.start();
    });
});

// ============================================
// Header Scroll Effect
// ============================================
const header = document.querySelector('.header');
let lastScroll = 0;

function handleScroll(scroll) {
    if (scroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (scroll > lastScroll && scroll > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = scroll;
}

lenis.on('scroll', ({ scroll }) => handleScroll(scroll));

// ============================================
// Initialize Animations
// ============================================
function initAnimations() {
    // Parallax effects for images
    initParallax();

    // Text split animations on scroll
    initTextAnimations();

    // Fade in animations
    initFadeAnimations();

    // Fleet slider
    initFleetSlider();
}

// ============================================
// Parallax Effects (desktop only)
// ============================================
function initParallax() {
    // Hero image parallax
    const heroImage = document.querySelector('.hero__media__image');
    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Media sections parallax
    document.querySelectorAll('.media-container').forEach(container => {
        gsap.to(container, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: container.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Gallery items parallax
    document.querySelectorAll('[data-parallax-item]').forEach((item, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        gsap.to(item.querySelector('.image-placeholder, img'), {
            yPercent: 10 * direction,
            ease: 'none',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Experience image parallax
    const expImage = document.querySelector('.experience__image');
    if (expImage) {
        gsap.to(expImage.querySelector('.image-placeholder, img'), {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: expImage,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

// ============================================
// Text Animations
// ============================================
function initTextAnimations() {
    // Split text animations for sections
    document.querySelectorAll('[data-split-text]').forEach(element => {
        // Skip hero elements (they have CSS animations)
        if (element.closest('.hero')) return;

        const text = element.innerHTML;
        const words = text.split(/\s+/);

        element.innerHTML = words.map(word =>
            `<span class="word"><span class="word-inner">${word}</span></span>`
        ).join(' ');

        const wordInners = element.querySelectorAll('.word-inner');

        gsap.set(wordInners, { yPercent: 100 });

        ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(wordInners, {
                    yPercent: 0,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });

    // Section titles
    document.querySelectorAll('.section-title').forEach(title => {
        if (title.hasAttribute('data-split-text')) return;

        gsap.set(title, { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: title,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });
}

// ============================================
// Fade Animations
// ============================================
function initFadeAnimations() {
    // Fade in elements
    document.querySelectorAll('[data-fade-in]').forEach((element) => {
        gsap.set(element, { opacity: 0, y: 30 });

        ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });

    // Fleet cards
    document.querySelectorAll('.fleet-card').forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 50 });

        ScrollTrigger.create({
            trigger: card,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });

    // Service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 40 });

        ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });

    // Features
    document.querySelectorAll('.feature').forEach((feature, index) => {
        gsap.set(feature, { opacity: 0, x: -30 });

        ScrollTrigger.create({
            trigger: feature,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(feature, {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });

    // Quote section
    document.querySelectorAll('.quote__ornament').forEach(ornament => {
        gsap.set(ornament, { opacity: 0, scale: 0.8 });

        ScrollTrigger.create({
            trigger: ornament,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(ornament, {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out'
                });
            },
            once: true
        });
    });
}

// ============================================
// Fleet Slider (infinite loop on desktop)
// ============================================
function initFleetSlider() {
    const track = document.querySelector('.fleet-slider__track');
    const cards = Array.from(document.querySelectorAll('.fleet-card'));
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (!track || cards.length === 0) return;

    // On mobile — native scroll, no JS slider
    const isMobileSlider = () => window.innerWidth < 768;
    if (isMobileSlider()) return;

    let currentIndex = 0;
    let isAnimating = false;

    function getCardWidth() {
        const card = track.querySelector('.fleet-card');
        const gap = parseFloat(getComputedStyle(track).gap) || 32;
        return card.offsetWidth + gap;
    }

    function updatePosition(animate) {
        const offset = -currentIndex * getCardWidth();
        if (animate) {
            track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(${offset}px)`;
    }

    function slideNext() {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex++;
        updatePosition(true);

        track.addEventListener('transitionend', function handler() {
            track.removeEventListener('transitionend', handler);
            if (currentIndex >= cards.length) {
                currentIndex = 0;
                updatePosition(false);
            }
            isAnimating = false;
        });
    }

    function slidePrev() {
        if (isAnimating) return;
        isAnimating = true;

        if (currentIndex <= 0) {
            currentIndex = cards.length;
            updatePosition(false);
            // Force reflow
            track.offsetHeight;
        }

        currentIndex--;
        updatePosition(true);

        track.addEventListener('transitionend', function handler() {
            track.removeEventListener('transitionend', handler);
            isAnimating = false;
        });
    }

    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    // Reset on resize
    window.addEventListener('resize', () => {
        if (isMobileSlider()) {
            track.style.transform = '';
            track.style.transition = '';
            return;
        }
        currentIndex = 0;
        updatePosition(false);
    });
}

// ============================================
// Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Animate button
        const submitBtn = contactForm.querySelector('.submit');
        const originalText = submitBtn.querySelector('.button__text').textContent;

        submitBtn.querySelector('.button__text').textContent = 'Отправляем...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.querySelector('.button__text').textContent = 'Отправлено!';

            gsap.to(submitBtn, {
                scale: 1.05,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });

            setTimeout(() => {
                submitBtn.querySelector('.button__text').textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.5
            });
        }
    });
});

// ============================================
// Magnetic Buttons (optional enhancement)
// ============================================
document.querySelectorAll('.button, .slider-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ============================================
// Cursor Custom (optional)
// ============================================
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const outline = cursor.querySelector('.cursor-outline');

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.set(dot, { x: mouseX, y: mouseY });
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        gsap.set(outline, { x: outlineX, y: outlineY });
        requestAnimationFrame(animateOutline);
    }

    animateOutline();

    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            pointer-events: none;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10001;
            mix-blend-mode: difference;
        }

        .cursor-dot {
            width: 8px;
            height: 8px;
            background: #c9b896;
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
        }

        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(201, 184, 150, 0.5);
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }

        a:hover ~ .custom-cursor .cursor-outline,
        button:hover ~ .custom-cursor .cursor-outline {
            width: 60px;
            height: 60px;
        }

        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
};

// Uncomment to enable custom cursor
// createCustomCursor();

// ============================================
// Initialize on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for word split animation
    const style = document.createElement('style');
    style.textContent = `
        .word {
            display: inline-block;
            overflow: hidden;
            vertical-align: top;
        }

        .word-inner {
            display: inline-block;
        }

        .header {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header.scrolled {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);

    // Auto-update copyright year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
