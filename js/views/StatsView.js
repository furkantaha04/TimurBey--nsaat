/**
 * StatsView - İstatistik Görünümü
 * MVC View Katmanı
 */
class StatsView {
    constructor() {
        this.statsSection = document.querySelector('.stats');
        this.counters = document.querySelectorAll('.stat-number');
    }

    updateCounter(element, value, suffix) {
        if (element) {
            element.textContent = value + suffix;
        }
    }

    getCounters() {
        return this.counters;
    }

    getStatsSection() {
        return this.statsSection;
    }

    hasStats() {
        return this.statsSection !== null && this.counters.length > 0;
    }

    getCounterData(counter) {
        return {
            target: parseInt(counter.getAttribute('data-target')) || 0,
            suffix: counter.getAttribute('data-suffix') || ''
        };
    }
}

export default StatsView;
