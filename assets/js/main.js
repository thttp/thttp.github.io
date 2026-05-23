window.addEventListener('load', function () {

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
  const avatar = document.querySelector('.avatar');

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

  const header = document.querySelector('.title');

  function setLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-lang]').forEach(f => f.classList.remove('active'));
    document.querySelectorAll(`[data-lang="${lang}"]`).forEach(f => f.classList.add('active'));

    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + lang) || el.getAttribute('data-en');
    });

    const currentTab = new URLSearchParams(window.location.search).get('tab') || 'feed';
    if (header) header.textContent = tabNames[currentTab]?.[lang] || currentTab;
  }

  document.querySelectorAll('[data-lang]').forEach(flag => {
    flag.addEventListener('click', () => setLanguage(flag.getAttribute('data-lang')));
  });

  setLanguage('en');


  // LOADING
  const resumeIframe = document.getElementById('resume-iframe');
  const resumePlaceholder = document.getElementById('resume-placeholder');

  if (resumeIframe) {
    resumeIframe.addEventListener('load', function () {
      if (resumePlaceholder) resumePlaceholder.style.display = 'none';
      resumeIframe.style.display = '';
    });
  }


  // TABS
  const buttons = document.querySelectorAll('.button[data-tab]');
  const contents = document.querySelectorAll('[data-tab-content]');

  function switchTab(tab) {
    buttons.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.button[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    contents.forEach(c => c.style.display = 'none');
    const target = document.querySelector(`[data-tab-content="${tab}"]`);
    if (target) target.style.display = '';

    if (header) header.textContent = tabNames[tab]?.[currentLang] || tab;
    window.history.pushState({}, '', `?tab=${tab}`);
  }

  buttons.forEach(btn => {
    if (btn.classList.contains('disabled')) return;
    btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
  });

  const params = new URLSearchParams(window.location.search);
  switchTab(params.get('tab') || 'feed');

});