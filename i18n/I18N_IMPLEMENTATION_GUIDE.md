# 🌐 ROUM Token i18n Implementation Guide

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** December 26, 2025

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [File Structure](#file-structure)
4. [Installation & Setup](#installation--setup)
5. [Usage Guide](#usage-guide)
6. [Translation Management](#translation-management)
7. [RTL/LTR Support](#rtlltr-support)
8. [Performance Considerations](#performance-considerations)
9. [Troubleshooting](#troubleshooting)
10. [Future Enhancements](#future-enhancements)

---

## Overview

The **i18n (Internationalization) System** for ROUM Token provides professional, enterprise-grade multi-language support with:

- ✅ **Automatic Language Detection** - Browser language detection with localStorage fallback
- ✅ **Dynamic Language Switching** - Instant language changes without page reload
- ✅ **Perfect RTL/LTR Support** - Automatic HTML direction and styling based on language
- ✅ **Consistent Translations** - Single source of truth for all messages
- ✅ **Professional Fonts** - Tajawal (Arabic) + Almarai (Arabic supplement) + system fonts
- ✅ **SEO Optimized** - Proper `lang` and `dir` attributes for search engines
- ✅ **Accessibility Ready** - WCAG 2.1 compliant with proper language attributes
- ✅ **Performance Optimized** - Minimal overhead, efficient caching

---

## System Architecture

### Components

```
i18n/
├── messages.json          # Translation strings (EN + AR)
├── i18n.js               # Core i18n library
├── universal-index.html  # Template for all pages
└── I18N_IMPLEMENTATION_GUIDE.md  # This guide
```

### Data Flow

```
Browser Load
    ↓
Load i18n.js (auto-initialization)
    ↓
Detect Language (localStorage → browser → default)
    ↓
Load messages.json
    ↓
Apply Language (HTML attributes + direction)
    ↓
Render Page with Translations
    ↓
Listen for Language Switches
    ↓
Update DOM Elements
```

---

## File Structure

### `i18n/messages.json`

Centralized translation file with nested structure:

```json
{
  "en": {
    "nav": {
      "home": "Home",
      "about": "About",
      ...
    },
    "hero": {
      "title": "ROUM Token",
      "subtitle": "...",
      ...
    },
    ...
  },
  "ar": {
    "nav": {
      "home": "الرئيسية",
      "about": "عننا",
      ...
    },
    "hero": {
      "title": "رمز ROUM",
      "subtitle": "...",
      ...
    },
    ...
  }
}
```

**Structure Benefits:**
- Organized by page section (nav, hero, features, etc.)
- Nested keys allow logical grouping
- Easy to maintain and update
- Supports dot-notation access: `i18n.t('hero.title')`

### `i18n/i18n.js`

Core library providing:
- `i18n.init()` - Initialize system
- `i18n.t(key)` - Get translation
- `i18n.switchLanguage(lang)` - Change language
- `i18n.getCurrentLanguage()` - Get current language
- `i18n.getDirection()` - Get text direction (RTL/LTR)
- `i18n.isArabic()` - Check if Arabic is active

### `i18n/universal-index.html`

Unified template using data attributes for translations:

```html
<h1 data-i18n="hero.title">ROUM Token</h1>
<p data-i18n="hero.subtitle">Subtitle text...</p>
<button data-lang-switch="en">English</button>
<button data-lang-switch="ar">العربية</button>
```

---

## Installation & Setup

### Step 1: Deploy Files

Ensure these files are in your project root:

```
project-root/
├── i18n/
│   ├── messages.json
│   ├── i18n.js
│   └── universal-index.html
├── index.html (your main page)
└── ...
```

### Step 2: Add to Your HTML

In your HTML `<head>` section:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <!-- ... other meta tags ... -->
</head>
<body>
    <!-- Your content here -->

    <!-- Load i18n system at end of body -->
    <script src="/i18n/i18n.js"></script>
    <script>
        // Optional: Initialize with custom options
        // window.i18n.init();
    </script>
</body>
</html>
```

### Step 3: Add Data Attributes

Mark elements for translation:

```html
<!-- Navigation -->
<nav>
    <a href="/" data-i18n="nav.home">Home</a>
    <a href="/about" data-i18n="nav.about">About</a>
</nav>

<!-- Language Switcher -->
<div class="lang-switcher">
    <button data-lang-switch="en">English</button>
    <button data-lang-switch="ar">العربية</button>
</div>

<!-- Content -->
<h1 data-i18n="hero.title">ROUM Token</h1>
<p data-i18n="hero.subtitle">Subtitle...</p>
```

---

## Usage Guide

### Basic Translation

```javascript
// Get translation
const homeText = i18n.t('nav.home');
console.log(homeText); // "Home" (if EN) or "الرئيسية" (if AR)
```

### DOM Updates

```html
<!-- Element will auto-update via data-i18n attribute -->
<h1 data-i18n="hero.title">Original text</h1>
```

The system automatically updates all elements with `data-i18n` attributes.

### Language Switching

```javascript
// Method 1: Using language switcher buttons
<button data-lang-switch="ar">العربية</button>

// Method 2: Programmatically
i18n.switchLanguage('ar');

// Method 3: Get current language
const currentLang = i18n.getCurrentLanguage();
console.log(currentLang); // 'ar' or 'en'
```

### Event Listening

```javascript
// Listen for language changes
window.addEventListener('languageChanged', function(event) {
    const { language, direction } = event.detail;
    console.log(`Language changed to: ${language}`);
    console.log(`Direction: ${direction}`); // 'rtl' or 'ltr'
    
    // Perform any custom updates
});
```

### Conditional Logic

```javascript
// Check if Arabic is active
if (i18n.isArabic()) {
    // Do something Arabic-specific
    console.log('Arabic mode is active');
}

// Get direction for custom styling
const dir = i18n.getDirection();
if (dir === 'rtl') {
    element.style.textAlign = 'right';
} else {
    element.style.textAlign = 'left';
}
```

---

## Translation Management

### Adding New Translations

1. **Edit `i18n/messages.json`**

```json
{
  "en": {
    "footer": {
      "copyright": "© 2025 ROUM Token. All rights reserved.",
      // Add new key here
      "new_section": {
        "title": "New Title",
        "description": "New Description"
      }
    }
  },
  "ar": {
    "footer": {
      "copyright": "© 2025 رمز ROUM. جميع الحقوق محفوظة.",
      // Add Arabic translation
      "new_section": {
        "title": "العنوان الجديد",
        "description": "الوصف الجديد"
      }
    }
  }
}
```

2. **Use in HTML**

```html
<h3 data-i18n="footer.new_section.title">New Title</h3>
<p data-i18n="footer.new_section.description">New Description</p>
```

### Translation Workflow

1. ✅ Identify content needing translation
2. ✅ Add English version to `messages.json`
3. ✅ Add Arabic translation with same key structure
4. ✅ Add `data-i18n` attribute to HTML elements
5. ✅ Test both languages
6. ✅ Commit to repository

---

## RTL/LTR Support

### Automatic Direction Handling

The system automatically applies the correct direction:

```html
<!-- Language: EN (LTR) -->
<html lang="en" dir="ltr">

<!-- Language: AR (RTL) -->
<html lang="ar" dir="rtl">
```

### CSS for RTL

```css
/* LTR (English) - Default -->
.logo {
    display: flex;
    gap: 1rem;
}

/* RTL (Arabic) - Auto-handled -->
html[dir="rtl"] .logo {
    flex-direction: row-reverse;
}

/* Border handling -->
.compliance-item {
    border-left: 4px solid #D4AF37;
}

html[dir="rtl"] .compliance-item {
    border-left: none;
    border-right: 4px solid #D4AF37;
}
```

### Text Alignment

```css
/* Body text -->
body {
    text-align: left; /* Default for LTR */
}

html[dir="rtl"] body {
    text-align: right;
}

/* Sections -->
html[dir="rtl"] .compliance-container {
    text-align: right;
}
```

---

## Performance Considerations

### Loading Strategy

1. **messages.json** - Loaded once at initialization
2. **i18n.js** - Lightweight (~7KB), auto-initializes
3. **Caching** - Language preference stored in localStorage
4. **No Page Reload** - Language switching uses DOM updates

### Optimization Tips

```javascript
// Lazy load translations for large projects
const loadAdditionalLanguages = async () => {
    const response = await fetch('/i18n/messages.json');
    window.i18n.messages = await response.json();
};

// Defer non-critical translations
window.addEventListener('load', loadAdditionalLanguages);
```

### Bundle Size

- `i18n.js` - ~7 KB (minified)
- `messages.json` - ~8 KB (for EN + AR)
- **Total** - ~15 KB (gzip ~5 KB)

---

## Troubleshooting

### Issue: Translations Not Appearing

**Solution:**

```javascript
// Check if i18n is initialized
console.log(window.i18n.isInitialized);

// Check current language
console.log(i18n.getCurrentLanguage());

// Test translation directly
console.log(i18n.t('nav.home'));
```

### Issue: RTL Not Working Properly

**Solution:**

```html
<!-- Ensure HTML element has dir attribute -->
<html dir="rtl" lang="ar">
    <!-- Content -->
</html>

<!-- Ensure body has proper text-align -->
<style>
    html[dir="rtl"] body {
        text-align: right;
        direction: rtl;
    }
</style>
```

### Issue: Language Not Persisting

**Solution:**

```javascript
// Check localStorage
console.log(localStorage.getItem('roum_language_preference'));

// Manually set language
localStorage.setItem('roum_language_preference', 'ar');
i18n.switchLanguage('ar');
```

---

## Future Enhancements

### Planned Features

- [ ] **Pluralization Support** - Handle plural forms
- [ ] **Number Formatting** - Locale-specific number formatting
- [ ] **Date Formatting** - Locale-specific date display
- [ ] **Currency Support** - Multi-currency display
- [ ] **Right-to-Left Numerals** - Arabic numbers (٠١٢٣..)
- [ ] **Translation Management UI** - Admin dashboard for translations
- [ ] **Automatic Translation** - Integration with translation APIs
- [ ] **Language Variants** - Support for ar-SA, ar-EG, etc.

### Integration Points

```javascript
// Future: Currency formatting
i18n.formatCurrency(1000, 'usd', 'ar');
// Output: "1,000.00 د.إ" (for Arabic)

// Future: Date formatting
i18n.formatDate(new Date(), 'ar');
// Output: "26 ديسمبر 2025"
```

---

## Best Practices

### ✅ DO

- ✅ Keep translation keys organized hierarchically
- ✅ Use descriptive key names (e.g., `hero.title` not `h1_1`)
- ✅ Test both languages before deploying
- ✅ Keep messages.json updated
- ✅ Use proper HTML attributes (lang, dir)
- ✅ Provide fallback text in HTML
- ✅ Test with RTL-focused browser dev tools
- ✅ Keep font sizes readable in both languages

### ❌ DON'T

- ❌ Don't hardcode text that needs translation
- ❌ Don't use machine translation without review
- ❌ Don't forget to add data-i18n attributes
- ❌ Don't override direction CSS inappropriately
- ❌ Don't skip RTL testing
- ❌ Don't mix LTR and RTL content without proper handling
- ❌ Don't ignore accessibility (lang attributes)
- ❌ Don't commit untested translations

---

## Quick Reference

### API Methods

```javascript
i18n.init()                              // Initialize system
i18n.t('key.path')                      // Get translation
i18n.switchLanguage('ar')               // Change language
i18n.getCurrentLanguage()               // Get current language
i18n.getDirection()                     // Get RTL/LTR direction
i18n.isArabic()                         // Check if Arabic active
i18n.getAllMessages()                   // Get all messages for current language
```

### HTML Attributes

```html
data-i18n="key.path"      <!-- Mark element for translation -->
data-lang-switch="ar"     <!-- Language switcher button -->
```

### Events

```javascript
window.addEventListener('languageChanged', handler);
```

---

## Support & Maintenance

### Regular Updates

- Review translations quarterly
- Update messages.json with new features
- Test RTL rendering on all pages
- Monitor browser compatibility
- Update fonts if needed

### Reporting Issues

For translation issues or suggestions:

1. Check if translation exists in messages.json
2. Verify HTML has proper data-i18n attribute
3. Test in both languages
4. Report with language and expected output

---

**Created:** December 26, 2025  
**Status:** ✅ Production Ready  
**Maintained By:** ROUM Token Development Team

© 2025 ROUM Token. All rights reserved.
