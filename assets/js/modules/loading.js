function startTriangleTransition(onComplete) {
  const COLS    = 16;
  const ROWS    = 8;
  const SIZE    = 125;
  const MAX_DEL = 0.4;
  const FINISH  = (MAX_DEL + 0.1) * 1000;

  const svgNS = 'http://www.w3.org/2000/svg';

  const style = document.createElement('style');
  style.textContent = `
    @keyframes tri-fade { from { opacity: 0; } to { opacity: 1; } }
    .tri-poly {
      opacity: 0;
      fill: var(--background);
      stroke: var(--background);
      animation: tri-fade 0.04s forwards;
    }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.style.cssText = 'position:fixed;inset:0;z-index:1001;visibility:visible;pointer-events:none;overflow:hidden';

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width',  '2000');
  svg.setAttribute('height', '1000');

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const even = x % 2;
      const yOff = y % 2;
      const x0   = (x + 0) * SIZE + yOff * SIZE - 2 * SIZE;
      const x1   = (x + 1) * SIZE + yOff * SIZE - 2 * SIZE;
      const x2   = (x + 2) * SIZE + yOff * SIZE - 2 * SIZE;
      const y0   = y * SIZE + ( even) * SIZE;
      const y1   = y * SIZE + (!even) * SIZE;

      const poly = document.createElementNS(svgNS, 'polygon');
      poly.setAttribute('points', `${x0},${y0} ${x1},${y1} ${x2},${y0}`);
      poly.classList.add('tri-poly');
      poly.style.animationDelay = `${(MAX_DEL * Math.random()).toFixed(3)}s`;

      svg.appendChild(poly);
    }
  }

  wrap.appendChild(svg);
  document.body.appendChild(wrap);

  setTimeout(() => {
    wrap.remove();
    style.remove();
    onComplete();
  }, (MAX_DEL + 0.15) * 1000);
}

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
        startTriangleTransition(() => {
          if (loader) loader.style.display = 'none';
          resolve();
        });
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