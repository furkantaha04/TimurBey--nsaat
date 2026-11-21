// Theme Toggle Functionality
(function () {
    'use strict';

    const THEME_KEY = 'timurbey-theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    // Logo paths
    const LIGHT_LOGO = 'images/logo.png';  // Transparan logo (beyaz arka plan için)
    const DARK_LOGO = 'images/logo.jpg';   // Siyah arka planlı logo (koyu mod için)

    // Get saved theme or default to light
    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) || LIGHT_THEME;
    }

    // Update logo based on theme
    function updateLogo(theme) {
        const logos = document.querySelectorAll('.logo-img');
        const logoSrc = theme === DARK_THEME ? DARK_LOGO : LIGHT_LOGO;

        logos.forEach(logo => {
            logo.src = logoSrc;
        });
    }

    // Apply theme to document
    function applyTheme(theme) {
        if (theme === DARK_THEME) {
            document.documentElement.setAttribute('data-theme', DARK_THEME);
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem(THEME_KEY, theme);

        // Update logo
        updateLogo(theme);
    }

    // Toggle between themes
    function toggleTheme() {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        applyTheme(newTheme);
    }

    // Initialize theme on page load
    function initTheme() {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Set up toggle button
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
