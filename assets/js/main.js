import { initTime }           from './modules/time.js';
import { initProfile }        from './modules/profile.js';
import { initLoading, initResumeLoading } from './modules/loading.js';
import { initLang }           from './modules/lang.js';
import { initTabs }           from './modules/tabs.js';

window.addEventListener('load', async () => {

  const header = document.querySelector('.title');

  const tabNames = {
    feed:   { en: 'Feed',   pt: 'Feed' },
    resume: { en: 'Resume', pt: 'Currículo' },
    social: { en: 'Social', pt: 'Social' },
    memory: { en: 'Memory', pt: 'Memória' }
  };

  await initLoading();

  document.body.classList.add('loaded');
  document.body.style.visibility = 'visible';

  initTime();
  initProfile();
  initResumeLoading();
  initLang(header, tabNames);
  initTabs(header, tabNames);

});