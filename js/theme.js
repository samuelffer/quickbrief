/**
 * QuickBrief - Theme Management
 * Handles dark/light theme switching and persistence
 */

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const htmlElement = document.documentElement;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Load saved theme preference
    loadThemePreference();
});

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    setTheme(newTheme);
    
    // Save preference
    saveThemePreference(newTheme);
}

/**
 * Set theme to dark or light
 * @param {string} theme - 'dark' or 'light'
 */
function setTheme(theme) {
    // Update data attribute
    htmlElement.setAttribute('data-theme', theme);
    
    // Update icon
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

/**
 * Save theme preference to localStorage
 * @param {string} theme - 'dark' or 'light'
 */
function saveThemePreference(theme) {
    localStorage.setItem('quickbrief-theme', theme);
}

/**
 * Load theme preference from localStorage
 */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('quickbrief-theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to dark theme if no preference is saved
        setTheme('dark');
    }
}
