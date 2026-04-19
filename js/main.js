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
    let manualScrollTimer = null;
    let isManualScroll = false;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            isManualScroll = true;
            clearTimeout(manualScrollTimer);
            manualScrollTimer = setTimeout(() => { isManualScroll = false; }, 1000);

            const targetId = link.getAttribute('href');
            if (targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
                targetEl.classList.add('active');
            }
        });
    });

    const sectionIds = ['overview', 'experience', 'skills', 'projects'];
    const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const sectionObserver = new IntersectionObserver((entries) => {
        if (isManualScroll) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector(`#main-nav a[href="#${id}"]`)?.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(sec => sectionObserver.observe(sec));
});
