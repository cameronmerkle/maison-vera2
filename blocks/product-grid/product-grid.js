import ProductList from '@dropins/storefront-recommendations/containers/ProductList.js';
import { render as provider } from '@dropins/storefront-recommendations/render.js';
import '../../scripts/initializers/recommendations.js';

export default async function decorate(block) {
  const rows = [...block.children];

  let heading = 'New Arrivals';
  let viewAllHref = '/new';

  rows.forEach((row) => {
    const h2 = row.querySelector('h2');
    const link = row.querySelector('a');
    if (h2) heading = h2.textContent.trim();
    if (link) viewAllHref = link.href;
    row.remove();
  });

  const header = document.createElement('div');
  header.className = 'grid-header';
  header.innerHTML = `
    <h2>${heading}</h2>
    <a href="${viewAllHref}">View all</a>
  `;
  block.append(header);

  const listEl = document.createElement('div');
  listEl.className = 'grid-dropin';
  block.append(listEl);

  provider.render(ProductList, {
    recId: 'mv-new-arrivals',
    currentSku: 'homepage',
    hideHeading: true,
    routeProduct: (item) => `/${item.urlKey}`,
  })(listEl);
}
