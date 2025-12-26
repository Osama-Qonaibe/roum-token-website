/**
 * 🌐 ROUM Token i18n (Internationalization) System
 * Professional Multi-Language Support with RTL/LTR Detection
 * Version: 1.0.0
 * 
 * Features:
 * - Automatic language detection from browser/localStorage
 * - Dynamic HTML attribute updates (lang, dir)
 * - CSS dynamically loaded for RTL/LTR
 * - Persistent language preference
 * - Clean API for accessing translations
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'ar'],
        storageKey: 'roum_language_preference',
        messagesPath: '/i18n/messages.json'
    };

    // Global i18n object
    window.i18n = {
        currentLanguage: null,
        messages: {},
        isInitialized: false,

        /**
         * Initialize i18n system
         * Loads messages and sets up language
         */
        async init() {
            try {
                // Load translation messages
                await this.loadMessages();

                // Detect and set language
                this.detectLanguage();
                this.applyLanguage();

                // Listen for language switches
                this.setupLanguageSwitcher();

                this.isInitialized = true;
                console.log('✅ i18n initialized successfully');
            } catch (error) {
                console.error('❌ i18n initialization failed:', error);
            }
        },

        /**
         * Load translation messages from JSON file
         */
        async loadMessages() {
            try {
                const response = await fetch(CONFIG.messagesPath);
                if (!response.ok) throw new Error(`Failed to load messages: ${response.status}`);
                this.messages = await response.json();
            } catch (error) {
                console.error('Failed to load i18n messages:', error);
                // Fallback to empty messages
                this.messages = { en: {}, ar: {} };
            }
        },

        /**
         * Detect user's language preference
         * Priority: localStorage → browser language → default language
         */
        detectLanguage() {
            // 1. Check localStorage for saved preference
            const savedLanguage = localStorage.getItem(CONFIG.storageKey);
            if (savedLanguage && CONFIG.supportedLanguages.includes(savedLanguage)) {
                this.currentLanguage = savedLanguage;
                return;
            }

            // 2. Check browser language
            const browserLanguage = navigator.language?.split('-')[0].toLowerCase();
            if (browserLanguage && CONFIG.supportedLanguages.includes(browserLanguage)) {
                this.currentLanguage = browserLanguage;
                return;
            }

            // 3. Fall back to default
            this.currentLanguage = CONFIG.defaultLanguage;
        },

        /**
         * Apply language to page
         * Updates HTML attributes, direction, and styles
         */
        applyLanguage() {
            const isArabic = this.currentLanguage === 'ar';
            const direction = isArabic ? 'rtl' : 'ltr';

            // Update HTML element
            const htmlElement = document.documentElement;
            htmlElement.setAttribute('lang', this.currentLanguage);
            htmlElement.setAttribute('dir', direction);

            // Update body text alignment
            document.body.style.direction = direction;
            document.body.style.textAlign = isArabic ? 'right' : 'left';

            // Save preference
            localStorage.setItem(CONFIG.storageKey, this.currentLanguage);

            // Dispatch event for other scripts
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: this.currentLanguage, direction }
            }));
        },

        /**
         * Get translation for a key
         * Supports nested keys with dot notation
         * Example: t('hero.title')
         */
        t(key, defaultValue = '') {
            const keys = key.split('.');
            let value = this.messages[this.currentLanguage];

            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return defaultValue || key;
                }
            }

            return typeof value === 'string' ? value : defaultValue || key;
        },

        /**
         * Switch language and apply changes
         */
        switchLanguage(language) {
            if (!CONFIG.supportedLanguages.includes(language)) {
                console.warn(`Unsupported language: ${language}`);
                return false;
            }

            this.currentLanguage = language;
            this.applyLanguage();
            return true;
        },

        /**
         * Setup language switcher buttons
         * Auto-detects and manages language toggle buttons
         */
        setupLanguageSwitcher() {
            // Find all language switcher buttons
            const switcherButtons = document.querySelectorAll('[data-lang-switch]');

            switcherButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const language = button.getAttribute('data-lang-switch');
                    this.switchLanguage(language);
                    this.updateSwitcherUI();
                });
            });

            // Initial UI update
            this.updateSwitcherUI();
        },

        /**
         * Update language switcher UI
         * Marks active language button
         */
        updateSwitcherUI() {
            const switcherButtons = document.querySelectorAll('[data-lang-switch]');
            switcherButtons.forEach(button => {
                const language = button.getAttribute('data-lang-switch');
                if (language === this.currentLanguage) {
                    button.classList.add('active');
                    button.setAttribute('aria-current', 'true');
                } else {
                    button.classList.remove('active');
                    button.setAttribute('aria-current', 'false');
                }
            });
        },

        /**
         * Get current language code
         */
        getCurrentLanguage() {
            return this.currentLanguage;
        },

        /**
         * Get current text direction
         */
        getDirection() {
            return this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        },

        /**
         * Check if current language is Arabic
         */
        isArabic() {
            return this.currentLanguage === 'ar';
        },

        /**
         * Get all messages for current language
         */
        getAllMessages() {
            return this.messages[this.currentLanguage] || {};
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.i18n.init();
        });
    } else {
        window.i18n.init();
    }

})();
