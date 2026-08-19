document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобильная навигация (гамбургер-меню)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navClose = document.getElementById('navClose');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const openMenu = () => {
        navMenu?.classList.add('open');
        navOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        navMenu?.classList.remove('open');
        navOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (hamburger) hamburger.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 2. Обработка переключателей (pills)
    const pills = document.querySelectorAll('.form-pills .pill');
    let selectedType = 'Расчет сметы';

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            selectedType = pill.getAttribute('data-type') || pill.textContent.trim();
        });
    });

    // 3. Валидация и отправка формы
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('userName');
            const contactInput = document.getElementById('userContact');
            const messageInput = document.getElementById('userMessage');

            const name = nameInput ? nameInput.value.trim() : '';
            const contact = contactInput ? contactInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !contact) {
                alert('Пожалуйста, укажите имя и контактные данные.');
                return;
            }

            const payload = {
                type: selectedType,
                name,
                contact,
                message
            };

            console.log('Сформированные данные заявки:', payload);

            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Заявка отправлена!</span>';
                submitBtn.style.backgroundColor = '#10b981';

                setTimeout(() => {
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    
                    pills.forEach(p => p.classList.remove('active'));
                    if (pills[0]) pills[0].classList.add('active');
                    selectedType = 'Расчет сметы';
                }, 3000);
            }
        });
    }

    // 4. Слайдер преимуществ
    const track = document.getElementById('advTrack');
    const prevBtn = document.getElementById('advPrevBtn');
    const nextBtn = document.getElementById('advNextBtn');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;

        const getSlidesPerView = () => {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        };

        const updateSlider = () => {
            const slides = track.querySelectorAll('.adv-slide');
            if (!slides.length) return;

            const slidesPerView = getSlidesPerView();
            const maxIndex = Math.max(0, slides.length - slidesPerView);
            
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            const slideWidth = slides[0].getBoundingClientRect().width + 24; // 24px - gap
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        nextBtn.addEventListener('click', () => {
            const slides = track.querySelectorAll('.adv-slide');
            const maxIndex = Math.max(0, slides.length - getSlidesPerView());
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        window.addEventListener('resize', updateSlider);
    }
});