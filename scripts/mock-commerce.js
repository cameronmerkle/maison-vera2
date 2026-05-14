const MOCK_PRODUCTS = [
  {
    uid: '1', sku: 'MV-001', name: 'Halden Wool Coat', urlKey: 'halden-wool-coat', images: [{ label: 'Halden Wool Coat', url: '/drafts/img/product-01.jpg', roles: ['image'] }], price: { final: { amount: { value: 480, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
  {
    uid: '2', sku: 'MV-002', name: 'Silk Slip Dress', urlKey: 'silk-slip-dress', images: [{ label: 'Silk Slip Dress', url: '/drafts/img/product-02.jpg', roles: ['image'] }], price: { final: { amount: { value: 220, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
  {
    uid: '3', sku: 'MV-003', name: 'Pleated Trouser', urlKey: 'pleated-trouser', images: [{ label: 'Pleated Trouser', url: '/drafts/img/product-03.jpg', roles: ['image'] }], price: { final: { amount: { value: 180, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
  {
    uid: '4', sku: 'MV-004', name: 'Leather Loafer', urlKey: 'leather-loafer', images: [{ label: 'Leather Loafer', url: '/drafts/img/product-04.jpg', roles: ['image'] }], price: { final: { amount: { value: 240, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
  {
    uid: '5', sku: 'MV-005', name: 'Cashmere Crewneck', urlKey: 'cashmere-crewneck', images: [{ label: 'Cashmere Crewneck', url: '/drafts/img/product-05.jpg', roles: ['image'] }], price: { final: { amount: { value: 195, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
  {
    uid: '6', sku: 'MV-006', name: 'Cotton Poplin Shirt', urlKey: 'cotton-poplin-shirt', images: [{ label: 'Cotton Poplin Shirt', url: '/drafts/img/product-06.jpg', roles: ['image'] }], price: { final: { amount: { value: 145, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
  {
    uid: '7', sku: 'MV-007', name: 'Tailored Blazer', urlKey: 'tailored-blazer', images: [{ label: 'Tailored Blazer', url: '/drafts/img/product-07.jpg', roles: ['image'] }], price: { final: { amount: { value: 380, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
  {
    uid: '8', sku: 'MV-008', name: 'Wide-leg Denim', urlKey: 'wide-leg-denim', images: [{ label: 'Wide-leg Denim', url: '/drafts/img/product-08.jpg', roles: ['image'] }], price: { final: { amount: { value: 165, currency: 'USD' } } }, visibility: 'Catalog', queryType: 'primary', itemType: 'SimpleProductView',
  },
];

const MOCK_RECS = {
  data: {
    recommendationsByUnitIds: {
      results: [{
        displayOrder: 0,
        storefrontLabel: 'New Arrivals',
        productsView: MOCK_PRODUCTS.map((p) => ({
          ...p,
          __typename: 'SimpleProductView',
        })),
        totalProducts: MOCK_PRODUCTS.length,
        typeId: 'most-viewed',
        unitId: 'mv-new-arrivals',
        unitName: 'New Arrivals',
      }],
      totalResults: 1,
    },
  },
};

const EMPTY_RESPONSE = { data: {} };

const originalFetch = window.fetch.bind(window);

window.fetch = async (resource, init) => {
  let url = '';
  if (typeof resource === 'string') {
    url = resource;
  } else if (resource instanceof URL) {
    url = resource.href;
  } else if (resource instanceof Request) {
    url = resource.url;
  } else if (resource?.href || resource?.url) {
    url = resource.href || resource.url;
  }

  if (url.includes('localhost:9999')) {
    const isRecsQuery = url.includes('ecommend') || (init?.body && typeof init.body === 'string' && init.body.includes('ecommend'));
    const payload = isRecsQuery ? MOCK_RECS : EMPTY_RESPONSE;
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return originalFetch(resource, init);
};

export { MOCK_PRODUCTS };
