(() => {
  const apiKey = window.SNIPCART_PUBLIC_API_KEY;
  if (!apiKey) {
    console.warn('Snipcart API key missing. Set SNIPCART_PUBLIC_API_KEY in your environment.');
    return;
  }

  const head = document.head;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.css';
  head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://cdn.snipcart.com/themes/v3.3.3/default/snipcart.js';
  script.defer = true;
  head.appendChild(script);

  const snipcartDiv = document.createElement('div');
  snipcartDiv.hidden = true;
  snipcartDiv.id = 'snipcart';
  snipcartDiv.dataset.apiKey = apiKey;
  document.body.appendChild(snipcartDiv);
})();
