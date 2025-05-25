/**
 * QuickBrief - Main JavaScript
 * Handles common functionality across all pages
 */

// DOM Elements
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');

// Loading animation elements
let loadingOverlay = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Set up mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleSidebar);
    }
    
    // Create loading overlay element
    createLoadingOverlay();
});

/**
 * Toggle sidebar visibility
 */
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed');
}

/**
 * Create loading overlay element
 */
function createLoadingOverlay() {
    loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">
                <i class="fas fa-plane"></i>
            </div>
            <p class="loading-text" data-i18n="common.loading">Loading...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
}

/**
 * Show loading overlay with custom message
 * @param {string} message - Optional custom loading message
 */
function showLoading(message = null) {
    const loadingText = loadingOverlay.querySelector('.loading-text');
    
    if (message) {
        loadingText.textContent = message;
    } else {
        loadingText.textContent = getTranslation('common.loading');
    }
    
    loadingOverlay.classList.add('active');
    document.body.classList.add('loading');
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    loadingOverlay.classList.remove('active');
    document.body.classList.remove('loading');
    
    // Add fade-out animation
    loadingOverlay.classList.add('fade-out');
    
    // Remove fade-out class after animation completes
    setTimeout(() => {
        loadingOverlay.classList.remove('fade-out');
    }, 500);
}

// Make loading functions available globally
window.showLoading = showLoading;
window.hideLoading = hideLoading;

/**
 * Format number with commas
 * @param {number} number - Number to format
 * @returns {string} - Formatted number string
 */
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format date string
 * @param {string} dateString - Date string to format
 * @returns {string} - Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Make utility functions available globally
window.formatNumber = formatNumber;
window.formatDate = formatDate;

// Add CSS for loading overlay
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .loading-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .loading-overlay.fade-out {
        opacity: 0;
    }
    
    .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-spinner {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
        margin-bottom: 1rem;
    }
    
    .loading-spinner i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: plane-spin 2s infinite linear;
    }
    
    @keyframes plane-spin {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
    
    .loading-text {
        font-size: 1.2rem;
        margin: 0;
    }
    
    body.loading {
        overflow: hidden;
    }
    
    /* Page transition animations */
    .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
    }
    
    .animate-slide-up {
        animation: slideUp 0.5s ease-in-out;
    }
    
    .animate-slide-left {
        animation: slideLeft 0.5s ease-in-out;
    }
    
    .animate-slide-right {
        animation: slideRight 0.5s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideLeft {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideRight {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

document.head.appendChild(style);
