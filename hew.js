// Utility function to throttle events
function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// Hamburger Menu
function setupHamburgerMenu() {
    const hamburger = document.querySelector('#hamburger');
    const navLinks = document.querySelector('#nav-links');

    // Check for missing elements
    if (!hamburger || !navLinks) {
        console.error('Hamburger menu failed: #hamburger or #nav-links not found');
        return;
    }

    // Toggle menu on click
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.toggle('active');

        // Update icon
        const icon = hamburger.querySelector('i');
        if (icon) {
            icon.classList.toggle('ri-menu-4-line');
            icon.classList.toggle('ri-close-large-fill');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.add('ri-menu-4-line');
                icon.classList.remove('ri-close-large-fill');
            }
        });
    });
}

// NavBar and HOME Animation
function animateNavbarAndHome() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // NAVBAR Animations
    tl.from('nav .logo', {
        y: -50,
        opacity: 0,
        duration: 0.3
    })
        .from('nav .nav-links', {
            y: -50,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1
        }, "-=0.2")
        .from('nav #btnElement', {
            y: -50,
            opacity: 0,
            duration: 0.3
        }, "-=0.2")

        // HOME Section Animations
        .from('#home #hello', {
            opacity: 0,
            duration: 0.5
        })
        .from('#home .vector_1', {
            x: -30,
            opacity: 0,
            duration: 0.5,
            ease: 'power4.out'
        }, "-=0.3")
        .from('#home .text h1', {
            y: 30,
            opacity: 0,
            duration: 0.5
        }, "-=0.3")
        .from('#home .vector_2', {
            x: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power4.out'
        }, "-=0.4")
        .from('#home .text p', {
            y: 30,
            opacity: 0,
            duration: 0.3
        }, "-=0.3")
        .from('#home .logo-image', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power4.out'
        }, "-=0.3")
        .from('#home .my_pic', {
            y: 30,
            opacity: 0,
            duration: 0.4,
            ease: 'power4.out'
        }, "-=0.3");
}

// Lines Background Animation
function animateLinesBackground() {
    if (document.querySelector('#lines')) {
        gsap.to('#lines', {
            scale: 1.03,
            opacity: 0.8,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// About Section Animation
function initAboutSectionAnimation() {
    // Main timeline for about section animations
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 90%", // Start when top of section hits 80% of viewport
            end: "center 50%", // End when center hits 30% of viewport
            scrub: 0.6, // Smooth scroll-linked animation
            toggleActions: "play none none reverse" // Play on enter, reverse on leave
        }
    });

    // Animate section title sliding up
    aboutTl.from('#about h1', {
        y: 60,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out'
    })
        // Animate blur rectangle scaling up
        .from('.blurRectangle', {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out'
        }, "-=0.2")
        // Animate intro card with elastic effect
        .from('.about_intro-card', {
            scale: 0.85,
            opacity: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.8)'
        }, "-=0.2");

    // Timeline for about card elements
    const cardTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about_intro-card",
            start: "top 80%", // Start when card top hits 75% of viewport
            end: "top 45%", // End when card top hits 25% of viewport
            scrub: 0.8, // Slightly slower scrub for detail
            toggleActions: "play none none reverse"
        }
    });

    // Animate card image sliding in from left
    cardTl.from('.about_card-image img', {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    })
        // Animate card title sliding up
        .from('.about_card-info-title h3', {
            y: 30,
            opacity: 0,
            duration: 0.5
        }, "-=0.3")
        // Animate card subtitle sliding up
        .from('.about_card-info-title h4', {
            y: 25,
            opacity: 0,
            duration: 0.5
        }, "-=0.25")
        // Animate description sliding up
        .from('#typed-desc', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.25");

    // Animate ::before pseudo-element (assumes defined in CSS)
    if (CSSRulePlugin) {
        const containerBefore = CSSRulePlugin.getRule("#about .container::before");
        gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top 85%",
                end: "center 25%",
                scrub: 0.7,
                toggleActions: "play none none reverse"
            }
        })
            .fromTo(containerBefore, {
                cssRule: { opacity: 0, scale: 0.7, rotation: 0 }
            }, {
                cssRule: { opacity: 1, scale: 1.2, rotation: 45 },
                duration: 1.2,
                ease: 'power4.out'
            });

        // Animate ::after pseudo-element (assumes defined in CSS)
        const containerAfter = CSSRulePlugin.getRule("#about .container::after");
        gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "top 50%",
                end: "center 5%",
                scrub: 0.6,
                toggleActions: "play none none reverse"
            }
        })
            .fromTo(containerAfter, {
                cssRule: { opacity: 0, scale: 0.9, rotation: 0 }
            }, {
                cssRule: { opacity: 0.9, scale: 1.3, rotation: 45 },
                duration: 1.2,
                ease: 'power4.out'
            });

        // Animate triangle elements
        const triangles = ['.triangle-1', '.triangle-2', '.triangle-3'];
        triangles.forEach((triangle, index) => {
            gsap.from(triangle, {
                scrollTrigger: {
                    trigger: "#about",
                    start: `top ${55 - (index * 6)}%`, // Staggered start
                    end: `center ${35 - (index * 6)}%`, // Staggered end
                    scrub: true,
                    toggleActions: "play none none reverse"
                },
                scale: 0,
                rotation: 90,
                opacity: 0,
                duration: 0.5,
                ease: 'back.out(2)'
            });
        });
    }
}

