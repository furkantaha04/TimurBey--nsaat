/**
 * ProjectCardController - Proje Kartları Kontrolcüsü
 * MVC Controller Katmanı
 */
class ProjectCardController {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');

        if (this.projectCards.length > 0) {
            this.init();
        }
    }

    init() {
        this.setupHoverEffects();
    }

    setupHoverEffects() {
        this.projectCards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');

            if (overlay) {
                card.addEventListener('mouseenter', () => {
                    overlay.style.opacity = '1';
                });

                card.addEventListener('mouseleave', () => {
                    overlay.style.opacity = '0';
                });
            }
        });
    }
}

export default ProjectCardController;
