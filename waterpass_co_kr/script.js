document.addEventListener('DOMContentLoaded', () => {
    // --- Lucide Icons ---
    lucide.createIcons();

    // --- Vanta Background (Dots style for Deep Tech) ---
    const vantaDots = VANTA.DOTS({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00aeef,
        color2: 0x0a1f44,
        backgroundColor: 0x050e21,
        size: 2.10,
        spacing: 36.00,
        showLines: false
    });

    // --- Header Scrolled State ---
    const header = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Language Logic ---
    const btnEn = document.getElementById('btn-en');
    const btnKr = document.getElementById('btn-kr');
    const translatables = document.querySelectorAll('[data-lang-en]');

    const setLanguage = (lang) => {
        translatables.forEach(el => {
            const text = lang === 'en' ? el.getAttribute('data-lang-en') : el.getAttribute('data-lang-ko');
            if (text.includes('<br>')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        });

        // Toggle Buttons
        if (lang === 'en') {
            btnEn.classList.add('active');
            btnKr.classList.remove('active');
            document.documentElement.lang = 'en';
        } else {
            btnKr.classList.add('active');
            btnEn.classList.remove('active');
            document.documentElement.lang = 'ko';
        }

        localStorage.setItem('waterpass-lang-perf', lang);
    };

    btnEn.addEventListener('click', () => setLanguage('en'));
    btnKr.addEventListener('click', () => setLanguage('ko'));

    // Persistence
    const savedLang = localStorage.getItem('waterpass-lang-perf') || 'en';
    setLanguage(savedLang);

    // --- Mobile Menu ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Smooth Scroll Sections ---
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.classList.remove('active');
        });
    });

    // --- Simple Reveal on Scroll ---
    const revealElements = document.querySelectorAll('.problem-card, .p-card, .d-card, .tech-text');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Global reveal style injection
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
