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