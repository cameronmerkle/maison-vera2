export default function decorate(block) {
  const rows = [...block.children];

  const header = document.createElement('div');
  header.className = 'grid-header';

  const items = document.createElement('div');
  items.className = 'grid-items';

  rows.forEach((row) => {
    const cells = [...row.children];
    const picCells = new Set();
    cells.forEach((c) => {
      if (c.querySelector('picture')) picCells.add(c);
    });

    if (picCells.size >= 1) {
      const card = document.createElement('a');
      card.className = 'product-card';
      card.href = '#';

      const media = document.createElement('div');
      media.className = 'product-media';

      const pics = [...row.querySelectorAll('picture')];
      pics[0].classList.add('main-img');
      media.append(pics[0]);

      if (pics[1]) {
        pics[1].classList.add('alt-img');
        media.append(pics[1]);
      }

      const textValues = [];
      cells.forEach((c) => {
        if (!picCells.has(c)) {
          textValues.push(c.textContent.trim());
        }
      });

      const [name, price, color, badge] = textValues;

      if (badge) {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'product-badge';
        badgeEl.textContent = badge;
        media.append(badgeEl);
      }

      const addBtn = document.createElement('button');
      addBtn.className = 'product-add';
      addBtn.textContent = 'Add to bag';
      media.append(addBtn);

      card.append(media);

      if (name) {
        const nameEl = document.createElement('h3');
        nameEl.className = 'product-name';
        nameEl.textContent = name;
        card.append(nameEl);
      }

      if (price) {
        const priceEl = document.createElement('div');
        priceEl.className = 'product-price';
        priceEl.textContent = price;
        card.append(priceEl);
      }

      if (color) {
        const colorEl = document.createElement('div');
        colorEl.className = 'product-color';
        colorEl.textContent = color;
        card.append(colorEl);
      }

      items.append(card);
    } else {
      const h2 = row.querySelector('h2');
      const link = row.querySelector('a');
      if (h2) header.append(h2);
      if (link) {
        link.className = '';
        header.append(link);
      }
    }

    row.remove();
  });

  if (header.children.length) block.append(header);
  block.append(items);
}
