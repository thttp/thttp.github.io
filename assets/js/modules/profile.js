export function initProfile() {
  const avatar = document.querySelector('.avatar');

  if (!avatar) return;

  avatar.addEventListener('contextmenu', e => e.preventDefault());
  avatar.addEventListener('dragstart', e => e.preventDefault());
}