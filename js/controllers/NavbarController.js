/**
 * NavbarController - Navbar Kontrolcüsü
 * MVC Controller Katmanı
 */
import NavbarView from '../views/NavbarView.js';

class NavbarController {
    constructor() {
        this.view = new NavbarView();
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScroll();
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const isScrolled = window.scrollY > 50;
            this.view.setScrolled(isScrolled);
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = this.view.getMobileMenuBtn();

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.view.toggleMobileMenu();
            });
        }

        // Menü linklerine tıklayınca menüyü kapat
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.view.closeMobileMenu();
            });
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

export default NavbarController;
