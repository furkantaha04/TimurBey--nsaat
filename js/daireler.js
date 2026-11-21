/**
 * TimurBey İnşaat - Daire Verileri
 * Tüm dairelerin merkezi veri deposu
 */

const WHATSAPP_NUMARA = '905425764591';

/**
 * Dosya adından okunabilir başlık türetir
 * Örn: "yatak-odasi-2.jpeg" → "Yatak Odası 2"
 */
function dosyaAdindanBaslik(dosyaAdi) {
    return dosyaAdi
        .replace(/\.(jpeg|jpg|png|webp)$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\+/g, ' & ')
        .replace(/(\d+)$/g, ' $1')
        .replace(/\b(dis|dıs)\b/gi, 'Dış')
        .replace(/\b(kapi|kapı)\b/gi, 'Kapı')
        .replace(/\bcocuk\b/gi, 'Çocuk')
        .replace(/\bodasi\b/gi, 'Odası')
        .replace(/\bodasai\b/gi, 'Odası')
        .replace(/\bodası\b/gi, 'Odası')
        .replace(/\bmutfak\b/gi, 'Mutfak')
        .replace(/\bmurfak\b/gi, 'Mutfak')
        .replace(/\bmutfagın\b/gi, 'Mutfağın')
        .replace(/\bbalkonu\b/gi, 'Balkonu')
        .replace(/\bsalon\b/gi, 'Salon')
        .replace(/\bkoridor\b/gi, 'Koridor')
        .replace(/\bbanyo\b/gi, 'Banyo')
        .replace(/\blavabo\b/gi, 'Lavabo')
        .replace(/\btuvalet\b/gi, 'Tuvalet')
        .replace(/\byatak\b/gi, 'Yatak')
        .replace(/\bebeveyn\b/gi, 'Ebeveyn')
        .replace(/\bbanyosu\b/gi, 'Banyosu')
        .replace(/\balaturka\b/gi, 'Alaturka Tuvalet')
        .replace(/\boturma\b/gi, 'Oturma')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

const dairelerData = [
    {
        id: 1,
        no: 1,
        kat: 1,
        tip: '2+1',
        netM2: 79,
        brutM2: 95,
        cephe: 'Kuzey - Güney',
        durum: 'satilik',
        klasor: '/images/DaireNo1/',
        fotograflar: [
            { dosya: 'salon.jpeg', baslik: 'Salon' },
            { dosya: 'salon-2.jpeg', baslik: 'Salon 2' },
            { dosya: 'mutfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'mutfak1.jpeg', baslik: 'Mutfak 2' },
            { dosya: 'yatak-odası.jpeg', baslik: 'Yatak Odası' },
            { dosya: 'yatak-odası-2.jpeg', baslik: 'Yatak Odası 2' },
            { dosya: 'cocuk-odası.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'tuvalet-banyo.jpeg', baslik: 'Banyo' },
            { dosya: 'mutfagın-balkonu1.jpeg', baslik: 'Mutfak Balkonu' },
            { dosya: 'dıs-kapı1.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'garaj-kapisi.jpeg', baslik: 'Garaj Kapısı' },
            { dosya: 'garaj.jpeg', baslik: 'Özel Kapalı Garaj' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 2,
        no: 2,
        kat: 1,
        tip: '2+1',
        netM2: 83,
        brutM2: 101,
        cephe: 'Kuzey - Batı',
        durum: 'satilik',
        klasor: '/images/DaireNo2/',
        fotograflar: [
            { dosya: 'salon.jpeg', baslik: 'Salon' },
            { dosya: 'salon-2.jpeg', baslik: 'Salon 2' },
            { dosya: 'salon-3.jpeg', baslik: 'Salon 3' },
            { dosya: 'oturma-odasi.jpeg', baslik: 'Oturma Odası' },
            { dosya: 'murfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'mutfak-balkonu.jpeg', baslik: 'Mutfak Balkonu' },
            { dosya: 'cocuk-odasai.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'tuvalet-banyo.jpeg', baslik: 'Banyo' },
            { dosya: 'alaturka.jpeg', baslik: 'Alaturka Tuvalet' },
            { dosya: 'dis-kapi.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'garaj-kapisi.jpeg', baslik: 'Garaj Kapısı' },
            { dosya: 'garaj.jpeg', baslik: 'Özel Kapalı Garaj' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 3,
        no: 3,
        kat: 1,
        tip: '2+1',
        netM2: 91,
        brutM2: 108,
        cephe: 'Doğu - Batı',
        durum: 'satilik',
        klasor: '/images/DaireNo3/',
        fotograflar: [
            { dosya: 'salon.jpeg', baslik: 'Salon' },
            { dosya: 'mutfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'mutfak1.jpeg', baslik: 'Mutfak 2' },
            { dosya: 'yatak-odasi.jpeg', baslik: 'Yatak Odası' },
            { dosya: 'yatak-odasi1.jpeg', baslik: 'Yatak Odası 2' },
            { dosya: 'cocuk-odasi.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'banyo-lavabo.jpeg', baslik: 'Banyo' },
            { dosya: 'ebeveyn-banyosu.jpeg', baslik: 'Ebeveyn Banyosu' },
            { dosya: 'dis-kapi.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'garaj-kapisi.jpeg', baslik: 'Garaj Kapısı' },
            { dosya: 'garaj.jpeg', baslik: 'Özel Kapalı Garaj' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Ebeveyn Banyosu',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 4,
        no: 4,
        kat: 2,
        tip: '2+1',
        netM2: 79,
        brutM2: 95,
        cephe: 'Kuzey - Güney',
        durum: 'satilik',
        klasor: '/images/DaireNo4/',
        fotograflar: [
            { dosya: 'salon.jpeg', baslik: 'Salon' },
            { dosya: 'mutfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'mutfak-1.jpeg', baslik: 'Mutfak 2' },
            { dosya: 'yatak-odasi.jpeg', baslik: 'Yatak Odası' },
            { dosya: 'yatak-odasi1.jpeg', baslik: 'Yatak Odası 2' },
            { dosya: 'cocuk-odasi.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'banyo-lavabo.jpeg', baslik: 'Banyo' },
            { dosya: 'dis-kapi.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'garaj-kapisi.jpeg', baslik: 'Garaj Kapısı' },
            { dosya: 'garaj.jpeg', baslik: 'Özel Kapalı Garaj' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 5,
        no: 5,
        kat: 2,
        tip: '2+1',
        netM2: 83,
        brutM2: 100,
        cephe: 'Kuzey - Batı',
        durum: 'satilik',
        klasor: '/images/DaireNo5/',
        fotograflar: [
            { dosya: 'salon.jpeg', baslik: 'Salon' },
            { dosya: 'salon-1.jpeg', baslik: 'Salon 2' },
            { dosya: 'salon-2.jpeg', baslik: 'Salon 3' },
            { dosya: 'mutfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'mutfak-1.jpeg', baslik: 'Mutfak 2' },
            { dosya: 'yatak-odasi.jpeg', baslik: 'Yatak Odası' },
            { dosya: 'cocuk-odasi.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'banyo-lavabo.jpeg', baslik: 'Banyo' },
            { dosya: 'alaturka.jpeg', baslik: 'Alaturka Tuvalet' },
            { dosya: 'dis-kapi.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'garaj.jpeg', baslik: 'Özel Kapalı Garaj' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 6,
        no: 6,
        kat: 2,
        tip: '2+1',
        netM2: 91,
        brutM2: 108,
        cephe: 'Doğu - Batı',
        durum: 'satilik',
        klasor: '/images/DaireNo6/',
        fotograflar: [
            { dosya: 'salon.jpeg', baslik: 'Salon' },
            { dosya: 'mutfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'mutfak-1.jpeg', baslik: 'Mutfak 2' },
            { dosya: 'yatak-odasi.jpeg', baslik: 'Yatak Odası' },
            { dosya: 'cocuk-odasi.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'banyo-lavabo.jpeg', baslik: 'Banyo' },
            { dosya: 'ebeveyn-banyosu.jpeg', baslik: 'Ebeveyn Banyosu' },
            { dosya: 'dis-kapi.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'garaj-kapisi.jpeg', baslik: 'Garaj Kapısı' },
            { dosya: 'garaj.jpeg', baslik: 'Özel Kapalı Garaj' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Ebeveyn Banyosu',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 7,
        no: 7,
        kat: 3,
        tip: '2+1',
        netM2: 70,
        brutM2: 83,
        cephe: 'Kuzey - Güney',
        durum: 'satilik',
        klasor: '/images/DaireNo7/',
        fotograflar: [
            { dosya: 'salon+mutfak.jpeg', baslik: 'Salon & Mutfak' },
            { dosya: 'mutfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'yatak-odasi.jpeg', baslik: 'Yatak Odası' },
            { dosya: 'yatak-odasi1.jpeg', baslik: 'Yatak Odası 2' },
            { dosya: 'cocuk-odasi.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'cocuk-odasi-1.jpeg', baslik: 'Çocuk Odası 2' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'lavabo-banyo.jpeg', baslik: 'Banyo' },
            { dosya: 'dis-kapi.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'kiler.jpeg', baslik: 'Özel Kiler / Depo Alanı' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Geniş Balkon Alanı',
            'Daireye Özel Kiler / Depo Alanı',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 8,
        no: 8,
        kat: 3,
        tip: '2+1',
        netM2: 83,
        brutM2: 101,
        cephe: 'Kuzey - Batı',
        durum: 'satilik',
        klasor: '/images/DaireNo8/',
        fotograflar: [
            { dosya: 'salon.jpeg', baslik: 'Salon' },
            { dosya: 'salon-1.jpeg', baslik: 'Salon 2' },
            { dosya: 'mutfak.jpeg', baslik: 'Mutfak' },
            { dosya: 'mutfak-1.jpeg', baslik: 'Mutfak 2' },
            { dosya: 'yatak-odasi.jpeg', baslik: 'Yatak Odası' },
            { dosya: 'cocuk-odasi.jpeg', baslik: 'Çocuk Odası' },
            { dosya: 'koridor.jpeg', baslik: 'Koridor' },
            { dosya: 'banyo-lavabo.jpeg', baslik: 'Banyo' },
            { dosya: 'alaturka.jpeg', baslik: 'Alaturka Tuvalet' },
            { dosya: 'dis-kapi.jpeg', baslik: 'Dış Kapı' },
            { dosya: 'garaj-kapisi.jpeg', baslik: 'Garaj Kapısı' },
            { dosya: 'garaj.jpeg', baslik: 'Özel Kapalı Garaj' }
        ],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    },
    {
        id: 9,
        no: 9,
        kat: 3,
        tip: '2+1',
        netM2: 120,
        brutM2: 145,
        cephe: 'Doğu - Batı',
        durum: 'satildi',
        klasor: '/images/DaireNo9/',
        fotograflar: [],
        ozellikler: [
            'E.C.A. Marka Bireysel Kombi',
            'Özel Tasarım Avize ve Aydınlatmalar',
            'Yerden Isıtma Sistemi',
            'Lüks Seramik / Parke Zemin',
            'Geniş Balkon Alanı',
            'Daireye Özel 20 m² Kapalı Garaj',
            'Merkezi Sistem Odası'
        ]
    }
];

/**
 * Daire ID'sine göre veri döndürür
 */
function getDaire(id) {
    return dairelerData.find(d => d.id === parseInt(id));
}

/**
 * WhatsApp mesaj linki oluşturur
 */
function getWhatsAppLink(daire) {
    const mesaj = encodeURIComponent(
        `Merhaba Zeki bey, ${daire.kat}. Kat No: ${daire.no} hakkında detaylı bilgi ve randevu almak istiyorum.`
    );
    return `https://wa.me/${WHATSAPP_NUMARA}?text=${mesaj}`;
}
