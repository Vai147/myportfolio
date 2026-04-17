// main.js - Cinematic Scroll Observer

document.addEventListener('DOMContentLoaded', () => {

    const cinematicOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const cinematicObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, cinematicOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => cinematicObserver.observe(el));

    // Nav active linkage
    const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const targetId = link.getAttribute('href');
            if(targetId === "#") return;
            
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        if(window.scrollY > window.innerHeight) {
            document.querySelector('#main-nav a[href="#overview"]')?.classList.remove('active');
            document.querySelector('#main-nav a[href="#tech-specs"]')?.classList.add('active');
        } else {
            document.querySelector('#main-nav a[href="#overview"]')?.classList.add('active');
            document.querySelector('#main-nav a[href="#tech-specs"]')?.classList.remove('active');
        }
    });
});
