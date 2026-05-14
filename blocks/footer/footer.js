function buildFooterHTML() {
  return `
    <div class="mv-footer-cols">
      <div class="mv-footer-brand">
        <span class="mv-footer-logo">MAISON VERA</span>
        <p>Considered clothing, made in small batches across Europe.</p>
      </div>
      <div class="mv-footer-col">
        <h5>Shop</h5>
        <ul>
          <li><a href="/women">Women</a></li>
          <li><a href="/men">Men</a></li>
          <li><a href="/accessories">Accessories</a></li>
          <li><a href="/sale">Sale</a></li>
        </ul>
      </div>
      <div class="mv-footer-col">
        <h5>Help</h5>
        <ul>
          <li><a href="/shipping">Shipping</a></li>
          <li><a href="/returns">Returns</a></li>
          <li><a href="/size-guide">Size guide</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="mv-footer-col">
        <h5>About</h5>
        <ul>
          <li><a href="/our-story">Our story</a></li>
          <li><a href="/materials">Materials</a></li>
          <li><a href="/stores">Stores</a></li>
          <li><a href="/careers">Careers</a></li>
        </ul>
      </div>
      <div class="mv-footer-col">
        <h5>Follow</h5>
        <ul>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Pinterest</a></li>
          <li><a href="#">TikTok</a></li>
        </ul>
      </div>
    </div>
    <div class="mv-footer-bottom">
      <span>© 2026 Maison Vera. All rights reserved.</span>
      <div class="mv-footer-links">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/cookies">Cookies</a>
      </div>
    </div>
  `;
}

export default async function decorate(block) {
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'mv-footer';
  footer.innerHTML = buildFooterHTML();
  block.append(footer);
}
