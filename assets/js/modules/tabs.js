import { setState, getState } from './store.js';

export function initTabs(header, tabNames) {

  const buttons  = document.querySelectorAll('.button[data-tab]');
  const contents = document.querySelectorAll('[data-tab-content]');

  function applyTab(tab) {
    setState({ tab });

    buttons.forEach(b => b.classList.remove('active'));

    const activeBtn = Array.from(buttons).find(b => b.dataset.tab === tab);
    if (activeBtn) activeBtn.classList.add('active');

    contents.forEach(c => c.style.display = 'none');

    const target = Array.from(contents).find(c => c.dataset.tabContent === tab);
    if (target) target.style.display = '';

    const { lang } = getState();

    if (header) {
      header.textContent = tabNames[tab]?.[lang] || tab;

      // Restartar animação do título a cada troca de aba
      header.style.animation = 'none';
      header.offsetWidth; // força reflow
      header.style.animation = '';
    }

    window.history.pushState({}, '', `?tab=${tab}`);
  }

  buttons.forEach(btn => {
    if (btn.classList.contains('disabled')) return;
    btn.addEventListener('click', () => {
      applyTab(btn.getAttribute('data-tab'));
    });
  });

  const params = new URLSearchParams(window.location.search);
  const initialTab = params.get('tab') || 'feed';

  applyTab(initialTab);

  return { applyTab };
}