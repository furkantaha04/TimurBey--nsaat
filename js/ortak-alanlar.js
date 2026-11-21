/**
 * TimurBey İnşaat - Bina ve Ortak Alanlar Modülü
 * 1. Dış Cephe Orta Boy Slider (Dokunmatik / Swipe, Otomatik Geçiş, Oklar, Noktalar)
 * 2. 4'lü Ortak Alan Galerisi & Tam Ekran Lightbox (Esc, Oklar, Dokunmatik Kaydırma)
 */

(function () {
    'use strict';

    // Galeri Verileri
    const disCepheGorseller = [
        { src: 'images/DısCephe/dis1.jpeg', baslik: 'Dış Cephe - Ön Görünüm' },
        { src: 'images/DısCephe/dis2.jpeg', baslik: 'Dış Cephe - Yan Cephe' },
        { src: 'images/DısCephe/dis3.jpeg', baslik: 'Dış Cephe - Mimari Detay' },
        { src: 'images/DısCephe/dis4.jpeg', baslik: 'Dış Cephe - Giriş & Çevre' }
    ];

    const ortakAlanGorseller = [];
    let cokluGaleriListesi = []; // Çoklu fotoğraflı kartlar için geçici liste

    // Aktif Lightbox Durumu
    let aktifGaleri = 'ortakAlan'; // 'ortakAlan', 'disCephe' veya 'ortakAlanCoklu'
    let aktifIndex = 0;

    // ==========================================
    // 1. DIŞ CEPHE ORTA BOY SLIDER
    // ==========================================
    let disCepheIndex = 0;
    const disCepheToplam = disCepheGorseller.length;
    let autoPlayTimer = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchDiffX = 0;
    let hasDragged = false;

    function initDisCepheSlider() {
        const track = document.getElementById('disCepheTrack');
        const prevBtn = document.getElementById('disCephePrev');
        const nextBtn = document.getElementById('disCepheNext');
        const dots = document.querySelectorAll('.dis-cephe-dot');
        const wrapper = document.querySelector('.dis-cephe-slider-wrapper');
        const slides = document.querySelectorAll('.dis-cephe-slide');

        if (!track || slides.length === 0) return;

        function goToDisSlide(index) {
            if (index < 0) {
                disCepheIndex = disCepheToplam - 1;
            } else if (index >= disCepheToplam) {
                disCepheIndex = 0;
            } else {
                disCepheIndex = index;
            }

            track.style.transform = `translateX(-${disCepheIndex * 100}%)`;

            // Noktaları güncelle
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === disCepheIndex);
            });
        }

        function nextDisSlide() {
            goToDisSlide(disCepheIndex + 1);
        }

        function prevDisSlide() {
            goToDisSlide(disCepheIndex - 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextDisSlide, 5000);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        // Ok butonları
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevDisSlide();
                startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextDisSlide();
                startAutoPlay();
            });
        }

        // Nokta butonları
        dots.forEach((dot) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
                goToDisSlide(targetIndex);
                startAutoPlay();
            });
        });

        // Hover durumunda duraklat
        if (wrapper) {
            wrapper.addEventListener('mouseenter', stopAutoPlay);
            wrapper.addEventListener('mouseleave', startAutoPlay);

            // Dokunmatik Swipe (Mobil desteği)
            wrapper.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                touchDiffX = 0;
                hasDragged = false;
                stopAutoPlay();
            }, { passive: true });

            wrapper.addEventListener('touchmove', (e) => {
                if (e.touches.length !== 1) return;
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                touchDiffX = currentX - touchStartX;
                const diffY = currentY - touchStartY;

                // Yatay kaydırma tespiti
                if (Math.abs(touchDiffX) > 10 && Math.abs(touchDiffX) > Math.abs(diffY)) {
                    hasDragged = true;
                }
            }, { passive: true });

            wrapper.addEventListener('touchend', () => {
                if (hasDragged && Math.abs(touchDiffX) > 40) {
                    if (touchDiffX < 0) {
                        nextDisSlide();
                    } else {
                        prevDisSlide();
                    }
                }
                startAutoPlay();
                // Tıklama event'i için sürükleme bayrağını sıfırla
                setTimeout(() => {
                    hasDragged = false;
                }, 120);
            }, { passive: true });
        }

        // Slide'a tıklandığında Lightbox açma
        slides.forEach((slide, idx) => {
            slide.addEventListener('click', () => {
                if (hasDragged) return; // Sürükleme anında açılmasın
                window.ortakLightboxAc(idx, 'disCephe');
            });
        });

        // Otomatik oynatmayı başlat
        startAutoPlay();
    }

    // ==========================================
    // 2. ORTAK ALAN 4'LÜ GALERİ
    // ==========================================
    function initOrtakGaleri() {
        const items = document.querySelectorAll('.ortak-galeri-item');
        ortakAlanGorseller.length = 0;
        items.forEach((item, idx) => {
            const img = item.querySelector('img');
            const galleryAttr = item.getAttribute('data-gallery');
            if (img) {
                if (galleryAttr) {
                    // Çoklu fotoğraflı kart (ör. Bahçe)
                    try {
                        const galleryData = JSON.parse(galleryAttr);
                        ortakAlanGorseller.push({
                            src: img.getAttribute('src'),
                            baslik: img.getAttribute('alt') || 'Ortak Alan',
                            gallery: galleryData // Çoklu fotoğraf listesi
                        });
                    } catch (e) {
                        ortakAlanGorseller.push({
                            src: img.getAttribute('src'),
                            baslik: img.getAttribute('alt') || 'Ortak Alan'
                        });
                    }
                } else {
                    ortakAlanGorseller.push({
                        src: img.getAttribute('src'),
                        baslik: img.getAttribute('alt') || 'Ortak Alan'
                    });
                }
            }
            item.addEventListener('click', () => {
                const gorsel = ortakAlanGorseller[idx];
                if (gorsel && gorsel.gallery && gorsel.gallery.length > 1) {
                    // Çoklu galeri modu — ok butonları aktif
                    window.ortakLightboxAc(0, 'ortakAlanCoklu', gorsel.gallery);
                } else {
                    // Tekil kart — oksuz mod
                    window.ortakLightboxAc(idx, 'ortakAlan');
                }
            });
        });
    }

    // ==========================================
    // 3. TAM EKRAN LIGHTBOX (MODAL) SİSTEMİ
    // ==========================================
    function renderLightbox() {
        const lightbox = document.getElementById('ortak-lightbox');
        const img = document.getElementById('ortak-lightbox-img');
        const baslik = document.getElementById('ortak-lightbox-baslik');
        const sayac = document.getElementById('ortak-lightbox-sayac');

        if (!lightbox || !img) return;

        let liste;
        if (aktifGaleri === 'disCephe') {
            liste = disCepheGorseller;
        } else if (aktifGaleri === 'ortakAlanCoklu') {
            liste = cokluGaleriListesi;
        } else {
            liste = ortakAlanGorseller;
        }
        const total = liste.length;

        // Döngüsel indeks kontrolü
        if (aktifIndex < 0) aktifIndex = total - 1;
        if (aktifIndex >= total) aktifIndex = 0;

        const secili = liste[aktifIndex];

        // Yumuşak geçiş efekti
        img.style.opacity = '0.35';
        img.style.transform = 'scale(0.97)';
        img.style.transition = 'opacity 0.22s ease, transform 0.22s ease';

        img.src = secili.src;
        img.alt = secili.baslik;

        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 50);

        if (baslik) baslik.textContent = secili.baslik;
        
        // Okları ve sayacı galeri türüne göre göster/gizle
        const prevBtn = document.querySelector('#ortak-lightbox .daire-lightbox-prev');
        const nextBtn = document.querySelector('#ortak-lightbox .daire-lightbox-next');
        
        if (aktifGaleri === 'ortakAlan') {
            // Tekil kartlar — ok ve sayaç gizli
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (sayac) sayac.style.display = 'none';
        } else {
            // Dış Cephe ve Çoklu Ortak Alan kartları — ok ve sayaç görünür
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
            if (sayac) {
                sayac.style.display = 'inline-block';
                sayac.textContent = `${aktifIndex + 1} / ${total}`;
            }
        }
    }

    window.ortakLightboxAc = function (index, galeriTuru, galeriVerisi) {
        if (galeriTuru) {
            aktifGaleri = galeriTuru;
            aktifIndex = parseInt(index, 10) || 0;
            // Çoklu galeri verisi sağlandıysa kaydet
            if (galeriTuru === 'ortakAlanCoklu' && galeriVerisi) {
                cokluGaleriListesi = galeriVerisi;
            }
        } else {
            // Geriye dönük uyumluluk: indeks 4 veya büyükse ortak galeri
            const numIndex = parseInt(index, 10) || 0;
            if (numIndex >= 4) {
                aktifGaleri = 'ortakAlan';
                aktifIndex = numIndex - 4;
            } else {
                aktifGaleri = 'disCephe';
                aktifIndex = numIndex;
            }
        }

        const lightbox = document.getElementById('ortak-lightbox');
        if (lightbox) {
            renderLightbox();
            lightbox.classList.add('aktif');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Sayfa kaydırmasını engelle
        }
    };

    window.ortakLightboxKapat = function () {
        const lightbox = document.getElementById('ortak-lightbox');
        if (lightbox) {
            lightbox.classList.remove('aktif');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Kaydırma kilidini kaldır
        }
    };

    window.ortakLightboxDegistir = function (yon) {
        aktifIndex += yon;
        renderLightbox();
    };

    function initLightboxEvents() {
        const lightbox = document.getElementById('ortak-lightbox');
        const overlay = document.querySelector('#ortak-lightbox .daire-lightbox-overlay');
        const kapatBtn = document.querySelector('#ortak-lightbox .daire-lightbox-kapat');
        const prevBtn = document.querySelector('#ortak-lightbox .daire-lightbox-prev');
        const nextBtn = document.querySelector('#ortak-lightbox .daire-lightbox-next');

        if (!lightbox) return;

        // Arka siyahlığa tıklanınca kapat
        if (overlay) {
            overlay.addEventListener('click', window.ortakLightboxKapat);
        }

        // Kapatma (X) butonu
        if (kapatBtn) {
            kapatBtn.addEventListener('click', window.ortakLightboxKapat);
        }

        // Sol / Sağ butonları
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.ortakLightboxDegistir(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.ortakLightboxDegistir(1);
            });
        }

        // Klavye kontrolleri: Esc ile kapat, Sol/Sağ ok ile resim değiştir
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('aktif')) return;

            if (e.key === 'Escape' || e.key === 'Esc') {
                e.preventDefault();
                window.ortakLightboxKapat();
            } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && (aktifGaleri === 'disCephe' || aktifGaleri === 'ortakAlanCoklu')) {
                e.preventDefault();
                window.ortakLightboxDegistir(e.key === 'ArrowLeft' ? -1 : 1);
            }
        });

        // Lightbox içinde dokunmatik kaydırma (Swipe)
        let lbTouchStartX = 0;
        let lbTouchDiffX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) return;
            lbTouchStartX = e.touches[0].clientX;
            lbTouchDiffX = 0;
        }, { passive: true });

        lightbox.addEventListener('touchmove', (e) => {
            if (e.touches.length !== 1) return;
            lbTouchDiffX = e.touches[0].clientX - lbTouchStartX;
        }, { passive: true });

        lightbox.addEventListener('touchend', () => {
            if (aktifGaleri === 'ortakAlan') return; // Tekil ortakAlan kartlarında kaydırma devre dışı
            if (Math.abs(lbTouchDiffX) > 45) {
                if (lbTouchDiffX < 0) {
                    window.ortakLightboxDegistir(1); // Sola çekildi = sonraki
                } else {
                    window.ortakLightboxDegistir(-1); // Sağa çekildi = önceki
                }
            }
        }, { passive: true });
    }

    // Sayfa hazır olduğunda başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initDisCepheSlider();
            initOrtakGaleri();
            initLightboxEvents();
        });
    } else {
        initDisCepheSlider();
        initOrtakGaleri();
        initLightboxEvents();
    }
})();
