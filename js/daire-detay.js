/**
 * TimurBey İnşaat - Daire Detay Sayfası Mantığı
 * URL'den daire ID'sini okur, sayfayı dinamik olarak doldurur
 */

document.addEventListener('DOMContentLoaded', function () {
    // URL'den daire ID'sini al
    const params = new URLSearchParams(window.location.search);
    const daireId = params.get('daire');

    if (!daireId) {
        window.location.href = 'index.html#daire-secici';
        return;
    }

    // Daire verisini bul
    const daire = getDaire(daireId);

    if (!daire) {
        window.location.href = 'index.html#daire-secici';
        return;
    }

    // Satıldı durumu kontrolü
    if (daire.durum === 'satildi') {
        const overlay = document.getElementById('daire-satildi-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    // Sayfa başlığını güncelle
    document.title = `Daire ${daire.no} - ${daire.kat}. Kat | TimurBey İnşaat`;

    // Header bilgilerini doldur
    doldurHeader(daire);

    // Özellik kartını doldur
    doldurOzellikler(daire);

    // Donanım listesini doldur
    doldurDonanim(daire);

    // Galeriyi oluştur
    olusturGaleri(daire);


    // WhatsApp butonunu ayarla
    ayarlaWhatsApp(daire);

    // Lightbox'ı başlat
    baslatLightbox();
});

/**
 * Header bilgilerini doldurur
 */
function doldurHeader(daire) {
    const baslik = document.getElementById('daire-baslik');
    const konum = document.getElementById('daire-konum');
    const badge = document.getElementById('daire-durum-badge');
    const netM2 = document.getElementById('daire-net-m2');
    const brutM2 = document.getElementById('daire-brut-m2');
    const tip = document.getElementById('daire-tip');

    if (baslik) baslik.textContent = `Daire ${daire.no}`;
    if (konum) {
        konum.querySelector('span').textContent =
            `${daire.kat}. Kat • ${daire.cephe} Cephe • Eskişehir`;
    }
    if (badge) {
        if (daire.durum === 'satildi') {
            badge.textContent = 'Satıldı';
            badge.classList.add('satildi');
        } else {
            badge.textContent = 'Satılık';
            badge.classList.add('satilik');
        }
    }
    if (netM2) netM2.textContent = daire.netM2;
    if (brutM2) brutM2.textContent = daire.brutM2;
    if (tip) tip.textContent = daire.tip;
}

/**
 * Özellik kartını doldurur
 */
function doldurOzellikler(daire) {
    const elNo = document.getElementById('oz-daire-no');
    const elKat = document.getElementById('oz-kat');
    const elTip = document.getElementById('oz-tip');
    const elNet = document.getElementById('oz-net');
    const elBrut = document.getElementById('oz-brut');
    const elCephe = document.getElementById('oz-cephe');
    const elDurum = document.getElementById('oz-durum');

    if (elNo) elNo.textContent = daire.no;
    if (elKat) elKat.textContent = `${daire.kat}. Kat`;
    if (elTip) elTip.textContent = daire.tip;
    if (elNet) elNet.textContent = `${daire.netM2} m²`;
    if (elBrut) elBrut.textContent = `${daire.brutM2} m²`;
    if (elCephe) elCephe.textContent = daire.cephe;
    if (elDurum) {
        if (daire.durum === 'satildi') {
            elDurum.textContent = 'Satıldı';
            elDurum.classList.remove('durum-satilik');
            elDurum.classList.add('durum-satildi');
        } else {
            elDurum.textContent = 'Satılık';
        }
    }
}

/**
 * Donanım listesini doldurur
 */
function doldurDonanim(daire) {
    const liste = document.getElementById('donanim-listesi');
    if (!liste) return;

    liste.innerHTML = '';
    daire.ozellikler.forEach(ozellik => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${ozellik}`;
        liste.appendChild(li);
    });
}

/**
 * Fotoğraf galerisini oluşturur
 */
function olusturGaleri(daire) {
    const galeri = document.getElementById('daire-galeri');
    if (!galeri) return;

    if (daire.fotograflar.length === 0) {
        galeri.innerHTML = `
            <div class="galeri-bos">
                <i class="fas fa-camera-retro"></i>
                <p>Bu daire için fotoğraf bulunmamaktadır.</p>
            </div>
        `;
        return;
    }

    galeri.innerHTML = '';
    daire.fotograflar.forEach((foto, index) => {
        const item = document.createElement('div');
        item.className = 'daire-galeri-item';
        item.setAttribute('data-index', index);
        item.innerHTML = `
            <img src="${daire.klasor}${foto.dosya}" alt="${foto.baslik}" loading="lazy">
            <div class="galeri-item-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
            <span class="galeri-item-baslik">${foto.baslik}</span>
        `;
        item.addEventListener('click', () => acLightbox(index));
        galeri.appendChild(item);
    });
}


/**
 * WhatsApp butonunu ayarlar
 */
function ayarlaWhatsApp(daire) {
    const btn = document.getElementById('daire-whatsapp-btn');
    if (!btn) return;

    btn.href = getWhatsAppLink(daire);

    if (daire.durum === 'satildi') {
        btn.style.display = 'none';
    }
}


// ===============================
// LIGHTBOX SİSTEMİ
// ===============================

let lightboxIndex = 0;
let lightboxFotolar = [];

function baslatLightbox() {
    const params = new URLSearchParams(window.location.search);
    const daireId = params.get('daire');
    const daire = getDaire(daireId);

    if (daire) {
        lightboxFotolar = daire.fotograflar.map(f => ({
            src: daire.klasor + f.dosya,
            baslik: f.baslik
        }));
    }

    // Overlay tıklama ile kapama
    const overlay = document.getElementById('daire-lightbox-overlay');
    if (overlay) {
        overlay.addEventListener('click', kapatLightbox);
    }

    // Kapat butonu
    const kapatBtn = document.getElementById('daire-lightbox-kapat');
    if (kapatBtn) {
        kapatBtn.addEventListener('click', kapatLightbox);
    }

    // Navigasyon butonları
    const prevBtn = document.getElementById('daire-lightbox-prev');
    const nextBtn = document.getElementById('daire-lightbox-next');

    if (prevBtn) prevBtn.addEventListener('click', () => degistirLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => degistirLightbox(1));

    // Klavye kontrolü
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('daire-lightbox');
        if (lightbox && lightbox.classList.contains('aktif')) {
            if (e.key === 'Escape') kapatLightbox();
            if (e.key === 'ArrowLeft') degistirLightbox(-1);
            if (e.key === 'ArrowRight') degistirLightbox(1);
        }
    });

    // Touch/Swipe desteği
    let touchStartX = 0;
    const lightbox = document.getElementById('daire-lightbox');
    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) degistirLightbox(1);
                else degistirLightbox(-1);
            }
        }, { passive: true });
    }
}

function acLightbox(index) {
    lightboxIndex = index;
    const lightbox = document.getElementById('daire-lightbox');
    const img = document.getElementById('daire-lightbox-img');
    const baslik = document.getElementById('daire-lightbox-baslik');
    const sayac = document.getElementById('daire-lightbox-sayac');

    if (!lightbox || !img || lightboxFotolar.length === 0) return;

    img.src = lightboxFotolar[index].src;
    img.alt = lightboxFotolar[index].baslik;
    if (baslik) baslik.textContent = lightboxFotolar[index].baslik;
    if (sayac) sayac.textContent = `${index + 1} / ${lightboxFotolar.length}`;

    lightbox.classList.add('aktif');
    document.body.style.overflow = 'hidden';
}

function kapatLightbox() {
    const lightbox = document.getElementById('daire-lightbox');
    if (lightbox) {
        lightbox.classList.remove('aktif');
        document.body.style.overflow = '';
    }
}

function degistirLightbox(yonDir) {
    lightboxIndex += yonDir;
    if (lightboxIndex < 0) lightboxIndex = lightboxFotolar.length - 1;
    if (lightboxIndex >= lightboxFotolar.length) lightboxIndex = 0;

    const img = document.getElementById('daire-lightbox-img');
    const baslik = document.getElementById('daire-lightbox-baslik');
    const sayac = document.getElementById('daire-lightbox-sayac');

    if (img) {
        img.src = lightboxFotolar[lightboxIndex].src;
        img.alt = lightboxFotolar[lightboxIndex].baslik;
    }
    if (baslik) baslik.textContent = lightboxFotolar[lightboxIndex].baslik;
    if (sayac) sayac.textContent = `${lightboxIndex + 1} / ${lightboxFotolar.length}`;
}
