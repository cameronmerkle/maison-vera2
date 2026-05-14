export default function decorate(block) {
  const rows = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.className = 'newsletter-inner';

  rows.forEach((row) => {
    const h2 = row.querySelector('h2');
    if (h2) {
      wrapper.append(h2);
      row.remove();
      return;
    }

    const text = row.textContent.trim();
    if (text && !row.querySelector('picture')) {
      const desc = document.createElement('p');
      desc.className = 'newsletter-desc';
      desc.textContent = text;
      wrapper.append(desc);
      row.remove();
    }
  });

  const form = document.createElement('form');
  form.innerHTML = `
    <input type="email" placeholder="your@email.com" required aria-label="Email address" />
    <button type="submit">Subscribe →</button>
  `;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Welcome ✓';
    setTimeout(() => {
      btn.textContent = 'Subscribe →';
      form.reset();
    }, 2000);
  });

  wrapper.append(form);
  block.textContent = '';
  block.append(wrapper);
}
