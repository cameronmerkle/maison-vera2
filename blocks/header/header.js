const isDesktop = window.matchMedia('(min-width: 900px)');

function buildNavHTML() {
  return `
    <div class="mv-topbar">Complimentary shipping on orders over $200 · 30-day returns</div>
    <div class="mv-header-inner">
      <nav class="mv-nav" aria-label="Primary">
        <a href="/women">Women</a>
        <a href="/men">Men</a>
        <a href="/new">New In</a>
        <a href="/sale">Sale</a>
      </nav>
      <a href="/" class="mv-logo">MAISON VERA</a>
      <div class="mv-icons">
        <button class="mv-hamburger" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 17h18"/></svg>
        </button>
        <button aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <span class="mv-label">Search</span>
        </button>
        <button aria-label="Account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
          <span class="mv-label">Account</span>
        </button>
        <button aria-label="Bag">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
          <span class="mv-label">Bag</span>
          <span class="mv-count">0</span>
        </button>
      </div>
    </div>
    <div class="mv-mmenu" aria-hidden="true">
      <div class="mv-mmenu-head">
        <span class="mv-logo" style="font-size:17px;text-align:left">MAISON VERA</span>
        <button class="mv-mmenu-close" aria-label="Close menu">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 5l14 14M19 5L5 19"/></svg>
        </button>
      </div>
      <nav class="mv-mmenu-nav">
        <a href="/women">Women</a>
        <a href="/men">Men</a>
        <a href="/new">New In</a>
        <a href="/sale">Sale</a>
      </nav>
    </div>
  `;
}

export default async function decorate(block) {
  block.textContent = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'mv-header';
  wrapper.innerHTML = buildNavHTML();
  block.append(wrapper);

  const hamburger = wrapper.querySelector('.mv-hamburger');
  const mmenu = wrapper.querySelector('.mv-mmenu');
  const mmenuClose = wrapper.querySelector('.mv-mmenu-close');
  const mmenuLinks = wrapper.querySelectorAll('.mv-mmenu-nav a');

  function toggleMenu(open) {
    mmenu.setAttribute('aria-hidden', !open);
    mmenu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu(true));
  mmenuClose.addEventListener('click', () => toggleMenu(false));
  mmenuLinks.forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

  const header = block.closest('header');
  if (header) {
    header.style.height = 'auto';
    const onScroll = () => {
      wrapper.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  isDesktop.addEventListener('change', () => toggleMenu(false));
}
