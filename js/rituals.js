function showRitual(title, content) {
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = `<h1>${title}</h1>${content}`;
  if (window.innerWidth <= 768) {
    document.body.classList.remove('menu-open');
  }
}

async function loadRitual(fileName, title, clickedLi) {
  const response = await fetch(`rituals/${fileName}.html`);
  const html = await response.text();
  showRitual(title, html);

  // Highlight the active ritual
  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
  if (clickedLi) clickedLi.classList.add('active');

  // Keep the details open
  const parentDetails = clickedLi.closest('details');
  document.querySelectorAll('.sidebar details').forEach(d => {
    if (d !== parentDetails) d.removeAttribute('open');
  });
  parentDetails.setAttribute('open', true);
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

  // Load Spirit of Earth default
  showRitual("🌱 Spirit of Earth", \`
    <div class="quote">
      "Weaving rituals, stories, and elemental consciousness into one scroll of remembrance."
    </div>
    <textarea rows="10" style="width:100%; padding:1rem; font-family:Georgia,serif;"></textarea><br><br>
    <button onclick="alert('Will be shared into sacred space soon')" style="padding:0.5rem 1rem; background:#7b4b2a; color:white; border:none; cursor:pointer;">Share</button>
  \`);
};
