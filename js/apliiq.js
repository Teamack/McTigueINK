(() => {
  const fulfillmentUrl = window.APLIIQ_FULFILLMENT_URL;
  const warehouseUrl = window.APLIIQ_WAREHOUSE_URL;

  if (typeof fulfillmentUrl !== 'string' || typeof warehouseUrl !== 'string') {
    console.warn('Apliiq URLs missing. Set APLIIQ_FULFILLMENT_URL and APLIIQ_WAREHOUSE_URL before loading apliiq.js.');
    return;
  }

  window.ApliiqConfig = { fulfillmentUrl, warehouseUrl };
})();
