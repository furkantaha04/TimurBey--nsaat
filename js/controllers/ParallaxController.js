/**
 * ParallaxController - Parallax Efekti Kontrolcüsü
 * MVC Controller Katmanı
 */
class ParallaxController {
    constructor() {
        this.hero = document.querySelector('.hero');

        if (this.hero) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            this.hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
}

export default ParallaxController;
