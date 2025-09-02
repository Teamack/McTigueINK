(() => {
  const keys = Object.keys(window).filter(k => /^CREATIVEHUB_.+_URL$/.test(k));
  if (keys.length === 0) {
    console.warn('Creative Hub URLs missing. Define CREATIVEHUB_*_URL variables before loading creativehub.js.');
    return;
  }
  window.CreativeHubConfig = keys.reduce((cfg, key) => {
    cfg[key] = window[key];
    return cfg;
  }, {});
})();
