/**
 * NavbarView - Navbar Görünümü
 * MVC View Katmanı
 */
class NavbarView {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelector('.nav-links');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    }

    setScrolled(isScrolled) {
        if (this.navbar) {
            if (isScrolled) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }
    }

    toggleMobileMenu() {
        if (this.navLinks) {
            this.navLinks.classList.toggle('active');
        }

        if (this.mobileMenuBtn) {
            const spans = this.mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        }
    }

    closeMobileMenu() {
        if (this.navLinks) {
            this.navLinks.classList.remove('active');
        }
    }

    getElement() {
        return this.navbar;
    }

    getMobileMenuBtn() {
        return this.mobileMenuBtn;
    }

    getNavLinks() {
        return this.navLinks;
    }
}

export default NavbarView;
