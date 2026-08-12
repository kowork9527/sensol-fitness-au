// Sensol Shipping Page Injector - bypasses Liquid cache via JS asset injection
(function() {
  if (!window.location.pathname.includes('/pages/shipping-policy') && 
      !window.location.pathname.includes('shipping')) return;
  
  function inject() {
    // Check if already injected
    if (document.getElementById('sensol-shipping-injected')) return;
    
    // CSS
    var style = document.createElement('style');
    style.id = 'sensol-shipping-injected';
    style.textContent = `/* Hide default page content */
  .main-page-title, .rte, .section-main-page-padding,
  .page-width--narrow.section-template--main-padding { display: none !important; }

  /* ── Hero ── */
  .sc-ship-hero {
    background: #1A1816;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    min-height: 70vh;
    display: flex; align-items: flex-end;
    overflow: hidden; position: relative;
  }
  .sc-ship-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 30%, rgba(181,173,164,0.06) 0%, transparent 60%),
                linear-gradient(180deg, rgba(26,24,22,0.4) 0%, rgba(26,24,22,0.9) 100%);
  }
  .sc-ship-hero__inner { position: relative; z-index: 1; width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 3rem 6rem; }
  .sc-ship-hero__kicker { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #B5ADA4; margin-bottom: 1.5rem; }
  .sc-ship-hero__title { font-size: clamp(40px, 7vw, 80px); font-weight: 200; letter-spacing: 0.06em; line-height: 1.05; color: #F7F4F0; margin-bottom: 1.5rem; }
  .sc-ship-hero__sub { font-size: 15px; font-weight: 300; line-height: 1.7; color: rgba(247,244,240,0.55); max-width: 480px; margin-bottom: 3rem; }
  .sc-ship-hero__stats { display: flex; align-items: center; gap: 2.5rem; }
  .sc-ship-hero__stat-num { font-size: 28px; font-weight: 200; letter-spacing: 0.02em; color: #F7F4F0; display: block; line-height: 1; margin-bottom: 0.5rem; }
  .sc-ship-hero__stat-label { font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8279; }
  .sc-ship-hero__stat-divider { width: 1px; height: 36px; background: rgba(212,206,198,0.2); }

  /* ── Common section header ── */
  .sc-ship-sec { background: #F7F4F0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #1A1816; }
  .sc-ship-sec__inner { max-width: 1200px; margin: 0 auto; padding: 6rem 3rem 0; }
  .sc-ship-sec__header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
  .sc-ship-sec__num { font-size: 11px; font-weight: 500; letter-spacing: 0.25em; color: #B5ADA4; }
  .sc-ship-sec__line { flex: 1; height: 1px; background: #D4CEC6; }
  .sc-ship-sec__title { font-size: clamp(28px, 4vw, 44px); font-weight: 200; letter-spacing: 0.06em; line-height: 1.2; margin-bottom: 2rem; }
  .sc-ship-sec__lead { font-size: 15px; font-weight: 300; line-height: 1.8; color: #4A4640; max-width: 700px; margin-bottom: 4rem; }

  /* ── Cards grid ── */
  .sc-ship-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid #D4CEC6; }
  .sc-ship-card { padding: 2.5rem 2rem 3rem; border-right: 1px solid #D4CEC6; }
  .sc-ship-card:last-child { border-right: none; }
  .sc-ship-card__tag { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; color: #B5ADA4; display: block; margin-bottom: 1.25rem; }
  .sc-ship-card__name { font-size: 17px; font-weight: 400; letter-spacing: 0.02em; color: #1A1816; margin-bottom: 0.75rem; }
  .sc-ship-card__text { font-size: 13px; font-weight: 300; line-height: 1.7; color: #8A8279; }
  .sc-ship-card__area { font-size: 13px; font-weight: 300; line-height: 1.6; color: #8A8279; margin-bottom: 0.75rem; }

  /* ── Fees ── */
  .sc-ship-fees__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
  .sc-ship-fees__item { display: flex; gap: 1.5rem; padding: 1.75rem 0; border-bottom: 1px solid #D4CEC6; }
  .sc-ship-fees__item:first-child { padding-top: 0; }
  .sc-ship-fees__item:last-child { border-bottom: none; }
  .sc-ship-fees__item-tag { font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #B5ADA4; flex-shrink: 0; min-width: 70px; padding-top: 3px; }
  .sc-ship-fees__item-title { font-size: 15px; font-weight: 400; color: #1A1816; margin-bottom: 0.5rem; }
  .sc-ship-fees__item-text { font-size: 13px; font-weight: 300; line-height: 1.7; color: #8A8279; }
  .sc-ship-fees__proc { background: #1A1816; padding: 2.5rem 2rem; }
  .sc-ship-fees__proc-label { font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: #B5ADA4; margin-bottom: 1.5rem; }
  .sc-ship-fees__proc-item { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid rgba(212,206,198,0.12); }
  .sc-ship-fees__proc-item:last-child { border-bottom: none; }
  .sc-ship-fees__proc-num { font-size: 11px; font-weight: 500; letter-spacing: 0.15em; color: #B5ADA4; flex-shrink: 0; padding-top: 2px; }
  .sc-ship-fees__proc-item p { font-size: 13px; font-weight: 300; line-height: 1.7; color: rgba(247,244,240,0.7); }
  .sc-ship-fees__proc-item strong { color: #F7F4F0; font-weight: 400; }

  /* ── Dimensions table ── */
  .sc-ship-dim__table-wrap { overflow-x: auto; }
  .sc-ship-dim__table { width: 100%; border-collapse: collapse; }
  .sc-ship-dim__table thead { border-bottom: 1px solid #1A1816; }
  .sc-ship-dim__table th { text-align: left; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8279; padding: 0 0 1rem; }
  .sc-ship-dim__table td { padding: 1.25rem 0; border-bottom: 1px solid #D4CEC6; font-size: 15px; font-weight: 300; color: #8A8279; line-height: 1.5; }
  .sc-ship-dim__table td strong { color: #1A1816; font-weight: 400; }
  .sc-ship-dim__table tr:last-child td { border-bottom: none; }
  .sc-ship-dim__note { font-size: 13px; font-weight: 300; line-height: 1.7; color: #8A8279; margin-top: 2rem; max-width: 700px; }

  /* ── International ── */
  .sc-ship-intl { background: #1A1816; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #F7F4F0; padding: 6rem 0; margin-top: 6rem; }
  .sc-ship-intl__inner { max-width: 1200px; margin: 0 auto; padding: 0 3rem; }
  .sc-ship-intl__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; }
  .sc-ship-intl__col-label { font-size: 10px; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: #B5ADA4; display: block; margin-bottom: 1rem; }
  .sc-ship-intl__col-label--mt { margin-top: 3rem; }
  .sc-ship-intl__col-title { font-size: 24px; font-weight: 200; letter-spacing: 0.04em; color: #F7F4F0; margin-bottom: 1.5rem; }
  .sc-ship-intl__col-text { font-size: 14px; font-weight: 300; line-height: 1.8; color: rgba(247,244,240,0.6); margin-bottom: 1rem; }
  .sc-ship-intl__col-text--muted { margin-top: 1.5rem; }
  .sc-ship-intl__col-text strong { color: #F7F4F0; font-weight: 400; }
  .sc-ship-intl__list { list-style: none; padding: 0; margin: 0; }
  .sc-ship-intl__list li { padding: 0.6rem 0 0.6rem 1.5rem; position: relative; font-size: 14px; font-weight: 300; line-height: 1.7; color: rgba(247,244,240,0.6); border-bottom: 1px solid rgba(212,206,198,0.1); }
  .sc-ship-intl__list li::before { content: '\2014'; position: absolute; left: 0; color: #B5ADA4; }
  .sc-ship-intl__link { color: #F7F4F0; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #B5ADA4; text-decoration-thickness: 0.5px; }

  /* ── Issues steps ── */
  .sc-ship-steps { list-style: none; counter-reset: step; padding: 0; margin: 0 0 1.5rem; }
  .sc-ship-steps li { counter-increment: step; font-size: 13px; font-weight: 300; line-height: 1.7; color: #8A8279; padding: 0.6rem 0 0.6rem 2rem; position: relative; border-bottom: 1px solid #D4CEC6; }
  .sc-ship-steps li:last-child { border-bottom: none; }
  .sc-ship-steps li::before { content: counter(step, decimal-leading-zero); position: absolute; left: 0; top: 0.6rem; font-size: 11px; font-weight: 500; color: #B5ADA4; }
  .sc-ship-note { font-size: 12px; font-weight: 300; line-height: 1.6; color: #8A8279; }

  /* ── Returns ── */
  .sc-ship-returns__body { font-size: 15px; font-weight: 300; line-height: 1.8; color: #8A8279; max-width: 600px; }
  .sc-ship-returns__body p { margin-bottom: 1.25rem; }
  .sc-ship-returns__body p:last-child { margin-bottom: 0; }
  .sc-ship-link { color: #1A1816; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #B5ADA4; text-decoration-thickness: 0.5px; }

  /* ── Header nav colors for dark hero ── */
  [id*="sensol-header"] .sensol-header__logo-text,
  [id*="sensol-header"] .sensol-header__link,
  [id*="sensol-header"] .sensol-header__menu-btn { color: #F7F4F0 !important; }
  [id*="sensol-header"] .sensol-header__link:hover,
  [id*="sensol-header"] .sensol-header__menu-btn:hover { color: #B5ADA4 !important; }
  [id*="sensol-header"].scrolled .sensol-header__logo-text,
  [id*="sensol-header"].scrolled .sensol-header__link,
  [id*="sensol-header"].scrolled .sensol-header__menu-btn { color: #1A1816 !important; }

  @media (max-width: 768px) {
    .sc-ship-hero { min-height: 60vh; }
    .sc-ship-hero__inner { padding: 0 1.5rem 4rem; }
    .sc-ship-hero__stats { gap: 1.5rem; flex-wrap: wrap; }
    .sc-ship-hero__stat-divider { display: none; }
    .sc-ship-sec__inner { padding: 4rem 1.5rem 0; }
    .sc-ship-cards { grid-template-columns: 1fr; }
    .sc-ship-card { border-right: none; border-bottom: 1px solid #D4CEC6; padding: 2rem 0; }
    .sc-ship-card:last-child { border-bottom: none; }
    .sc-ship-fees__grid { grid-template-columns: 1fr; gap: 3rem; }
    .sc-ship-intl { padding: 4rem 0; margin-top: 4rem; }
    .sc-ship-intl__inner { padding: 0 1.5rem; }
    .sc-ship-intl__grid { grid-template-columns: 1fr; gap: 3rem; }
  }`;
    document.head.appendChild(style);
    
    // HTML
    var container = document.createElement('div');
    container.innerHTML = `<!-- Hero -->
<section class="sc-ship-hero">
  <div class="sc-ship-hero__inner">
    <div class="sc-ship-hero__content">
      <p class="sc-ship-hero__kicker">Delivery &amp; Returns</p>
      <h1 class="sc-ship-hero__title">Shipping<br>Policy</h1>
      <p class="sc-ship-hero__sub">Everything you need to know about delivery, processing times, and returns for Sensol fitness equipment across Australia.</p>
      <div class="sc-ship-hero__stats">
        <div class="sc-ship-hero__stat">
          <span class="sc-ship-hero__stat-num">Free</span>
          <span class="sc-ship-hero__stat-label">Metro Delivery</span>
        </div>
        <div class="sc-ship-hero__stat-divider"></div>
        <div class="sc-ship-hero__stat">
          <span class="sc-ship-hero__stat-num">2&ndash;5</span>
          <span class="sc-ship-hero__stat-label">Business Days</span>
        </div>
        <div class="sc-ship-hero__stat-divider"></div>
        <div class="sc-ship-hero__stat">
          <span class="sc-ship-hero__stat-num">Insured</span>
          <span class="sc-ship-hero__stat-label">Every Shipment</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 01 Domestic -->
<section class="sc-ship-sec">
  <div class="sc-ship-sec__inner">
    <div class="sc-ship-sec__header">
      <span class="sc-ship-sec__num">01</span>
      <div class="sc-ship-sec__line"></div>
    </div>
    <h2 class="sc-ship-sec__title">Domestic Shipping<br>Australia</h2>
    <p class="sc-ship-sec__lead">We ship to all addresses within Australia — metropolitan, regional, and remote. Due to the size and weight of Sensol equipment, all orders are dispatched via specialized heavy-goods courier services. We do not use standard parcel carriers.</p>
    <div class="sc-ship-cards">
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">A</span>
        <h3 class="sc-ship-card__name">Standard Delivery</h3>
        <p class="sc-ship-card__area">Metro areas: Melbourne, Sydney, Brisbane, Adelaide, Perth, Hobart, Canberra, Darwin</p>
        <p class="sc-ship-card__text">2–5 business days. Door-to-door courier with tracking.</p>
      </div>
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">B</span>
        <h3 class="sc-ship-card__name">Regional &amp; Country</h3>
        <p class="sc-ship-card__area">Regional areas across all states and territories</p>
        <p class="sc-ship-card__text">3–9 business days. Delivery times vary by location; remote areas may take longer.</p>
      </div>
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">C</span>
        <h3 class="sc-ship-card__name">Authority to Leave</h3>
        <p class="sc-ship-card__area">All areas, subject to safe location availability</p>
        <p class="sc-ship-card__text">If no one is available, the courier may leave the item at a safe location and photograph as proof. Redelivery may incur additional fees if ATL is not possible.</p>
      </div>
    </div>
  </div>
</section>

<!-- 02 Fees -->
<section class="sc-ship-sec">
  <div class="sc-ship-sec__inner">
    <div class="sc-ship-sec__header">
      <span class="sc-ship-sec__num">02</span>
      <div class="sc-ship-sec__line"></div>
    </div>
    <h2 class="sc-ship-sec__title">Shipping Fees &amp;<br>Order Processing</h2>
    <div class="sc-ship-fees__grid">
      <div>
        <div class="sc-ship-fees__item">
          <span class="sc-ship-fees__item-tag">Metro</span>
          <div>
            <p class="sc-ship-fees__item-title">Victoria, NSW, QLD, SA, WA, TAS, ACT</p>
            <p class="sc-ship-fees__item-text">Free domestic shipping on all Sensol products.</p>
          </div>
        </div>
        <div class="sc-ship-fees__item">
          <span class="sc-ship-fees__item-tag">Regional</span>
          <div>
            <p class="sc-ship-fees__item-title">Regional &amp; remote areas</p>
            <p class="sc-ship-fees__item-text">A shipping surcharge may apply. The exact amount will be displayed at checkout before you complete your purchase.</p>
          </div>
        </div>
        <div class="sc-ship-fees__item">
          <span class="sc-ship-fees__item-tag">Handling</span>
          <div>
            <p class="sc-ship-fees__item-title">No hidden fees</p>
            <p class="sc-ship-fees__item-text">We do not charge separate handling or packaging fees — shipping costs are fully included in the price shown at checkout.</p>
          </div>
        </div>
      </div>
      <div class="sc-ship-fees__proc">
        <p class="sc-ship-fees__proc-label">Order Processing</p>
        <div class="sc-ship-fees__proc-item">
          <span class="sc-ship-fees__proc-num">01</span>
          <p>Orders are processed within <strong>1–2 business days</strong> of payment confirmation.</p>
        </div>
        <div class="sc-ship-fees__proc-item">
          <span class="sc-ship-fees__proc-num">02</span>
          <p>You will receive a tracking notification via email once your order has been dispatched.</p>
        </div>
        <div class="sc-ship-fees__proc-item">
          <span class="sc-ship-fees__proc-num">03</span>
          <p>Delivery times are estimates and may vary due to carrier schedules, weather, or remote location access.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 03 Requirements -->
<section class="sc-ship-sec">
  <div class="sc-ship-sec__inner">
    <div class="sc-ship-sec__header">
      <span class="sc-ship-sec__num">03</span>
      <div class="sc-ship-sec__line"></div>
    </div>
    <h2 class="sc-ship-sec__title">Delivery<br>Requirements</h2>
    <div class="sc-ship-cards">
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">01</span>
        <h3 class="sc-ship-card__name">Physical address required</h3>
        <p class="sc-ship-card__text">We cannot deliver to PO boxes or parcel lockers. Please provide a valid street address at checkout.</p>
      </div>
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">02</span>
        <h3 class="sc-ship-card__name">Recipient availability</h3>
        <p class="sc-ship-card__text">Our products are heavy and require someone to receive the delivery. Arrange delivery for when you or a trusted person will be home.</p>
      </div>
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">03</span>
        <h3 class="sc-ship-card__name">Signature option</h3>
        <p class="sc-ship-card__text">If you require a mandatory signature on delivery, please contact us before placing your order. A $5 surcharge applies per order.</p>
      </div>
    </div>
  </div>
</section>

<!-- 04 Dimensions -->
<section class="sc-ship-sec">
  <div class="sc-ship-sec__inner">
    <div class="sc-ship-sec__header">
      <span class="sc-ship-sec__num">04</span>
      <div class="sc-ship-sec__line"></div>
    </div>
    <h2 class="sc-ship-sec__title">Product Dimensions<br>&amp; Weight</h2>
    <div class="sc-ship-dim__table-wrap">
      <table class="sc-ship-dim__table">
        <thead><tr><th>Product</th><th>Dimensions (L &times; W &times; H)</th><th>Weight</th></tr></thead>
        <tbody>
          <tr><td><strong>Sensol FLEX AIR</strong></td><td>65" &times; 24" &times; 17"</td><td>55 lb (25 kg)</td></tr>
          <tr><td><strong>Sensol FLEX</strong></td><td>72.8" &times; 24.3" &times; 17.3"</td><td>70.5 lb (32 kg)</td></tr>
          <tr><td><strong>Sensol FLEX PRO</strong></td><td>75.6" &times; 25.2" &times; 17.8"</td><td>81.6 lb (37 kg)</td></tr>
          <tr><td><strong>Sensol RS02</strong></td><td>75" &times; 25" &times; 18"</td><td>100 lb (45 kg)</td></tr>
          <tr><td><strong>Sensol RS02 PRO</strong></td><td>75" &times; 25" &times; 18"</td><td>100 lb (45 kg)</td></tr>
          <tr><td><strong>Sensol RS03</strong></td><td>75" &times; 25" &times; 18"</td><td>100 lb (45 kg)</td></tr>
          <tr><td><strong>Sensol RS03 PRO</strong></td><td>75" &times; 25" &times; 18"</td><td>100 lb (45 kg)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sc-ship-dim__note">If you order more than one product, each item will be shipped separately with its own tracking number. We do not combine shipments for multiple orders.</p>
  </div>
</section>

<!-- International -->
<section class="sc-ship-intl">
  <div class="sc-ship-intl__inner">
    <div class="sc-ship-intl__grid">
      <div>
        <span class="sc-ship-intl__col-label">International</span>
        <h3 class="sc-ship-intl__col-title">New Zealand</h3>
        <p class="sc-ship-intl__col-text">We are currently <strong>not shipping to New Zealand</strong>. New Zealand delivery will be available in the future as we expand our international operations.</p>
        <p class="sc-ship-intl__col-text sc-ship-intl__col-text--muted">When available:</p>
        <ul class="sc-ship-intl__list">
          <li>International courier with full tracking</li>
          <li>Estimated delivery: 5–10 business days</li>
          <li>Duty threshold: NZD 1,000 — orders below this are free of import duty</li>
          <li>Shipping fees displayed at checkout before purchase</li>
        </ul>
      </div>
      <div>
        <span class="sc-ship-intl__col-label">International</span>
        <h3 class="sc-ship-intl__col-title">Other Countries</h3>
        <p class="sc-ship-intl__col-text">We do not currently ship to countries other than Australia. International shipping options may be added in the future. Please <a class="sc-ship-intl__link" href="/pages/contact">contact us</a> if you are outside Australia and interested in our products.</p>
        <span class="sc-ship-intl__col-label sc-ship-intl__col-label--mt">Tracking</span>
        <h3 class="sc-ship-intl__col-title">Order Tracking</h3>
        <p class="sc-ship-intl__col-text">Once dispatched, you will receive an email with your tracking number, a link to track your shipment online, and the estimated delivery date. If you have not received tracking information within 3 business days, please <a class="sc-ship-intl__link" href="/pages/contact">contact us</a>.</p>
      </div>
    </div>
  </div>
</section>

<!-- 05 Issues -->
<section class="sc-ship-sec">
  <div class="sc-ship-sec__inner">
    <div class="sc-ship-sec__header">
      <span class="sc-ship-sec__num">05</span>
      <div class="sc-ship-sec__line"></div>
    </div>
    <h2 class="sc-ship-sec__title">Delivery<br>Issues</h2>
    <div class="sc-ship-cards">
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">A</span>
        <h3 class="sc-ship-card__name">Missed Delivery</h3>
        <ol class="sc-ship-steps">
          <li>Attempt redelivery within the next 1–2 business days</li>
          <li>If redelivery fails, hold the item at a local depot for collection</li>
        </ol>
        <p class="sc-ship-note">Contact the courier directly using your tracking number to arrange redelivery or depot collection.</p>
      </div>
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">B</span>
        <h3 class="sc-ship-card__name">Damaged Delivery</h3>
        <ol class="sc-ship-steps">
          <li>Take photographs of the damage immediately</li>
          <li>Contact us within 48 hours of receiving the delivery</li>
          <li>Keep all original packaging materials</li>
          <li>Do not attempt to use the damaged product</li>
        </ol>
        <p class="sc-ship-note">We will arrange a replacement or repair based on the nature of the damage.</p>
      </div>
      <div class="sc-ship-card">
        <span class="sc-ship-card__tag">C</span>
        <h3 class="sc-ship-card__name">Lost Delivery</h3>
        <ol class="sc-ship-steps">
          <li>Check with neighbours or building management</li>
          <li>Contact the courier directly to investigate</li>
          <li>If unresolved after 5 business days, contact us and we will file a carrier investigation</li>
        </ol>
        <p class="sc-ship-note">For heavy-goods courier services, compensation for lost shipments is limited. We will work with you and the carrier to resolve any delivery issues as quickly as possible.</p>
      </div>
    </div>
  </div>
</section>

<!-- 06 Returns -->
<section class="sc-ship-sec">
  <div class="sc-ship-sec__inner" style="padding-bottom: 8rem;">
    <div class="sc-ship-sec__header">
      <span class="sc-ship-sec__num">06</span>
      <div class="sc-ship-sec__line"></div>
    </div>
    <h2 class="sc-ship-sec__title">Returns &amp;<br>Exchanges</h2>
    <div class="sc-ship-returns__body">
      <p>For information about returns and exchanges, please see our <a class="sc-ship-link" href="/policies/refund-policy">Refund Policy</a>.</p>
      <p>For any shipping-related questions, contact <a class="sc-ship-link" href="mailto:support@sensolfitness.com.au">support@sensolfitness.com.au</a> — response within 1 business day.</p>
    </div>
  </div>
</section>`;
    
    // Find the main content area and insert before it
    var mainContent = document.querySelector('.page-width--narrow, .section-template--main-padding, main .shopify-section');
    if (mainContent) {
      mainContent.parentNode.insertBefore(container, mainContent);
    } else {
      document.querySelector('main').appendChild(container);
    }
    
    // Hide default page content
    var hideSelectors = ['.main-page-title', '.rte', '.section-main-page-padding', '.page-width--narrow[class*="section-template"]'];
    hideSelectors.forEach(function(sel) {
      var els = document.querySelectorAll(sel);
      els.forEach(function(el) { el.style.display = 'none'; });
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
