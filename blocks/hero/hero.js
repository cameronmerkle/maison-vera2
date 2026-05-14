export default function decorate(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'hero-content';

  rows.forEach((row) => {
    const pic = row.querySelector('picture');
    if (pic) {
      block.prepend(pic);
      row.remove();
      return;
    }

    const h1 = row.querySelector('h1');
    if (h1) {
      content.append(h1);
      row.remove();
      return;
    }

    const link = row.querySelector('a');
    if (link) {
      content.append(link.closest('.button-wrapper') || link);
      row.remove();
      return;
    }

    const text = row.textContent.trim();
    if (text) {
      const isShort = text.length < 60 && text === text.toUpperCase();
      if (isShort && !content.querySelector('.hero-eyebrow')) {
        const eyebrow = document.createElement('p');
        eyebrow.className = 'hero-eyebrow';
        eyebrow.textContent = text;
        content.prepend(eyebrow);
      } else {
        const desc = document.createElement('p');
        desc.className = 'hero-description';
        desc.textContent = text;
        content.append(desc);
      }
      row.remove();
    }
  });

  block.append(content);
}
