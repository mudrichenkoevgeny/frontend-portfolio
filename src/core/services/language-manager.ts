async function applyTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const dictionary = await response.json();
        const elements = document.querySelectorAll('[data-translate-key]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (dictionary[key]) {
                element.textContent = dictionary[key];
            }
        });

        document.documentElement.lang = lang;
    } catch (error) {
        console.error("Failed to load translations:", error);
    }
}

export async function initializeLanguage() {
    const languageSelector = document.getElementById('language-selector');
    const currentLang = getPreferredLanguage();

    if (languageSelector) {
        languageSelector.value = currentLang;
        languageSelector.addEventListener('change', async (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('user_language', selectedLang);
            await applyTranslations(selectedLang);
        });
    }

    await applyTranslations(currentLang);
}

function getPreferredLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryLang = urlParams.get('lang');
    if (queryLang) return queryLang;

    const savedLang = localStorage.getItem('user_language');
    if (savedLang) return savedLang;

    const browserLang = navigator.language.substring(0, 2);
    return (browserLang === 'ru' || browserLang === 'en') ? browserLang : 'en';
}