/**
 * StatsController - İstatistik Kontrolcüsü
 * MVC Controller Katmanı
 */
import StatsView from '../views/StatsView.js';

class StatsController {
    constructor() {
        this.view = new StatsView();
        this.animated = false;

        if (this.view.hasStats()) {
            this.init();
        }
    }

    init() {
        this.setupObserver();
    }

    setupObserver() {
        const statsSection = this.view.getStatsSection();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    animateCounters() {
        const counters = this.view.getCounters();
        const duration = 2000;

        counters.forEach(counter => {
            const { target, suffix } = this.view.getCounterData(counter);
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    this.view.updateCounter(counter, Math.floor(current), suffix);
                    requestAnimationFrame(updateCounter);
                } else {
                    this.view.updateCounter(counter, target, suffix);
                }
            };

            updateCounter();
        });
    }
}

export default StatsController;
