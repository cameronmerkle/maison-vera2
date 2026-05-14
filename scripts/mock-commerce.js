const PRODUCT_DETAILS = {
  'MV-001': {
    name: 'Halden Wool Coat',
    urlKey: 'halden-wool-coat',
    shortDescription: 'A refined overcoat in Italian wool, cut for an easy drape through the shoulders.',
    description: '<p>The Halden is our foundational outerwear piece — a single-breasted coat in double-faced Italian wool. Unlined for lightness, with hand-finished seams and horn buttons. Designed to layer over knitwear through autumn and into early spring.</p><p>Made in Florence by a family-run atelier we have worked with since 2019.</p>',
    img: '/drafts/img/product-01.jpg',
    imgAlt: '/drafts/img/product-01b.jpg',
    price: 480,
  },
  'MV-002': {
    name: 'Silk Slip Dress',
    urlKey: 'silk-slip-dress',
    shortDescription: 'Heavy sand-washed silk with a bias cut that skims without clinging.',
    description: '<p>Cut on the bias from heavy sand-washed silk woven in Como. The weight gives it structure while the cut lets it move. Adjustable straps, French seams throughout, and a deep side slit.</p>',
    img: '/drafts/img/product-02.jpg',
    imgAlt: '/drafts/img/product-02b.jpg',
    price: 220,
  },
  'MV-003': {
    name: 'Pleated Trouser',
    urlKey: 'pleated-trouser',
    shortDescription: 'A single-pleat trouser in virgin wool flannel with a relaxed, tapered leg.',
    description: '<p>Our signature trouser — double-pleated, high-waisted, and tapered to a clean break at the ankle. Made from Italian virgin wool flannel with a soft hand and natural drape. Half-lined for structure through the hip.</p>',
    img: '/drafts/img/product-03.jpg',
    imgAlt: '/drafts/img/product-03b.jpg',
    price: 180,
  },
  'MV-004': {
    name: 'Leather Loafer',
    urlKey: 'leather-loafer',
    shortDescription: 'Vegetable-tanned calf leather with a hand-stitched apron and leather sole.',
    description: '<p>A penny loafer built on a rounded last for comfort. Vegetable-tanned calf leather from a Tuscan tannery, hand-stitched apron, and Blake-stitched leather sole. They will patina beautifully with wear.</p>',
    img: '/drafts/img/product-04.jpg',
    imgAlt: '/drafts/img/product-04b.jpg',
    price: 240,
  },
  'MV-005': {
    name: 'Cashmere Crewneck',
    urlKey: 'cashmere-crewneck',
    shortDescription: 'Grade-A Mongolian cashmere, knitted in Scotland with a relaxed gauge.',
    description: '<p>A classic crewneck in 2-ply Grade-A Mongolian cashmere, knitted at a relaxed 7-gauge for visible texture and warmth without bulk. Ribbed cuffs and hem, saddle shoulder construction.</p>',
    img: '/drafts/img/product-05.jpg',
    imgAlt: '/drafts/img/product-05b.jpg',
    price: 195,
  },
  'MV-006': {
    name: 'Cotton Poplin Shirt',
    urlKey: 'cotton-poplin-shirt',
    shortDescription: 'Crisp Egyptian cotton poplin with a relaxed collar and clean placket.',
    description: '<p>A clean, slightly oversized shirt in 120/2 Egyptian cotton poplin. Single-needle stitching, mother-of-pearl buttons, a soft collar that rolls naturally. The kind of white shirt you reach for every week.</p>',
    img: '/drafts/img/product-06.jpg',
    imgAlt: '/drafts/img/product-06b.jpg',
    price: 145,
  },
  'MV-007': {
    name: 'Tailored Blazer',
    urlKey: 'tailored-blazer',
    shortDescription: 'A half-lined blazer in crease-resistant wool-mohair, slightly nipped at the waist.',
    description: '<p>A modern blazer in Italian wool-mohair with a natural shoulder and nipped waist. Half-lined in cupro for breathability. Functioning surgeon cuffs, patch pockets, and a single vent. Pairs with the Pleated Trouser or denim.</p>',
    img: '/drafts/img/product-07.jpg',
    imgAlt: '/drafts/img/product-07b.jpg',
    price: 380,
  },
  'MV-008': {
    name: 'Wide-leg Denim',
    urlKey: 'wide-leg-denim',
    shortDescription: 'Japanese selvedge denim with a high rise and wide, straight leg.',
    description: '<p>Cut from 13.5 oz Japanese selvedge denim — raw indigo that will fade with wear. High-waisted with a wide, straight leg that sits clean over boots or loafers. Copper rivets, chain-stitched hems.</p>',
    img: '/drafts/img/product-08.jpg',
    imgAlt: '/drafts/img/product-08b.jpg',
    price: 165,
  },
};

