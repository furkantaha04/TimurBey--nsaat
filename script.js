// ===============================
// İNŞAAT TANITIM SİTESİ - JAVASCRIPT
// Modern Etkileşimler
// ===============================

document.addEventListener('DOMContentLoaded', function () {

    // ===============================
    // NAVBAR SCROLL EFEKTİ
    // ===============================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===============================
    // MOBİL MENÜ
    // ===============================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');

            // Hamburger animasyonu
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.classList.toggle('active');
            });
        });
    }

    // Menü linklerine tıklayınca menüyü kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ===============================
    // SMOOTH SCROLL
    // ===============================
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

    // ===============================
    // SAYI ANİMASYONLARI (Counter)
    // ===============================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };

            updateCounter();
        });
    }

    // Sayılar görünür olduğunda animasyonu başlat
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ===============================
    // REVEAL ANİMASYONLARI
    // ===============================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===============================
    // FORM GÖNDERİMİ - NETLIFY FORMS
    // ===============================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // Gönderiliyor mesajı
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            btn.disabled = true;

            // Form verilerini Netlify'a gönder
            const formData = new FormData(this);

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
                .then(response => {
                    if (response.ok) {
                        // Başarı mesajı göster
                        btn.innerHTML = '✓ Mesajınız Gönderildi!';
                        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                        // Formu temizle
                        contactForm.reset();
                    } else {
                        throw new Error('Form gönderilemedi');
                    }
                })
                .catch(error => {
                    // Hata mesajı
                    btn.innerHTML = '✗ Hata oluştu, tekrar deneyin';
                    btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                    console.error('Form gönderim hatası:', error);
                })
                .finally(() => {
                    // Butonu eski haline getir
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                    }, 3000);
                });
        });
    }

    // ===============================
    // PARALLAX EFEKT (Hero için)
    // ===============================
    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // ===============================
    // PROJE KARTLARI HOVER
    // ===============================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        card.addEventListener('mouseleave', function () {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });

    // ===============================
    // HERO SLIDER - GELİŞTİRİLMİŞ
    // ===============================
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');
    const dots = document.querySelectorAll('.dot');
    const progressBar = document.getElementById('sliderProgress');

    if (sliderTrack && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        const autoPlayInterval = 5000; // 5 saniye
        let autoPlayTimer;
        let progressTimer;
        let progressValue = 0;

        // Slide'ı değiştir
        function goToSlide(index) {
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }

            // Track'i kaydır
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Dots güncelle
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });

            // Progress bar'ı sıfırla ve yeniden başlat
            resetProgress();
        }

        // Sonraki slide
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        // Önceki slide
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Progress bar animasyonu
        function startProgress() {
            progressValue = 0;
            progressBar.style.width = '0%';

            progressTimer = setInterval(() => {
                progressValue += 100 / (autoPlayInterval / 100);
                progressBar.style.width = `${Math.min(progressValue, 100)}%`;
            }, 100);
        }

        // Progress bar sıfırla
        function resetProgress() {
            clearInterval(progressTimer);
            progressValue = 0;
            progressBar.style.width = '0%';
            startProgress();
        }

        // Otomatik oynatma başlat
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
            startProgress();
        }

        // Otomatik oynatma durdur
        function stopAutoPlay() {
            clearInterval(autoPlayTimer);
            clearInterval(progressTimer);
        }

        // Buton tıklamaları
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay(); // Timer'ı yeniden başlat
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay(); // Timer'ı yeniden başlat
            });
        }

        // Dot tıklamaları
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                startAutoPlay(); // Timer'ı yeniden başlat
            });
        });

        // Klavye kontrolü (ok tuşları)
        document.addEventListener('keydown', (e) => {
            // Sadece slider görünür olduğunda çalış
            const sliderRect = sliderTrack.getBoundingClientRect();
            const isVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;

            if (isVisible) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevSlide();
                    startAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextSlide();
                    startAutoPlay();
                }
            }
        });

        // Slider üzerinde durduğunda otomatik oynatmayı durdur
        const heroSlider = document.getElementById('heroSlider');
        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', stopAutoPlay);
            heroSlider.addEventListener('mouseleave', startAutoPlay);
        }

        // Touch/Swipe desteği
        let touchStartX = 0;
        let touchEndX = 0;

        if (heroSlider) {
            heroSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoPlay();
            }, { passive: true });

            heroSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoPlay();
            }, { passive: true });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Sola kaydır = sonraki
                } else {
                    prevSlide(); // Sağa kaydır = önceki
                }
            }
        }

        // Slider başlat
        startAutoPlay();
    }

    // ===============================
    // DAİRE KARTLARI DİNAMİK GÜNCELLEME
    // ===============================
    const daireHucreleri = document.querySelectorAll('.daire-hucre');
    if (daireHucreleri.length > 0 && typeof getDaire === 'function') {
        daireHucreleri.forEach(hucre => {
            const id = hucre.getAttribute('data-daire');
            const daire = getDaire(id);
            if (daire) {
                const tipEl = hucre.querySelector('.daire-tip');
                const m2El = hucre.querySelector('.daire-m2');
                if (tipEl) tipEl.textContent = daire.tip;
                if (m2El) m2El.textContent = `${daire.brutM2} m² Brüt / ${daire.netM2} m² Net`;
            }
        });
    }

});

// ===============================
// SAYFA YÜKLENDİĞİNDE
// ===============================
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});
