function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

///////////////////////////////////////////////////////////////////////////

// Detect Touch Device
function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

///////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////

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
                    icon.classList.remove('ri-close-large-fill');
                    icon.classList.add('ri-menu-4-line');
                }
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .hamburger');

    if (!cursor) return;

    // Hide cursor on touch devices to reduce processing overhead
    if (isTouchDevice()) {
        cursor.style.display = 'none';
        return;
    }

    // Move cursor with mouse (non-touch devices only)
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 5,
            y: e.clientY - 5,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
}

///////////////////////////////////////////////////////////////////////////

// Add viewport mouse leave/enter cursor hide/show
function handleCursorViewportVisibility() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    // Show custom cursor and hide default on page load
    cursor.style.display = 'block';
    document.body.style.cursor = 'none';

    // Hide custom cursor and show default when mouse leaves viewport
    window.addEventListener('mouseout', (e) => {
        if (!e.relatedTarget && !e.toElement) {
            cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
    });

    // Show custom cursor and hide default when mouse enters viewport
    window.addEventListener('mouseover', () => {
        cursor.style.display = 'block';
        document.body.style.cursor = 'none';
    });

    // Fallback: On window blur (e.g., desktop switch), always show default cursor
    window.addEventListener('blur', () => {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    });

    // Fallback: On window focus, restore custom cursor if mouse is inside window
    window.addEventListener('focus', () => {
        cursor.style.display = 'block';
        document.body.style.cursor = 'none';
    });

    // Extra: On pointerleave/pointerenter for more reliability
    document.body.addEventListener('pointerleave', () => {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    });
    document.body.addEventListener('pointerenter', () => {
        cursor.style.display = 'block';
        document.body.style.cursor = 'none';
    });
}

///////////////////////////////////////////////////////////////////////////

// Navbar Animation
function animateNavbar() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

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
        }, "-=0.2");

    return tl; // return timeline
}

///////////////////////////////////////////////////////////////////////////

// Home Section Animation
function animateHome() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.from('#home #hello', {
        opacity: 0,
        duration: 0.5
    })
        .from('#home .text h1', {
            y: 30,
            opacity: 0,
            duration: 0.5
        }, "-=0.3")
        .from('#home .text p', {
            y: 30,
            opacity: 0,
            duration: 0.3
        }, "-=0.3")
        .from('#home .my_pic', {
            y: 30,
            opacity: 0,
            duration: 0.4,
            ease: 'power4.out'
        }, "-=0.3");

    return tl; // return timeline
}

///////////////////////////////////////////////////////////////////////////