// Marque Animation
function marqueAnimation() {
    window.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) {
            gsap.to(".marque", {
                // x: 100,
                transform: "translateX(-200%)",
                duration: 2,
                repeat: -1,
                ease: "none"
            })
            gsap.to(".marque i", {
                rotate: 180
            })
        }
        else {
            gsap.to(".marque", {
                // x: -100,
                transform: "translateX(0%)",
                duration: 2,
                repeat: -1,
                ease: "none"
            })
            gsap.to(".marque i", {
                rotate: 0
            })
        }
    });
}

// String SVG Animation
function handleMouseMoveAndSVG() {
    const stringContainer = document.querySelector("#string");
    const svgPath = document.querySelector("svg path");

    if (!svgPath || !stringContainer) return;

    // Initial and final path states (using percentage-based coordinates)
    const initialPath = `M 0 50 Q 50 50 100 50`;
    let finalPath = initialPath;

    // Function to convert mouse coordinates to SVG viewBox coordinates
    function convertCoordinates(x, y) {
        const containerRect = stringContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        // Convert to viewBox coordinates (0-100 range)
        const svgX = (x - containerRect.left) / containerWidth * 100;
        const svgY = (y - containerRect.top) / containerHeight * 100;

        return { x: svgX, y: svgY };
    }

    // Mouse move event listener
    stringContainer.addEventListener("mousemove", function (dets) {
        const coords = convertCoordinates(dets.clientX, dets.clientY);
        const newPath = `M 0 50 Q ${coords.x} ${coords.y} 100 50`;

        gsap.to(svgPath, {
            attr: { d: newPath },
            duration: 0.3,
            ease: "power3.out"
        });
    });

    // Mouse leave event listener
    stringContainer.addEventListener("mouseleave", function () {
        gsap.to(svgPath, {
            attr: { d: finalPath },
            duration: 1.5,
            ease: "elastic.out(1, 0.2)"
        });
    });
}

// Skills Section Animation
function initSkillsSectionAnimation() {
    // Timeline for Skills section
    const skillsTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top 80%",
            end: "center 60%",
            scrub: 0.6,
            toggleActions: "play none none reverse"
        }
    });

    // Animate heading
    skillsTl.from('#skills h1', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    });

    // Animate each card
    gsap.utils.toArray('#skills .card').forEach((card, index) => {
        const cardTl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 80%",
                scrub: 0.6,
                toggleActions: "play none none reverse"
            }
        });

        // Step 2: Animate icon/image
        cardTl.from(card.querySelector('.card-image'), {
            x: -40,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, "-=0.4");

        // Step 3: Animate main title
        cardTl.from(card.querySelector('.card-info-title h3'), {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.3");

        // Step 4: Animate subtitle
        cardTl.from(card.querySelector('.card-info-title h4'), {
            y: 25,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.25");

        // Step 5: Animate inner heading
        cardTl.from(card.querySelector('.inner .heading h4'), {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.3");

        // Step 6: Animate paragraph
        cardTl.from(card.querySelector('.inner p'), {
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, "-=0.25");
    });
}

// Others Section Animation
function initOthersSectionAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline for 'Others' section
    const othersTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#others",
            start: "top 80%",
            end: "center 60%",
            scrub: 0.6,
            toggleActions: "play none none reverse"
        }
    });

    // Animate heading
    othersTl.from('#others h1', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    });

    // Animate each board
    gsap.utils.toArray('#others .board').forEach((board, index) => {
        const boardTl = gsap.timeline({
            scrollTrigger: {
                trigger: board,
                start: "top 85%",
                end: "top 65%",
                scrub: 0.6,
                toggleActions: "play none none reverse"
            }
        });

        // Step 2: Animate content sequentially after board pop-up
        const contentAnimations = [
            { selector: '.board-image', props: { x: -40, opacity: 0, duration: 0.5, ease: 'power3.out' } },
            { selector: '.board-info-title h3', props: { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out' } },
            { selector: '.board-info-title h4', props: { y: 25, opacity: 0, duration: 0.5, ease: 'power2.out' } },
            { selector: '.inner .headings h4', props: { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out' } },
            { selector: '.inner p', props: { y: 25, opacity: 0, duration: 0.6, ease: 'power2.out' } }
        ];

        contentAnimations.forEach(({ selector, props }, i) => {
            const element = board.querySelector(selector);
            if (element) {
                boardTl.from(element, props, i * 0.1);
            }
        });
    });
}

// ALL Sections Animation
function animateSectionsOnScroll() {
    gsap.utils.toArray(['#about', '#move', '#skills', '#contact']).forEach(section => {
        gsap.from(section, {
            y: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 100%',
                end: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Smooth Nav Scroll
function initSmoothNavScroll() {
    const navLinks = document.querySelector('#nav-links');
    const hamburger = document.querySelector('#hamburger');

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                console.error(`Target element ${targetId} not found`);
                return;
            }

            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetElement,
                    offsetY: 100
                },
                ease: 'power2.out',
                onComplete: () => console.log(`Scrolled to ${targetId}`)
            });

            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger?.querySelector('i');
                if (icon) {
                    icon.classList.remove('ri-close-line');
                    icon.classList.add('ri-menu-line');
                }
            }
        });
    });
}

