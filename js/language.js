/**
 * QuickBrief - Language Management
 * Handles multilingual support and language switching
 */

// DOM Elements
const languageSelector = document.getElementById('languageSelector');
const currentLanguageElement = document.getElementById('currentLanguage');
const languageModal = document.getElementById('languageModal');
const closeLanguageModal = document.getElementById('closeLanguageModal');
const languageOptions = document.querySelectorAll('.language-option');

// Available languages
const AVAILABLE_LANGUAGES = ['en', 'pt-br', 'pt', 'es'];
const LANGUAGE_NAMES = {
    'en': 'EN',
    'pt-br': 'PT-BR',
    'pt': 'PT',
    'es': 'ES'
};

// Current translations
let translations = {};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up language selector
    languageSelector.addEventListener('click', showLanguageModal);
    closeLanguageModal.addEventListener('click', hideLanguageModal);
    
    // Set up language options
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            changeLanguage(lang);
            hideLanguageModal();
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === languageModal) {
            hideLanguageModal();
        }
    });
    
    // Load saved language preference
    loadLanguagePreference();
});

/**
 * Show language selection modal
 */
function showLanguageModal() {
    languageModal.style.display = 'flex';
    
    // Add animation
    setTimeout(() => {
        languageModal.querySelector('.modal-content').style.transform = 'translateY(0)';
        languageModal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

/**
 * Hide language selection modal
 */
function hideLanguageModal() {
    const modalContent = languageModal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        languageModal.style.display = 'none';
    }, 300);
}

/**
 * Change the application language
 * @param {string} lang - Language code (e.g., 'en', 'pt-br')
 */
async function changeLanguage(lang) {
    if (!AVAILABLE_LANGUAGES.includes(lang)) {
        console.error(`Language ${lang} is not supported`);
        return;
    }
    
    try {
        // Load language file
        const response = await fetch(`languages/${lang}.json`);
        translations = await response.json();
        
        // Update UI
        updateUI(lang);
        
        // Save preference
        saveLanguagePreference(lang);
        
    } catch (error) {
        console.error('Error loading language file:', error);
    }
}

/**
 * Update UI with new language
 * @param {string} lang - Language code
 */
function updateUI(lang) {
    // Update current language display
    currentLanguageElement.textContent = LANGUAGE_NAMES[lang];
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update all elements with data-i18n-placeholder attribute
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getTranslation(key);
        if (translation) {
            element.placeholder = translation;
        }
    });
    
    // Update document title if available
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        document.title = `${pageTitle.textContent} - QuickBrief`;
    }
}

/**
 * Get translation for a key
 * @param {string} key - Translation key (e.g., 'nav.home')
 * @returns {string} - Translated text or the key itself if not found
 */
function getTranslation(key) {
    // Split the key by dots to access nested properties
    const parts = key.split('.');
    let result = translations;
    
    // Get the language object
    const lang = currentLanguageElement.textContent.toLowerCase();
    if (result[lang]) {
        result = result[lang];
    } else {
        // If the current language is not found, try to use the first language
        const firstLang = Object.keys(result)[0];
        if (firstLang) {
            result = result[firstLang];
        }
    }
    
    // Navigate through the nested properties
    for (const part of parts) {
        if (result && result[part] !== undefined) {
            result = result[part];
        } else {
            return key; // Return the key if the translation is not found
        }
    }
    
    return result;
}

/**
 * Save language preference to localStorage
 * @param {string} lang - Language code
 */
function saveLanguagePreference(lang) {
    localStorage.setItem('quickbrief-language', lang);
}

/**
 * Load language preference from localStorage
 */
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('quickbrief-language');
    
    if (savedLang && AVAILABLE_LANGUAGES.includes(savedLang)) {
        changeLanguage(savedLang);
    } else {
        // Default to English if no preference is saved
        changeLanguage('en');
    }
}

// Make getTranslation available globally
window.getTranslation = getTranslation;
