export default function decorate(block) {
  const rows = [...block.children];

  const header = document.createElement('div');
  header.className = 'cats-header';

  const grid = document.createElement('div');
  grid.className = 'cats-grid';

  rows.forEach((row) => {
    const pic = row.querySelector('picture');

    if (pic) {
      const cells = [...row.children];
      const textCells = cells.filter((c) => !c.querySelector('picture'));
      const name = textCells[0]?.textContent.trim();
      const href = row.querySelector('a')?.href || '#';

      const tile = document.createElement('a');
      tile.className = 'cat-tile';
      tile.href = href;
      tile.append(pic);

      const label = document.createElement('div');
      label.className = 'cat-label';

      if (name) {
        const nameEl = document.createElement('h3');
        nameEl.className = 'cat-name';
        nameEl.textContent = name;
        label.append(nameEl);
      }

      const linkEl = document.createElement('span');
      linkEl.className = 'cat-link';
      linkEl.textContent = 'Shop now';
      label.append(linkEl);

      tile.append(label);
      grid.append(tile);
    } else {
      const h2 = row.querySelector('h2');
      if (h2) header.append(h2);
    }

    row.remove();
  });

  if (header.children.length) block.append(header);
  block.append(grid);
}
