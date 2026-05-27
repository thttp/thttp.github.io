document.addEventListener('DOMContentLoaded', () => {

  const avatar = document.querySelector('.avatar');
  const header = document.querySelector('.title');

  const langButtons = document.querySelectorAll('[data-lang]');
  const translatableElements = document.querySelectorAll('[data-en]');

  const buttons = document.querySelectorAll('.button[data-tab]');
  const contents = document.querySelectorAll('[data-tab-content]');

  const resumeIframe = document.getElementById('resume-iframe');
  const resumePlaceholder = document.getElementById('resume-placeholder');

  const params = new URLSearchParams(window.location.search);


  // TIMEPIECE
  function updateTime() {
    const time = new Date().toLocaleTimeString('pt-BR', {
      timeZone: 'America/Recife',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const el = document.getElementById('relife-time');
    if (el) el.textContent = time;
  }

  updateTime();
  setInterval(updateTime, 1000);


  // PROFILE
  if (avatar) {
    avatar.addEventListener('contextmenu', e => e.preventDefault());
    avatar.addEventListener('dragstart', e => e.preventDefault());
  }


  // LANGS
  let currentLang = 'en';

  const tabNames = {
    feed:   { en: 'Feed',   pt: 'Feed' },
    resume: { en: 'Resume', pt: 'Currículo' },
    social: { en: 'Social', pt: 'Social' },
    memory: { en: 'Memory', pt: 'Memória' }
  };

  function setLanguage(lang) {
    currentLang = lang;

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    translatableElements.forEach(el => {
      el.textContent =
        el.getAttribute('data-' + lang) ||
        el.getAttribute('data-en');
    });

    const currentTab = params.get('tab') || 'feed';
    if (header) {
      header.textContent = tabNames[currentTab]?.[lang] || currentTab;
    }
  }

  langButtons.forEach(flag => {
    flag.addEventListener('click', () => {
      setLanguage(flag.getAttribute('data-lang'));
    });
  });

  setLanguage('en');


  // LOADING
  if (resumeIframe) {
    resumeIframe.addEventListener('load', () => {
      if (resumePlaceholder) {
        resumePlaceholder.style.display = 'none';
      }
      resumeIframe.style.display = '';
    });
  }


  // TABS
  function switchTab(tab) {
    buttons.forEach(b => b.classList.remove('active'));

    const activeBtn = Array.from(buttons).find(b => b.dataset.tab === tab);
    if (activeBtn) activeBtn.classList.add('active');

    contents.forEach(c => c.style.display = 'none');

    const target = Array.from(contents).find(c => c.dataset.tabContent === tab);
    if (target) target.style.display = '';

    if (header) {
      header.textContent = tabNames[tab]?.[currentLang] || tab;
    }

    window.history.pushState({}, '', `?tab=${tab}`);
  }

  buttons.forEach(btn => {
    if (btn.classList.contains('disabled')) return;
    btn.addEventListener('click', () => {
      switchTab(btn.getAttribute('data-tab'));
    });
  });

  switchTab(params.get('tab') || 'feed');

});