/**
 * SliderView - Slider Görünümü
 * MVC View Katmanı
 */
class SliderView {
    constructor() {
        this.sliderTrack = document.getElementById('sliderTrack');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('sliderPrev');
        this.nextBtn = document.getElementById('sliderNext');
        this.dots = document.querySelectorAll('.dot');
        this.progressBar = document.getElementById('sliderProgress');
        this.heroSlider = document.getElementById('heroSlider');
    }

    goToSlide(index) {
        if (this.sliderTrack) {
            this.sliderTrack.style.transform = `translateX(-${index * 100}%)`;
        }
    }

    updateDots(currentIndex) {
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    updateProgress(percentage) {
        if (this.progressBar) {
            this.progressBar.style.width = `${Math.min(percentage, 100)}%`;
        }
    }

    resetProgress() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }

    getSliderTrack() {
        return this.sliderTrack;
    }

    getSlides() {
        return this.slides;
    }

    getPrevBtn() {
        return this.prevBtn;
    }

    getNextBtn() {
        return this.nextBtn;
    }

    getDots() {
        return this.dots;
    }

    getHeroSlider() {
        return this.heroSlider;
    }

    hasSlider() {
        return this.sliderTrack && this.slides.length > 0;
    }
}

export default SliderView;
