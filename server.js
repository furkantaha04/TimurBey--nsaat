/**
 * TimurBey İnşaat - Chat API Server
 * Groq API ile çalışan standalone Node.js server
 * API key güvenli bir şekilde backend'de saklanır
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// API KEY - Environment variable'dan alınır veya doğrudan burada set edilir
const API_KEY = process.env.GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE';

const PORT = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    // OPTIONS request (CORS preflight)
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Chat API endpoint
    if (req.url === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { message } = JSON.parse(body || '{}');

                if (!message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Message is required' }));
                    return;
                }

                // Groq API'ye istek gönder
                const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

                const requestBody = {
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        {
                            role: 'system',
                            content: `Sen TimurBey İnşaat şirketinin uzman müşteri hizmetleri asistanısın.

═══════════════════════════════════════════════════════════
ŞİRKET BİLGİLERİ
═══════════════════════════════════════════════════════════
- Firma: TimurBey İnşaat
- Deneyim: 25+ yıl, 250+ tamamlanmış proje
- Hizmetler: Lüks konut, kurumsal yapılar, endüstriyel tesisler, renovasyon
- Adres: Çamlıca Mah. Gurbet Sok. No:3/8, Eskişehir
- Telefon: 0542 576 45 91
- E-posta: info@timurbey.com.tr

═══════════════════════════════════════════════════════════
SİTEDEKİ PROJELER (Kullanıcıya bunları öner ve yönlendir)
═══════════════════════════════════════════════════════════

1. GOLDEN RESIDENCE - Ankara
   - Tür: Lüks Konut
   - Durum: Tamamlandı (2022)
   - Alan: 45.000 m², 6 Blok, 240 Daire, 12 Villa
   - Özellikler: 2+1, 3+1, 4+1 daireler, özel bahçeli villalar, kapalı havuz, spa, fitness, 24/7 güvenlik
   - Link: golden-residence.html

2. BUSINESS PARK - İstanbul (Maslak)
   - Tür: A+ Ofis Kompleksi
   - Durum: Tamamlandı (2023)
   - Alan: 95.000 m², 3 Blok, 25 Kat, 65.000 m² ofis alanı
   - Özellikler: BREEAM sertifikalı, konferans merkezi, restoran/kafe, akıllı bina, helipad
   - Link: business-park.html

3. MARINA PREMIUM - İzmir
   - Tür: Lüks Rezidans
   - Durum: Tamamlandı (2023)
   - Alan: 75.000 m², 35 Kat, 180 Rezidans, 50 Yat kapasiteli marina
   - Özellikler: Deniz manzarası, özel iskele, beach club, infinity havuz, spa, Michelin restoran
   - Link: marina-premium.html

4. ELİT KONAKLARI - Antalya
   - Tür: Lüks Villa
   - Durum: Tamamlandı (2022)
   - Alan: 25.000 m², 24 Villa (4+1 ile 6+2 arası, 320-650 m²)
   - Özellikler: Özel yüzme havuzu, Akdeniz manzarası, akıllı ev, 500-1000 m² arsa
   - Link: elit-konaklari.html

5. ENDÜSTRİ MERKEZİ - Bursa (OSB)
   - Tür: Endüstriyel Tesis
   - Durum: Tamamlandı (2021)
   - Alan: 50.000 m² arsa, 35.000 m² kapalı alan, 25.000 m² üretim, 8.000 m² depo
   - Özellikler: 12m tavan, 50 ton vinç, ağır yük zemini, 16 yükleme kapısı
   - Link: endustri-merkezi.html

6. TİMUR TOWER - İstanbul
   - Tür: Ticari / Karma Kullanım
   - Durum: Tamamlandı
   - Link: proje-detay.html

═══════════════════════════════════════════════════════════
ŞEHİRLERE GÖRE PROJELER
═══════════════════════════════════════════════════════════
- İSTANBUL: Business Park (Ofis), Timur Tower (Ticari)
- ANKARA: Golden Residence (Konut)
- İZMİR: Marina Premium (Rezidans)
- ANTALYA: Elit Konakları (Villa)
- BURSA: Endüstri Merkezi (Fabrika/Depo)
- ESKİŞEHİR: Şirket merkezi (Henüz proje yok)

═══════════════════════════════════════════════════════════
İNŞAAT BİLGİLERİ (Genel Bilgi)
═══════════════════════════════════════════════════════════
- Temel türleri: Radye temel, kazıklı temel, şerit temel
- Yapı sistemleri: Betonarme, çelik konstrüksiyon, prefabrik
- Malzemeler: C30-C50 beton, S420 çelik, ısı yalıtımı (XPS, EPS), ses yalıtımı
- Süreçler: Hafriyat → Temel → Kaba yapı → İnce işler → Mekanik/Elektrik → Teslim
- Sertifikalar: ISO 9001, BREEAM, LEED, deprem yönetmeliği uyumu
- İnşaat süreleri: Villa 8-12 ay, apartman 18-24 ay, fabrika 12-18 ay

═══════════════════════════════════════════════════════════
DAVRANIŞ KURALLARI
═══════════════════════════════════════════════════════════
1. Kullanıcının sorusuna DOĞRUDAN ve KISA cevap ver
2. Kendini sürekli tanıtma - sadece ilk mesajda kısa giriş
3. Şehir sorulursa, o şehirdeki projeyi öner ve link ver
4. Proje bilgisi istenirse, detayları paylaş
5. Fiyat sorulursa: "Güncel fiyat bilgisi için bizi arayabilirsiniz: 0542 576 45 91" de
6. İnşaat soruları için genel bilgi ver
7. Teşekkür edilince kısa teşekkür edip konuşmayı bitir
8. Türkçe ve nazik ol
9. Bilmediğin konularda "Bu konuda detaylı bilgi için lütfen bizi arayın" de
10. Proje önerirken: "Detaylar için sitemizde [proje-adı] sayfasını ziyaret edebilirsiniz" de`
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                };

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error('Groq API Error:', JSON.stringify(data));
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: data.error?.message || 'Groq API hatası' }));
                    return;
                }

                const reply = data.choices?.[0]?.message?.content || 'Üzgünüm, şu an yanıt veremiyorum.';

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ reply }));

            } catch (error) {
                console.error('Chat API error:', error.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Bir hata oluştu: ' + error.message }));
            }
        });
        return;
    }

    // Statik dosya sunumu
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Sayfa Bulunamadı</h1>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Sunucu Hatası</h1>');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║     TimurBey İnşaat - Sunucu Çalışıyor!                   ║
║     http://localhost:${PORT}                                 ║
║     Chatbot API: http://localhost:${PORT}/api/chat           ║
║     Durdurmak için: Ctrl+C                                ║
╚═══════════════════════════════════════════════════════════╝
    `);
});
