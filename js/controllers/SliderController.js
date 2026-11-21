/**
 * SliderController - Slider Kontrolcüsü
 * MVC Controller Katmanı
 */
import SliderModel from '../models/SliderModel.js';
import SliderView from '../views/SliderView.js';

class SliderController {
    constructor() {
        this.view = new SliderView();

        if (!this.view.hasSlider()) {
            return;
        }

        this.model = new SliderModel(this.view.getSlides().length);
        this.autoPlayTimer = null;
        this.progressTimer = null;

        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupDots();
        this.setupKeyboard();
        this.setupTouch();
        this.setupHover();
        this.startAutoPlay();
    }

    goToSlide(index) {
        const newIndex = this.model.goTo(index);
        this.view.goToSlide(newIndex);
        this.view.updateDots(newIndex);
        this.view.resetProgress();
    }

    nextSlide() {
        const newIndex = this.model.next();
        this.view.goToSlide(newIndex);
        this.view.updateDots(newIndex);
        this.view.resetProgress();
    }

    prevSlide() {
        const newIndex = this.model.prev();
        this.view.goToSlide(newIndex);
        this.view.updateDots(newIndex);
        this.view.resetProgress();
    }

    setupNavigation() {
        const prevBtn = this.view.getPrevBtn();
        const nextBtn = this.view.getNextBtn();

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.restartAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.restartAutoPlay();
            });
        }
    }

    setupDots() {
        const dots = this.view.getDots();

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            const sliderTrack = this.view.getSliderTrack();
            if (!sliderTrack) return;

            const rect = sliderTrack.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prevSlide();
                    this.restartAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                    this.restartAutoPlay();
                }
            }
        });
    }

    setupTouch() {
        const heroSlider = this.view.getHeroSlider();
        if (!heroSlider) return;

        let touchStartX = 0;
        let touchEndX = 0;

        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.stopAutoPlay();
        }, { passive: true });

        heroSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
            this.startAutoPlay();
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    setupHover() {
        const heroSlider = this.view.getHeroSlider();
        if (!heroSlider) return;

        heroSlider.addEventListener('mouseenter', () => this.stopAutoPlay());
        heroSlider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    startAutoPlay() {
        this.stopAutoPlay();

        const interval = this.model.getInterval();

        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, interval);

        this.startProgress();
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    startProgress() {
        const interval = this.model.getInterval();
        let progressValue = 0;

        this.view.resetProgress();

        this.progressTimer = setInterval(() => {
            progressValue += 100 / (interval / 100);
            this.view.updateProgress(progressValue);
        }, 100);
    }
}

export default SliderController;
