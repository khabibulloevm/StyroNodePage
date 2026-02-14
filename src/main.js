import './style.css'

// StyroNode Interactivity

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const densitySelect = document.getElementById('density-select');
    const volumeInput = document.getElementById('volume-input');
    const calcResult = document.getElementById('calc-result');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    // 1. Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Reveal elements on scroll
        reveal();
    });

    // 2. Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // 3. Cost Calculator Logic
    const calculateCost = () => {
        const densityPrice = parseFloat(densitySelect.value) || 0;
        const volume = parseFloat(volumeInput.value) || 0;

        let total = densityPrice * volume;

        // Discount logic for large volumes
        if (volume >= 50 && volume < 100) total *= 0.95; // 5% off
        if (volume >= 100) total *= 0.90; // 10% off

        // Formatter for currency
        const formatter = new Intl.NumberFormat('ru-RU');
        calcResult.textContent = formatter.format(Math.round(total));
    };

    densitySelect.addEventListener('change', calculateCost);
    volumeInput.addEventListener('input', calculateCost);

    // 4. Scroll Reveal Intersection Observer
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');

        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial call
    reveal();

    // 5. Form Submission Simulation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Show loading state (optional)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';

            // Simulate API call
            setTimeout(() => {
                contactForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        });
    }

    // Modal exposes these to global scope because they are used in HTML onclick attributes
    // Language Switcher Logic (Simple implementation)
    window.changeLanguage = (lang) => {
        const langBtn = document.querySelector('.group/lang span:not(.flex-shrink-0)');
        const iconCont = document.querySelector('.group/lang .flex-shrink-0');

        // Define flags
        const flags = {
            'тоҷ': '<svg viewBox="0 0 18 10" class="w-full h-full"><rect width="18" height="10" fill="#009739"/><rect width="18" height="7" fill="#fff"/><rect width="18" height="3" fill="#c4111f"/><path d="M9 4.2l.3.8h-.6z" fill="#fcd116"/></svg>',
            'рус': '<svg viewBox="0 0 9 6" class="w-full h-full"><rect width="9" height="6" fill="#D52B1E"/><rect width="9" height="4" fill="#0039A6"/><rect width="9" height="2" fill="#fff"/></svg>',
            'eng': '<svg viewBox="0 0 60 30" class="w-full h-full"><path d="M0,0v30h60V0z" fill="#012169"/><path d="M0,0l60,30m0,-30l-60,30" stroke="#fff" stroke-width="6"/><path d="M0,0l60,30m0,-30l-60,30" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></svg>'
        };

        if (langBtn) langBtn.innerText = lang.toUpperCase();
        if (iconCont && flags[lang]) iconCont.innerHTML = flags[lang];

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    };
    window.openModal = () => {
        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = () => {
        const modal = document.getElementById('modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';

        setTimeout(() => {
            const contactForm = document.getElementById('contact-form');
            const formSuccess = document.getElementById('form-success');
            if (contactForm && formSuccess) {
                contactForm.classList.remove('hidden');
                formSuccess.classList.add('hidden');
                contactForm.reset();
            }
        }, 300);
    };
});
