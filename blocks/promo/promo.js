export default function decorate(block) {
  const rows = [...block.children];

  const imageCol = document.createElement('div');
  imageCol.className = 'promo-image';

  const copyCol = document.createElement('div');
  copyCol.className = 'promo-copy';

  rows.forEach((row) => {
    const pic = row.querySelector('picture');
    if (pic) {
      imageCol.append(pic);
    }

    const h2 = row.querySelector('h2');
    if (h2) {
      copyCol.append(h2);
    }

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture') || cell.querySelector('h2')) return;

      const link = cell.querySelector('a');
      if (link) {
        copyCol.append(link.closest('.button-wrapper') || link);
        return;
      }

      const text = cell.textContent.trim();
      if (!text) return;

      if (text.length < 60 && text === text.toUpperCase()) {
        const eyebrow = document.createElement('p');
        eyebrow.className = 'promo-eyebrow';
        eyebrow.textContent = text;
        copyCol.prepend(eyebrow);
      } else if (!cell.querySelector('h2')) {
        const desc = document.createElement('p');
        desc.className = 'promo-desc';
        desc.textContent = text;
        copyCol.append(desc);
      }
    });

    row.remove();
  });

  block.append(imageCol);
  block.append(copyCol);
}
