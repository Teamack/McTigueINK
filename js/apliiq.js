(() => {
  const fulfillmentUrl = window.APLIIQ_FULFILLMENT_URL;
  const warehouseUrl = window.APLIIQ_WAREHOUSE_URL;
  if (!fulfillmentUrl || !warehouseUrl) {
    console.warn('Apliiq URLs missing. Set APLIIQ_FULFILLMENT_URL and APLIIQ_WAREHOUSE_URL.');
    return;
  }
  window.ApliiqConfig = { fulfillmentUrl, warehouseUrl };
})();
