function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', {
    timeZone: 'America/Recife',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  document.getElementById('relife-time').textContent = time;
}

updateTime();
setInterval(updateTime, 1000);

document.querySelectorAll('[data-lang]').forEach(flag => {
  flag.addEventListener('click', () => {
    const lang = flag.getAttribute('data-lang');

    document.querySelectorAll('[data-lang]').forEach(f => f.classList.remove('active'));
    flag.classList.add('active');

    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + lang);
    });
  });
});

const avatar = document.querySelector('.avatar');

avatar.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

avatar.addEventListener('dragstart', function(e) {
  e.preventDefault();
});