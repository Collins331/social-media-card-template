const links = [
  { icon: '◎', iconClass: 'instagram', title: 'Instagram', url: 'instagram.com/alexmorgan', active: true },
  { icon: 'in', iconClass: 'linkedin', title: 'LinkedIn', url: 'linkedin.com/in/alexmorgan', active: true },
  { icon: '✦', iconClass: 'portfolio', title: 'My portfolio', url: 'alexmorgan.design', active: true },
  { icon: 'Bē', iconClass: 'behance', title: 'Behance', url: 'behance.net/alexmorgan', active: true }
];

const linkList = document.querySelector('#linkList');
const previewLinks = document.querySelector('#previewLinks');
const nameInput = document.querySelector('#nameInput');
const bioInput = document.querySelector('#bioInput');
const previewName = document.querySelector('#previewName');
const previewBio = document.querySelector('#previewBio');
const toast = document.querySelector('#toast');
let buttonStyle = 'solid';
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

function renderLinks() {
  linkList.innerHTML = links.map((link, index) => `
    <div class="link-row" data-index="${index}">
      <span class="drag-handle" aria-hidden="true">⁝⁝</span>
      <span class="platform-icon ${link.iconClass}">${link.icon}</span>
      <span class="link-info"><span class="link-title">${link.title}</span><span class="link-url">${link.url}</span></span>
      <button class="toggle ${link.active ? 'on' : ''}" aria-label="${link.active ? 'Hide' : 'Show'} ${link.title}" aria-pressed="${link.active}"></button>
      <button class="more" aria-label="More options for ${link.title}">•••</button>
    </div>`).join('');

  previewLinks.innerHTML = links.filter(link => link.active).map(link => `<a class="preview-link ${buttonStyle}" href="#">${link.title}</a>`).join('');

  linkList.querySelectorAll('.toggle').forEach(toggle => toggle.addEventListener('click', (event) => {
    const index = Number(event.currentTarget.closest('.link-row').dataset.index);
    links[index].active = !links[index].active;
    renderLinks();
    showToast(`${links[index].title} ${links[index].active ? 'added to' : 'hidden from'} your page`);
  }));
  linkList.querySelectorAll('.more').forEach(more => more.addEventListener('click', () => showToast('Link options are coming soon')));
}

renderLinks();

nameInput.addEventListener('input', () => { previewName.firstChild.textContent = nameInput.value || 'Your name'; });
bioInput.addEventListener('input', () => { previewBio.textContent = bioInput.value || 'Add a little something about yourself.'; });

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  document.querySelector('#linksPanel').classList.toggle('hidden', tab.dataset.tab !== 'links');
  document.querySelector('#appearancePanel').classList.toggle('hidden', tab.dataset.tab !== 'appearance');
}));

document.querySelector('#addLinkButton').addEventListener('click', () => {
  links.push({ icon: '↗', iconClass: 'portfolio', title: 'New link', url: 'your-link.com', active: true });
  renderLinks();
  showToast('New link added');
});

document.querySelectorAll('.theme-swatch').forEach(swatch => swatch.addEventListener('click', () => {
  document.querySelectorAll('.theme-swatch').forEach(item => item.classList.remove('selected'));
  swatch.classList.add('selected');
  const theme = swatch.dataset.theme;
  const screen = document.querySelector('#phoneScreen');
  const themes = { paper: ['#e4ecdb', '#566354'], ink: ['#2c3730', '#e4eee0'], citrus: ['#eff0b0', '#596008'], blush: ['#f2d7d0', '#765c57'] };
  screen.style.background = themes[theme][0];
  screen.querySelector('.preview-bio').style.color = themes[theme][1];
  showToast(`${swatch.querySelector('strong').textContent} theme applied`);
}));

document.querySelectorAll('#buttonStyleControl button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('#buttonStyleControl button').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  buttonStyle = button.dataset.style;
  renderLinks();
}));

document.querySelector('#shareButton').addEventListener('click', async () => {
  const shareData = { title: `${nameInput.value} on pebble`, text: 'Find me on pebble', url: 'https://pebble.to/alexm' };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (error) { if (error.name !== 'AbortError') showToast('Could not open sharing'); }
  } else {
    await navigator.clipboard?.writeText(shareData.url);
    showToast('Your page link is copied');
  }
});

document.querySelector('#downloadCard').addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1500;
  const context = canvas.getContext('2d');
  context.fillStyle = '#e4ecdb';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(158, 176, 143, .17)';
  for (let x = 20; x < canvas.width; x += 36) {
    for (let y = 20; y < canvas.height; y += 36) context.fillRect(x, y, 3, 3);
  }
  context.textAlign = 'center';
  context.fillStyle = '#4d5c49';
  context.font = '700 42px Manrope, sans-serif';
  context.fillText(nameInput.value || 'Your name', canvas.width / 2, 280);
  context.fillStyle = '#667662';
  context.font = '24px Manrope, sans-serif';
  context.fillText('@alexmorgan', canvas.width / 2, 330);
  context.font = '24px Manrope, sans-serif';
  const bio = bioInput.value || 'Add a little something about yourself.';
  context.fillText(bio.slice(0, 48), canvas.width / 2, 395);
  const activeLinks = links.filter(link => link.active);
  activeLinks.forEach((link, index) => {
    const y = 520 + index * 145;
    context.fillStyle = '#ffffff';
    context.roundRect(115, y, 970, 94, 14);
    context.fill();
    context.fillStyle = '#404d3d';
    context.font = '700 28px Manrope, sans-serif';
    context.fillText(`${link.title}  ·  ${link.url}`, canvas.width / 2, y + 58);
  });
  context.fillStyle = '#8d9e88';
  context.font = '18px monospace';
  context.fillText('pebble.to/alexm', canvas.width / 2, 1410);
  const link = document.createElement('a');
  link.download = 'alex-morgan-pebble-card.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('Your card is downloading');
});

document.querySelector('#profileButton').addEventListener('click', () => showToast('Profile menu is coming soon'));
document.querySelector('#avatarUpload').addEventListener('click', () => showToast('Photo uploads are coming soon'));
const helpModal = document.querySelector('#helpModal');
document.querySelector('#helpButton').addEventListener('click', () => helpModal.classList.remove('hidden'));
document.querySelector('#closeHelp').addEventListener('click', () => helpModal.classList.add('hidden'));
document.querySelector('#modalDone').addEventListener('click', () => helpModal.classList.add('hidden'));
helpModal.addEventListener('click', (event) => { if (event.target === helpModal) helpModal.classList.add('hidden'); });
