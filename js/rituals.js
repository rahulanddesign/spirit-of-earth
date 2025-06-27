function showRitual(title, content) {
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = `${content}`;
  if (window.innerWidth <= 768) {
    document.body.classList.remove('menu-open');
  }
}

async function loadRitual(fileName, title, clickedLi) {
  try {
    const response = await fetch(`rituals/${fileName}.html`);
    if (!response.ok) throw new Error('File not found');
    const html = await response.text();
    showRitual(title, html);

    document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
    if (clickedLi) clickedLi.classList.add('active');

    const parentDetails = clickedLi.closest('details');
    document.querySelectorAll('.sidebar details').forEach(d => {
      if (d !== parentDetails) d.removeAttribute('open');
    });
    parentDetails.setAttribute('open', true);
  } catch (err) {
    showRitual(title, `<p><em>Unable to load ritual: ${fileName}.html</em></p>`);
  }
}

window.onload = () => {
  const rituals = document.querySelectorAll('.sidebar li');
  rituals.forEach(ritual => {
    ritual.addEventListener('click', () => {
      const file = ritual.getAttribute('data-file');
      const title = ritual.textContent;
      if (file) {
        loadRitual(file, title, ritual);
      } else {
        showRitual(title, `<p><em>This is a placeholder for: ${title}</em></p>`);
      }
    });
  });

  showRitual("🌱 Spirit of Earth", `
    <div class="quote">
      "Weaving rituals, stories, and elemental consciousness into one scroll of remembrance."
    </div>
    <textarea rows="10" style="width:100%; padding:1rem; font-family:Georgia,serif;"></textarea><br><br>
    <button onclick="alert('Will be shared into sacred space soon')" style="padding:0.5rem 1rem; background:#7b4b2a; color:white; border:none; cursor:pointer;">Share</button>
  `);
};
