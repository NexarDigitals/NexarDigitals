// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Custom Cursor (Optimized via GSAP quickTo)
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, button, .process-step, input, select, textarea');

gsap.set(cursor, { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
let yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('active'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
const heroTl = gsap.timeline();

heroTl.from('.line-inner', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power4.out",
    delay: 0.2
})
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from('.hero-cta a', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.6")
    .from('.navbar', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1");

// Sections Fade Up
gsap.utils.toArray('.section-header, .bento-item, .process-step, .tech-marquee-section, .contact-container').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});
