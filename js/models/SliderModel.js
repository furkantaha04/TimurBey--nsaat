/**
 * SliderModel - Slider Durumu
 * MVC Model Katmanı
 */
class SliderModel {
    constructor(totalSlides) {
        this.currentSlide = 0;
        this.totalSlides = totalSlides;
        this.autoPlayInterval = 5000; // 5 saniye
        this.isPlaying = true;
        this.progressValue = 0;
    }

    next() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.resetProgress();
        return this.currentSlide;
    }

    prev() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.resetProgress();
        return this.currentSlide;
    }

    goTo(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.resetProgress();
        }
        return this.currentSlide;
    }

    getCurrent() {
        return this.currentSlide;
    }

    getTotal() {
        return this.totalSlides;
    }

    getInterval() {
        return this.autoPlayInterval;
    }

    setPlaying(isPlaying) {
        this.isPlaying = isPlaying;
    }

    isAutoPlaying() {
        return this.isPlaying;
    }

    updateProgress(value) {
        this.progressValue = value;
    }

    resetProgress() {
        this.progressValue = 0;
    }

    getProgress() {
        return this.progressValue;
    }
}

export default SliderModel;
