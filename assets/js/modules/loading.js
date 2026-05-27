export function initLoading() {
  const resumeIframe = document.getElementById('resume-iframe');
  const resumePlaceholder = document.getElementById('resume-placeholder');

  if (!resumeIframe) return;

  resumeIframe.addEventListener('load', () => {
    if (resumePlaceholder) resumePlaceholder.style.display = 'none';
    resumeIframe.style.display = '';
  });
}