// Lines Background Animation
function animateLinesBackground() {
    if (document.querySelector('#lines')) {
        gsap.to('#lines', {
            scale: 1.06,
            opacity: 0.8,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

///////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////

// Optimized marqueAnimation function
function marqueAnimation() {
    let ticking = false;
    window.addEventListener("wheel", function (e) {
        if (!ticking) {
            requestAnimationFrame(function () {
                if (e.deltaY > 0) {
                    gsap.to(".marque", {
                        transform: "translateX(-200%)",
                        duration: 2,
                        repeat: -1,
                        ease: "none"
                    });
                    gsap.to(".marque i", { rotate: 180 });
                } else {
                    gsap.to(".marque", {
                        transform: "translateX(0%)",
                        duration: 2,
                        repeat: -1,
                        ease: "none"
                    });
                    gsap.to(".marque i", { rotate: 0 });
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

///////////////////////////////////////////////////////////////////////////

// About Section Animation
function initAboutSectionAnimation() {
    // Main timeline for about section animations
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 90%", // Start when top of section hits 90% of viewport
            end: "top 50%", // End when center hits 30% of viewport
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
            start: "top 80%", // Start when card top hits 80% of viewport
            end: "top 45%", // End when card top hits 45% of viewport
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
}

///////////////////////////////////////////////////////////////////////////

// Skills Section Animation
function initSkillsSectionAnimation(useScrollTrigger = true) {
    // Timeline for Skills section
    const skillsTl = gsap.timeline(useScrollTrigger ? {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 90%",
            end: "top 70%",
            scrub: 0.6,
            toggleActions: "play none none reverse"
        }
    } : {});

    // Animate heading
    skillsTl.from(['#skills h1', '#skills h6'], {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Animate each card
    gsap.utils.toArray('#skills .card').forEach((card, index) => {
        const cardTl = gsap.timeline(useScrollTrigger ? {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 70%",
                scrub: 0.6,
                toggleActions: "play none none reverse"
            }
        } : { delay: index * 0.2 });

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

    return skillsTl;
}

///////////////////////////////////////////////////////////////////////////

// Others Section Animation
function initOthersSectionAnimation(useScrollTrigger = true) {
    // Timeline for 'Others' section
    const othersTl = gsap.timeline(useScrollTrigger ? {
        scrollTrigger: {
            trigger: "#others",
            start: "top 90%",
            end: "top 70%",
            scrub: 0.6,
            toggleActions: "play none none reverse"
        }
    } : {});

    // Animate heading
    othersTl.from('#others h1', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    });

    // Animate each board
    gsap.utils.toArray('#others .board').forEach((board, index) => {
        const boardTl = gsap.timeline(useScrollTrigger ? {
            scrollTrigger: {
                trigger: board,
                start: "top 80%",
                end: "top 60%",
                scrub: 0.6,
                toggleActions: "play none none reverse"
            }
        } : { delay: index * 0.2 });

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
                // Start each content animation after the board pop-up, with slight stagger
                boardTl.from(element, props, i * 0.1);
            }
        });
    });

    return othersTl;
}

///////////////////////////////////////////////////////////////////////////

// Projects Section Animation
function initProjectsSectionAnimation(useScrollTrigger = true) {
    // Timeline for Projects section
    const projectsTl = gsap.timeline(useScrollTrigger ? {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 90%",
            end: "top 70%",
            scrub: 0.6,
            toggleActions: "play none none reverse"
        }
    } : {});

    // Animate headings
    projectsTl.from('#projects h1', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    });

    // Animate blur rectangle
    projectsTl.from('#projects .blurRectangle', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out'
    }, "-=0.5");

    // Animate each card
    gsap.utils.toArray('#projects .card').forEach((card, index) => {
        const cardTl = gsap.timeline(useScrollTrigger ? {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 55%",
                scrub: 0.6,
                toggleActions: "play none none reverse"
            }
        } : { delay: index * 0.2 });

        // Animate icon/image
        cardTl.from(card.querySelector('.card-image'), {
            x: -40,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, "-=0.4");

        // Animate main title
        cardTl.from(card.querySelector('.card-info-title h3'), {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.3");

        // Animate subtitle
        cardTl.from(card.querySelector('.card-info-title h4'), {
            y: 25,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.25");

        // Animate inner heading
        cardTl.from(card.querySelector('.inner .heading h4'), {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, "-=0.3");

        // Animate paragraph
        cardTl.from(card.querySelector('.inner p'), {
            y: 25,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, "-=0.25");
    });

    // Animate decorative elements
    // projectsTl.from('#projects .circleTech-1', {
    //     scale: 0,
    //     opacity: 0,
    //     duration: 0.5,
    //     ease: 'back.out(2)'
    // }, "-=0.5")
    //     .from('#projects .triangle-14', {
    //         scale: 0,
    //         rotation: 90,
    //         opacity: 0,
    //         duration: 0.5,
    //         ease: 'back.out(2)'
    //     }, "-=0.4");

    return projectsTl;
}

///////////////////////////////////////////////////////////////////////////

// Contact Section Animation
function initContactSectionAnimation(useScrollTrigger = true) {
    // Timeline for Contact section with proper ScrollTrigger configuration
    const contactTl = gsap.timeline(useScrollTrigger ? {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play none none none" // Only play once, no reverse
        }
    } : {});

    // Animate heading
    contactTl.from('#contact-heading', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out'
    })
        // Animate contact columns (main container elements only)
        .from('.contact-col', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        }, "-=0.4");

    return contactTl;
}

///////////////////////////////////////////////////////////////////////////

// ALL Sections Animation
function animateSectionsOnScroll() {
    gsap.utils.toArray(['#about', '#move', '#skills', '#others', '#projects']).forEach(section => {
        gsap.from(section, {
            y: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 100%',
                end: 'top 65%',
                scrub: 0.6,
                // markers: true,
                toggleActions: 'play none none reverse'
            }
        });
    });
}

///////////////////////////////////////////////////////////////////////////

// Optimized initCardHoverEffect function
function initCardHoverEffect() {
    const cardsContainer = document.getElementById("cards");
    if (!cardsContainer) return;

    const cards = Array.from(cardsContainer.getElementsByClassName("card"));
    if (cards.length === 0) return;

    const debouncedMouseMove = debounce((e) => {
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    }, 16); // ~60fps

    cardsContainer.addEventListener("mousemove", debouncedMouseMove, { passive: true });
}

///////////////////////////////////////////////////////////////////////////

// Optimized card hover effect using debounce
function initOptimizedCardHover() {
    const cardsContainer = document.getElementById("cards");
    if (!cardsContainer) return;
    const debouncedMouseMove = debounce((e) => {
        const cards = cardsContainer.querySelectorAll(".card");
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    }, 16);
    cardsContainer.addEventListener("mousemove", debouncedMouseMove, { passive: true });
}

///////////////////////////////////////////////////////////////////////////

// Card Hover OTHERS section
function initBoardHoverEffect() {
    const containers = document.querySelectorAll('.glow-hover');
    containers.forEach(container => {
        const items = container.querySelectorAll('.board, .card');
        if (items.length === 0) return;
        container.addEventListener('mousemove', (e) => {
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                item.style.setProperty('--mouse-x', `${x}px`);
                item.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        container.addEventListener('mouseleave', () => {
            items.forEach(item => {
                item.style.removeProperty('--mouse-x');
                item.style.removeProperty('--mouse-y');
            });
        });
    });
}

///////////////////////////////////////////////////////////////////////////

// Card Mouse Effects for Projects Section
function initCardMouseEffects() {
    const projectCardsContainer = document.querySelector('#projects #cards');
    if (!projectCardsContainer) {
        console.warn('Project cards container (#projects #cards) not found');
        return;
    }

    const cards = projectCardsContainer.querySelectorAll('.card');

    cards.forEach(card => {
        const debouncedMouseMove = debounce((e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mousemove', debouncedMouseMove);
        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--mouse-x');
            card.style.removeProperty('--mouse-y');
        });
    });
}

///////////////////////////////////////////////////////////////////////////

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
    });
}

///////////////////////////////////////////////////////////////////////////

// Typing Animation
function initTypingAnimation() {
    const typedTarget = document.querySelector('#typed-text');
    if (!typedTarget) return;

    setTimeout(() => {
        new Typed('#typed-text', {
            strings: [
                '&lt;Front-End Developer/&gt;',
                '&lt;Perfectionist/&gt;',
                '&lt;Code. Design. Disrupt./&gt;',
                '&lt;Creative Photographer/&gt;',
                '&lt;Cinematography Lover/&gt;',
                '&lt;Visionary Builder/&gt;'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 600,
            startDelay: 300,
            loop: true,
            smartBackspace: true,
            html: false
        });
    }, 1400);
}

///////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////

// Contact Form Handling
function handleContactForm() {
    // const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');

    // if (!form) return;

    // form.addEventListener('submit', async (e) => {
    //     e.preventDefault();

    //     // Disable button & show feedback
    //     submitBtn.disabled = true;
    //     submitBtn.textContent = 'Sending...';
    //     statusDiv.textContent = '';

    //     const formData = new FormData(form);

    //     try {
    //         const response = await fetch('https://api.web3forms.com/submit', {
    //             method: 'POST',
    //             body: formData
    //         });

    //         const result = await response.json();

    //         if (response.ok && result.success) {
    //             statusDiv.style.color = 'green';
    //             statusDiv.textContent = '✅ Message sent successfully!';
    //             form.reset();
    //         } else {
    //             statusDiv.style.color = 'red';
    //             statusDiv.textContent = `❌ ${result.message || 'Failed to send message.'}`;
    //         }

    //     } catch (err) {
    //         console.error('Submission error:', err);
    //         statusDiv.style.color = 'red';
    //         statusDiv.textContent = '⚠️ An unexpected error occurred.';
    //     } finally {
    //         submitBtn.disabled = false;
    //         submitBtn.textContent = 'Send';
    //     }
    // });
}

///////////////////////////////////////////////////////////////////////////

// Fallback Animations for Touch Devices or Unsupported ScrollTrigger
function initTouchFallbackAnimations() {
    if (!isTouchDevice() && typeof ScrollTrigger !== 'undefined') {
        return;
    }

    console.log('Applying touch fallback animations');

    const masterTl = gsap.timeline({ delay: 1 });

    const aboutTl = gsap.timeline();
    aboutTl.from('#about h1', {
        y: 60,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out'
    })
        .from('.blurRectangle', {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out'
        }, "-=0.2")
        .from('.about_intro-card', {
            scale: 0.85,
            opacity: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.8)'
        }, "-=0.2")
        .from('.about_card-image img', {
            x: -40,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        })
        .from('.about_card-info-title h3', {
            y: 30,
            opacity: 0,
            duration: 0.5
        }, "-=0.3")
        .from('.about_card-info-title h4', {
            y: 25,
            opacity: 0,
            duration: 0.5
        }, "-=0.25")
        .from('#typed-desc', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.25");

    const skillsTl = initSkillsSectionAnimation(false);
    const othersTl = initOthersSectionAnimation(false);
    const projectsTl = initProjectsSectionAnimation(false);
    const contactTl = initContactSectionAnimation(false);

    masterTl.add(aboutTl, 0)
        .add(skillsTl, 1)
        .add(othersTl, 2)
        .add(projectsTl, 3)
        .add(contactTl, 4);

    if (CSSRulePlugin) {
        const containerBefore = CSSRulePlugin.getRule("#about .container::before");
        const containerAfter = CSSRulePlugin.getRule("#about .container::after");
        masterTl.fromTo(containerBefore, { cssRule: { opacity: 0, scale: 0.7, rotation: 0 } }, { cssRule: { opacity: 1, scale: 1.2, rotation: 45 }, duration: 1.2, ease: 'power4.out' }, 0.5)
            .fromTo(containerAfter, { cssRule: { opacity: 0, scale: 0.9, rotation: 0 } }, { cssRule: { opacity: 0.9, scale: 1.3, rotation: 45 }, duration: 1.2, ease: 'power4.out' }, 0.7);

        const triangles = ['.triangle-1', '.triangle-2', '.triangle-3'];
        triangles.forEach((triangle, index) => {
            masterTl.from(triangle, { scale: 0, rotation: 90, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, 0.5 + index * 0.2);
        });
    }
}

///////////////////////////////////////////////////////////////////////////

// Cleanup Animations
function cleanupAnimations() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    if (typeof gsap !== 'undefined') {
        gsap.killTweensOf("*");
    }
}

///////////////////////////////////////////////////////////////////////////

// Call on page unload
window.addEventListener('beforeunload', cleanupAnimations);

///////////////////////////////////////////////////////////////////////////

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Make sure ScrollToPlugin and CSSRulePlugin are also defined before registering
        if (typeof ScrollToPlugin !== 'undefined' && typeof CSSRulePlugin !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CSSRulePlugin);
        } else {
            console.warn('ScrollToPlugin or CSSRulePlugin not found');
            gsap.registerPlugin(ScrollTrigger); // register at least ScrollTrigger
        }

        // Initialize your UI features - make sure all these functions are defined
        setupHamburgerMenu();
        animateNavbar();
        animateHome();
        handleMouseMoveAndSVG();
        // animateLinesBackground();
        if (!isTouchDevice()) {
            marqueAnimation();
        }
        initSmoothNavScroll();
        initCustomCursor();
        handleCursorViewportVisibility();
        initCardHoverEffect();
        initOptimizedCardHover();
        initBoardHoverEffect(); // <-- ADD THIS LINE
        initializeVanillaTilt(".card, .board");
        initTypingAnimation();
        // createRubberBandEffect(".rubber-band");
        initCardMouseEffects();
        // initGlowHoverEffect();

        // For touch devices or if ScrollTrigger unsupported
        if (isTouchDevice() || typeof ScrollTrigger === 'undefined') {
            initTouchFallbackAnimations();
        } else {
            // initAboutSectionAnimation();
            initSkillsSectionAnimation();
            initOthersSectionAnimation();
            initProjectsSectionAnimation();
            initContactSectionAnimation();
            animateSectionsOnScroll();
        }

        // ✅ JS-based Web3Forms Contact Form Handler
        handleContactForm();

    } else {
        console.error('GSAP or ScrollTrigger not loaded');
        initTouchFallbackAnimations();

        // ✅ Ensure contact form handler runs even if GSAP fails
        handleContactForm();
    }
});
