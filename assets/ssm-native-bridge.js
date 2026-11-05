(() => {
  if (window.sensolNativeBridgeMounted) return;
  window.sensolNativeBridgeMounted = true;
  let active = null;
  const cards = () => [...document.querySelectorAll('[data-rs03-colour],[data-rs03-pro-colour],[data-air-variant]')];
  const cardName = c => c.dataset.rs03Colour || c.dataset.rs03ProColour || c.dataset.airName;
  function show(name) {
    cards().forEach(c => c.setAttribute('aria-pressed', String(cardName(c) === name)));
    document.querySelectorAll('[data-rs03-colour-selected],[data-rs03-pro-colour-selected],[data-air-colour-selected]').forEach(x => x.textContent = name);
  }
  function close(restoreFocus = true) {
    if (!active) return;
    const {root, panel, trigger, overflow, inerted} = active;
    inerted.forEach(node => node.inert = false);
    root.classList.remove('ssm-panel-open');
    panel.removeAttribute('role'); panel.removeAttribute('aria-modal'); panel.removeAttribute('aria-labelledby');
    root.querySelector('.ssm-purchase-backdrop').hidden = true;
    root.querySelector('.purchase').style.minHeight = '';
    document.body.classList.remove('sensol-purchase-open');
    document.body.style.overflow = overflow;
    trigger?.setAttribute('aria-expanded', 'false');
    active = null;
    floating();
    if (restoreFocus && trigger?.isConnected) trigger.focus({preventScroll: true});
  }
  function open(trigger) {
    const root = document.querySelector('product-info.sensol-native-purchase');
    const panel = root?.querySelector('.checkout');
    if (!panel) return;
    if (active) close(false);
    const backdrop = root.querySelector('.ssm-purchase-backdrop');
    const inerted = [];
    let branch = panel;
    while (branch && branch !== document.body) {
      const parent = branch.parentElement;
      if (!parent) break;
      [...parent.children].forEach(node => {
        if (node !== branch && node !== backdrop && !node.inert && !['SCRIPT', 'STYLE', 'LINK'].includes(node.tagName)) {
          node.inert = true; inerted.push(node);
        }
      });
      branch = parent;
    }
    active = {root, panel, trigger, overflow: document.body.style.overflow, inerted};
    root.querySelector('.purchase').style.minHeight = root.querySelector('.purchase').offsetHeight + 'px';
    panel.id = 'SensolPurchasePanel-' + root.dataset.section;
    trigger.setAttribute('aria-controls', panel.id); trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'SensolPurchaseTitle-' + root.dataset.section);
    root.querySelector('.ssm-purchase-backdrop').hidden = false;
    root.classList.add('ssm-panel-open'); document.body.classList.add('sensol-purchase-open');
    panel.scrollTop = 0;
    panel.querySelector('[data-sensol-purchase-close]').focus({preventScroll: true});
  }
  // Capture precedes older story handlers so all products open the same native panel.
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-sensol-purchase-open]');
    if (trigger && document.querySelector('product-info.sensol-native-purchase')) {
      e.preventDefault(); e.stopImmediatePropagation(); open(trigger); return;
    }
    if (e.target.closest('[data-sensol-purchase-close]')) {e.preventDefault(); close(); return;}
    const c = e.target.closest('[data-rs03-colour],[data-rs03-pro-colour],[data-air-variant]');
    if (c) {
      const name = cardName(c);
      const input = [...document.querySelectorAll('product-info.sensol-native-purchase variant-selects input[type=radio]')].find(x => x.value === name);
      show(name); if (input && !input.checked) input.click();
    }
  }, true);
  document.addEventListener('keydown', e => {
    if (!active) return;
    if (e.key === 'Escape') {e.preventDefault(); e.stopImmediatePropagation(); close(); return;}
    if (e.key !== 'Tab') return;
    const nodes = [...active.panel.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select,iframe,[tabindex="0"]')].filter(x => x.getClientRects().length && getComputedStyle(x).visibility !== 'hidden' && x.getBoundingClientRect().width > 2);
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (!first) {e.preventDefault(); return;}
    if (e.shiftKey && (document.activeElement === first || !active.panel.contains(document.activeElement))) {e.preventDefault(); last.focus();}
    else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); first.focus();}
  }, true);
  document.addEventListener('change', e => {
    if (e.target.matches('product-info.sensol-native-purchase variant-selects input[type=radio]')) show(e.target.value);
  });
  document.addEventListener('click', async e => {
    const b = e.target.closest('.sensol-native-purchase [data-share],.sensol-native-purchase #copy-link');
    if (!b) return;
    const url = location.origin + location.pathname;
    try {
      if (b.id === 'copy-link') {await navigator.clipboard.writeText(url); b.setAttribute('aria-label', 'Product link copied');}
      else if (b.dataset.share === 'Share' && navigator.share) await navigator.share({title: document.title, url});
      else if (b.dataset.share === 'Facebook') window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener');
      else if (b.dataset.share === 'Pinterest') window.open('https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(url), '_blank', 'noopener');
    } catch {}
  });
  function initialize() {
    const first = document.querySelector('product-info.sensol-native-purchase variant-selects input:checked');
    if (first) show(first.value);
    floating();
  }
  function floating() {
    const controls = document.querySelector('.sensol-native-purchase .product-form__buttons');
    if (!controls) return;
    const rect = controls.getBoundingClientRect();
    const visible = !active && rect.top < innerHeight * .9 && rect.bottom > 84;
    document.body.classList.toggle('closing-visible', visible);
    document.querySelectorAll('[data-sensol-purchase-open]').forEach(entry => entry.hidden = visible);
  }
  document.addEventListener('shopify:section:unload', e => {if (active && e.target.contains(active.root)) close(false);});
  document.addEventListener('shopify:section:load', initialize);
  addEventListener('load', initialize, {once: true});
  addEventListener('scroll', floating, {passive: true});
  initialize();
})();
