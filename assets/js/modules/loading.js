export function initLoading() {
  const loader = document.getElementById('loader');
  const bar    = document.querySelector('#loader-bar > div');
  const textEl = document.getElementById('loader-text');

  const resources = performance.getEntriesByType('resource');

  const resourceMessages = resources
    .filter(r => {
      try {
        const url = new URL(r.name);
        return url.hostname === location.hostname;
      } catch {
        return false;
      }
    })
    .map(r => {
      const path = new URL(r.name).pathname;
      const ms   = Math.round(r.duration);
      return { ms, text: `[${String(ms).padStart(6)}] ${path}` };
    })
    .sort((a, b) => b.ms - a.ms);

  const maxMs = resourceMessages[0]?.ms ?? 100;

  const messages = [
    `[${String(maxMs + 80).padStart(6)}] starting app...`,
    `[${String(maxMs + 40).padStart(6)}] mounting app...`,
    `[${String(maxMs + 20).padStart(6)}] creating app...`,
    ...resourceMessages.map(r => r.text),
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
          if (loader) loader.style.display = 'none';
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