// Custom Cursor (Commented out - Replaced with throttled version)
/*
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .hamburger');

    if (!cursor) return;

    // Move cursor with mouse
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 5,
            y: e.clientY - 5,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3
        });
    });

    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            opacity: 1,
            duration: 0.3
        });
    });

    // 💡 Interactive hover effect
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('interactive');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('interactive');
        });
    });
}
*/

// Updated Custom Cursor with Throttling
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .hamburger');

    if (!cursor) {
        console.error('Custom cursor failed: .custom-cursor not found');
        return;
    }

    // Update cursor position with GSAP
    function updateCursor(e) {
        gsap.to(cursor, {
            x: e.clientX - 5,
            y: e.clientY - 5,
            duration: 0.1,
            ease: 'power2.out'
        });
    }

    // Throttle mousemove event (runs every 16ms ~ 60fps)
    document.addEventListener('mousemove', throttle(updateCursor, 16));

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3
        });
    });

    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            opacity: 1,
            duration: 0.3
        });
    });

    // Interactive hover effect
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('interactive');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('interactive');
        });
    });
}

// Vanilla Tilt
function initializeVanillaTilt(selector) {
    VanillaTilt.init(document.querySelectorAll(selector), {
        reverse: true,
        transition: true,
        max: 10,
        glare: true,
        "max-glare": 1,
        speed: 1000,
        scale: 1.05,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        gyroscope: true,
        gyroscopeMinAngleX: -15,
        gyroscopeMaxAngleX: 15,
        gyroscopeMinAngleY: -15,
        gyroscopeMaxAngleY: 15,
    });
}

// Typing Animation (Commented out - Replaced with updated version)
/*
function initTypingAnimation() {
    const typedTarget = document.querySelector('#typed-text');
    if (!typedTarget) return;

    setTimeout(() => {
        new Typed('#typed-text', {
            strings: [
                '<Front-End Developer/>',
                '<Perfectionist/>',
                '<Code. Design. Disrupt./>',
                '<Creative Photographer/>',
                '<Cinematography Lover/>',
                '<Visionary Builder/>'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 600,
            startDelay: 500,
            loop: true,
            smartBackspace: true,
            html: false
        });
    }, 1500);
}
*/

// Updated Typing Animation with ScrollTrigger and Error Logging
function initTypingAnimation() {
    const typedTarget = document.querySelector('#typed-text');
    if (!typedTarget) {
        console.error('Typed animation failed: #typed-text not found');
        return;
    }
    if (typeof Typed === 'undefined') {
        console.error('Typed animation failed: Typed.js library not loaded');
        return;
    }
    gsap.timeline({
        scrollTrigger: {
            trigger: ".about_intro-card",
            start: "top 80%",
            end: "top 45%",
            toggleActions: "play none none reverse"
        }
    }).add(() => {
        new Typed('#typed-text', {
            strings: [
                '<Front-End Developer/>',
                '<Perfectionist/>',
                '<Code. Design. Disrupt./>',
                '<Creative Photographer/>',
                '<Cinematography Lover/>',
                '<Visionary Builder/>'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 600,
            startDelay: 500,
            loop: true,
            smartBackspace: true,
            html: false
        });
    });
}

// Rubber Band Text Animation
function createRubberBandEffect(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        const text = element.textContent;
        const letters = text.split("");

        // Create spans for each letter, preserve spaces
        const html = letters.map(letter =>
            letter === " " ? " " : `<span>${letter}</span>`
        ).join("");

        element.innerHTML = html;
    });
}

// Card Mouse Effects
function initCardMouseEffects() {
    const cardContainers = document.querySelectorAll('#skills #cards, #projects #cards, #others #boards');

    cardContainers.forEach(container => {
        const cards = container.querySelectorAll('.card, .board');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            // Optional: Reset custom styling if needed
            card.addEventListener('mouseleave', () => {
                card.style.removeProperty('--mouse-x');
                card.style.removeProperty('--mouse-y');
            });
        });
    });
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);

        initCardMouseEffects();
        setupHamburgerMenu();
        handleMouseMoveAndSVG();
        animateLinesBackground();
        animateNavbarAndHome();
        initAboutSectionAnimation();
        marqueAnimation();
        animateSectionsOnScroll();
        initSmoothNavScroll();
        initCustomCursor();
        initializeVanillaTilt(".card, .board");
        initTypingAnimation();
        createRubberBandEffect(".rubber-band");
        initSkillsSectionAnimation();
        initOthersSectionAnimation();
    } else {
        console.error('GSAP or ScrollTrigger not loaded');
    }
});