function buildPdpProduct(sku) {
  const detail = PRODUCT_DETAILS[sku];
  if (!detail) return null;
  return {
    __typename: 'SimpleProductView',
    id: sku,
    sku,
    name: detail.name,
    urlKey: detail.urlKey,
    url: `/products/${detail.urlKey}/${sku}`,
    inStock: true,
    lowStock: false,
    addToCartAllowed: true,
    shortDescription: detail.shortDescription,
    description: detail.description,
    images: [
      {
        url: detail.img,
        label: detail.name,
        roles: ['image', 'small_image', 'thumbnail'],
        width: 960,
        height: 1191,
      },
      {
        url: detail.imgAlt,
        label: `${detail.name} — alternate view`,
        roles: ['image'],
        width: 960,
        height: 1191,
      },
    ],
    attributes: [
      {
        name: 'material',
        label: 'Material',
        value: 'See description',
        roles: ['visible_in_pdp'],
      },
    ],
    options: [],
    price: {
      final: {
        amount: {
          value: detail.price,
          currency: 'USD',
        },
      },
      regular: {
        amount: {
          value: detail.price,
          currency: 'USD',
        },
      },
    },
    priceRange: {
      minimum: {
        final: {
          amount: {
            value: detail.price,
            currency: 'USD',
          },
        },
        regular: {
          amount: {
            value: detail.price,
            currency: 'USD',
          },
        },
      },
      maximum: {
        final: {
          amount: {
            value: detail.price,
            currency: 'USD',
          },
        },
        regular: {
          amount: {
            value: detail.price,
            currency: 'USD',
          },
        },
      },
    },
  };
}

function buildPdpResponse(sku) {
  const product = buildPdpProduct(sku);
  if (!product) return { data: { productSearch: { items: [] } } };
  return {
    data: {
      productSearch: {
        items: [{
          productView: product,
        }],
      },
    },
  };
}

const MOCK_RECS_ITEMS = Object.keys(PRODUCT_DETAILS).map((sku) => {
  const d = PRODUCT_DETAILS[sku];
  return {
    uid: sku,
    sku,
    name: d.name,
    urlKey: d.urlKey,
    images: [{
      label: d.name,
      url: d.img,
      roles: ['image'],
    }],
    price: {
      final: {
        amount: {
          value: d.price,
          currency: 'USD',
        },
      },
    },
    visibility: 'Catalog',
    queryType: 'primary',
    itemType: 'SimpleProductView',
    __typename: 'SimpleProductView',
  };
});

const MOCK_RECS = {
  data: {
    recommendationsByUnitIds: {
      results: [{
        displayOrder: 0,
        storefrontLabel: 'New Arrivals',
        productsView: MOCK_RECS_ITEMS,
        totalProducts: MOCK_RECS_ITEMS.length,
        typeId: 'most-viewed',
        unitId: 'mv-new-arrivals',
        unitName: 'New Arrivals',
      }],
      totalResults: 1,
    },
  },
};

const EMPTY_RESPONSE = { data: {} };

function extractSkuFromQuery(url, body) {
  const skuMatch = body?.match(/"sku"\s*:\s*"([^"]+)"/)
    || url.match(/sku["%3A:]+([A-Z]+-\d+)/i);
  return skuMatch?.[1] || null;
}

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
    let body = '';
    if (init?.body && typeof init.body === 'string') {
      body = init.body;
    } else if (resource instanceof Request) {
      try { body = await resource.clone().text(); } catch { /* empty */ }
    }

    const isRecsQuery = url.includes('ecommend') || body.includes('ecommend');
    if (isRecsQuery) {
      return new Response(JSON.stringify(MOCK_RECS), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const isPdpQuery = body.includes('productSearch') || url.includes('productSearch');
    if (isPdpQuery) {
      const sku = extractSkuFromQuery(url, body);
      return new Response(JSON.stringify(buildPdpResponse(sku)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(EMPTY_RESPONSE), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return originalFetch(resource, init);
};

window.adobeDataLayer = window.adobeDataLayer || [];
window.adobeDataLayer.push({
  pageContext: {
    pageType: 'CMS',
    pageName: 'Home',
  },
});

export { PRODUCT_DETAILS };
