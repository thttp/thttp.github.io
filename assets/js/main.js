import { initTime } from './modules/time.js';
import { initProfile } from './modules/profile.js';
import { initLoading } from './modules/loading.js';
import { initLang } from './modules/lang.js';
import { initTabs } from './modules/tabs.js';

window.addEventListener('load', () => {

  const header = document.querySelector('.title');

  const tabNames = {
    feed:   { en: 'Feed',   pt: 'Feed' },
    resume: { en: 'Resume', pt: 'Currículo' },
    social: { en: 'Social', pt: 'Social' },
    memory: { en: 'Memory', pt: 'Memória' }
  };

  initTime();
  initProfile();
  initLoading();

  initLang(header, tabNames);
  initTabs(header, tabNames);

  document.body.style.visibility = 'visible';

});