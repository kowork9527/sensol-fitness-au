const ON_CHANGE_DEBOUNCE_TIMER = 300;

const PUB_SUB_EVENTS = {
  cartUpdate: 'cart-update',
  quantityUpdate: 'quantity-update',
  optionValueSelectionChange: 'option-value-selection-change',
  variantChange: 'variant-change',
  cartError: 'cart-error',
};

// Sensol Shipping Page Injector - dynamically loads shipping design on shipping-policy page
// This bypasses Shopify's Liquid compiler cache by using JS asset injection
if (window.location.pathname.includes('/pages/shipping-policy') || window.location.pathname.includes('shipping')) {
  var _sensolScript = document.querySelector('script[src*="constants.js"]');
  if (_sensolScript) {
    var _sensolInjector = document.createElement('script');
    _sensolInjector.src = _sensolScript.src.replace('constants.js', 'sensol-shipping-injector.js');
    _sensolInjector.async = false;
    document.head.appendChild(_sensolInjector);
  }
}
