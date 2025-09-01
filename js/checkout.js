document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.checkout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.Snipcart) {
        window.Snipcart.api.theme.cart.open();
      } else {
        console.warn('Snipcart has not loaded.');
      }
    });
  });
});
