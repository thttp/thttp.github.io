import { setState, getState } from './store.js';

export function initLang(header, tabNames) {

  const langButtons = document.querySelectorAll('[data-lang]');
  const translatableElements = document.querySelectorAll('[data-en]');

  const resumeUrls = {
    en: '/resume/resume.html',
    pt: '/resume/curriculo.html',
  };

  function applyLanguage(lang) {
    setState({ lang });

    localStorage.setItem('lang', lang);

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    translatableElements.forEach(el => {
      el.textContent =
        el.getAttribute('data-' + lang) ||
        el.getAttribute('data-en');
    });

    const iframe = document.getElementById('resume-iframe');
    if (iframe && resumeUrls[lang]) {
      iframe.src = resumeUrls[lang];
    }

    const { tab } = getState();

    if (header) {
      header.textContent = tabNames[tab]?.[lang] || tab;
    }

  }

  langButtons.forEach(flag => {
    flag.addEventListener('click', () => {
      applyLanguage(flag.getAttribute('data-lang'));
    });
  });

  const savedLang = localStorage.getItem('lang') || 'en';
  applyLanguage(savedLang);

  return { applyLanguage };
}