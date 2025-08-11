// Simple language detection and redirect
(function() {
    'use strict';
    
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.substring(0, 2).toLowerCase();
    
    // Supported languages
    const supportedLangs = ['da', 'en', 'de'];
    const defaultLang = 'en';
    
    // Check if we should redirect
    const currentPath = window.location.pathname;
    const isRootPath = currentPath === '/' || currentPath === '/index.html';
    
    if (isRootPath && !sessionStorage.getItem('languageSelected')) {
        // Determine target language
        let targetLang = supportedLangs.includes(langCode) ? langCode : defaultLang;
        
        // Add delay to allow user to see language selector
        setTimeout(() => {
            // Only redirect if user hasn't interacted with language selector
            if (!sessionStorage.getItem('languageSelected')) {
                window.location.href = `/${targetLang}/`;
            }
        }, 2000);
    }
    
    // Handle manual language selection
    document.addEventListener('DOMContentLoaded', function() {
        const languageLinks = document.querySelectorAll('.language-link');
        languageLinks.forEach(link => {
            link.addEventListener('click', function() {
                sessionStorage.setItem('languageSelected', 'true');
            });
        });
    });
})();