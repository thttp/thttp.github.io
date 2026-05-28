export function initLoading() {
  const loader = document.getElementById('loader');
  const bar    = document.querySelector('#loader-bar > div');
  const textEl = document.getElementById('loader-text');

  const messages = [
    '[   635] starting app...',
    '[   572] mounting app...',
    '[   571] creating app...',
    '[   570] /content/pt-en.json',
    '[   214] loading content resources...',
    '[   178] /assets/js/main.js',
    '[   124] /assets/js/modules/tabs.js',
    '[    98] /assets/js/modules/lang.js',
    '[    76] /assets/js/modules/time.js',
    '[    57] /assets/js/modules/store.js',
    '[    54] /assets/js/modules/profile.js',
    '[    32] /assets/js/modules/loading.js',
    '[    18] /assets/css/tokyo-night-dark.min.css',
    '[     9] loading additional resources...',
    '[     6] /assets/css/styles.css',
    '[     4] /assets/css/root.css',
    '[     3] /index.html',
    '[     3] loading minimal resources...',
    '[     1] booting',
  ];

  if (loader) loader.style.zIndex = '1000';

  if (bar)    bar.parentElement.style.display = '';
  if (textEl) textEl.style.display = '';

  return new Promise(resolve => {
    if (!bar || !textEl) { resolve(); return; }

    const total    = messages.length;
    let   current  = 0;
    const stepTime = 80;

    const interval = setInterval(() => {
      const msg = messages[total - 1 - current];
      const div = document.createElement('div');
      div.textContent = msg;
      textEl.prepend(div);

      current++;
      bar.style.width = Math.round((current / total) * 100) + '%';

      if (current >= total) {
        clearInterval(interval);
        setTimeout(() => {
          if (loader) loader.style.zIndex = '-1';
          resolve();
        }, 300);
      }
    }, stepTime);
  });
}

export function initResumeLoading() {
  const resumeIframe      = document.getElementById('resume-iframe');
  const resumePlaceholder = document.getElementById('resume-placeholder');

  if (!resumeIframe) return;

  resumeIframe.addEventListener('load', () => {
    if (resumePlaceholder) resumePlaceholder.style.display = 'none';
    resumeIframe.style.display = '';
  });
}