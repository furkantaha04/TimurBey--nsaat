/**
 * TimurBey İnşaat - MVC Ana Uygulama
 * Tüm Controller'ları başlatan merkezi dosya
 */

// Controllers
import NavbarController from './controllers/NavbarController.js';
import SliderController from './controllers/SliderController.js';
import StatsController from './controllers/StatsController.js';
import FormController from './controllers/FormController.js';
import RevealController from './controllers/RevealController.js';
import ParallaxController from './controllers/ParallaxController.js';
import ProjectCardController from './controllers/ProjectCardController.js';
import OrtakAlanlarController from './controllers/OrtakAlanlarController.js';

/**
 * Ana Uygulama Sınıfı
 * MVC mimarisini başlatan ve yöneten sınıf
 */
class App {
    constructor() {
        this.controllers = {};
    }

    /**
     * Uygulamayı başlat
     */
    init() {
        console.log('🏗️ TimurBey İnşaat - MVC Uygulaması Başlatılıyor...');

        // Tüm controller'ları başlat
        this.controllers.navbar = new NavbarController();
        this.controllers.slider = new SliderController();
        this.controllers.stats = new StatsController();
        this.controllers.form = new FormController();
        this.controllers.reveal = new RevealController();
        this.controllers.parallax = new ParallaxController();
        this.controllers.projectCard = new ProjectCardController();
        this.controllers.ortakAlanlar = new OrtakAlanlarController();

        console.log('✅ Tüm controller\'lar başarıyla yüklendi!');
    }

    /**
     * Controller'a erişim
     */
    getController(name) {
        return this.controllers[name];
    }
}

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();

    // Global erişim için (opsiyonel)
    window.TimurBeyApp = app;
});

// Sayfa tamamen yüklendiğinde body'ye loaded sınıfı ekle
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

export default App;
