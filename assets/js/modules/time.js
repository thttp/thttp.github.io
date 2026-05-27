export function initTime() {
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
}  