/**
 * RevealController - Reveal Animasyonları Kontrolcüsü
 * MVC Controller Katmanı
 */
class RevealController {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal');

        if (this.revealElements.length > 0) {
            this.init();
        }
    }

    init() {
        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.revealElements.forEach(el => observer.observe(el));
    }
}

export default RevealController;
