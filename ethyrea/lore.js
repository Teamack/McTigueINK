document.addEventListener("DOMContentLoaded", async () => {
  const contentDisplay = document.getElementById("contentDisplay");

  // Load category mapping
  const categories = await fetch("./categories.json").then(res => res.json());

  const links = document.querySelectorAll("[data-category]");
  links.forEach(link => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const category = e.target.getAttribute("data-category");
      await loadCategory(category);
    });
  });

  async function loadCategory(category) {
    const basePath = `./${category}/`;
    const files = categories[category] || [];

    contentDisplay.innerHTML = `<h3>Loading ${category}...</h3>`;

    try {
      let combinedContent = `<h3>${category.toUpperCase()}</h3><ul>`;
      for (const file of files) {
        const data = await fetch(basePath + file).then(res => res.json());
        combinedContent += renderData(file, data);
      }
      combinedContent += "</ul>";
      contentDisplay.innerHTML = combinedContent;
    } catch (error) {
      contentDisplay.innerHTML = `<p>Error loading ${category}: ${error.message}</p>`;
    }
  }

  function renderData(file, data) {
    const displayName = file.replace(/Data\.json$/, '').replace('.json', '');
    let html = `<li><h4>${displayName}</h4><ul>`;
    for (const [key, value] of Object.entries(data)) {
      html += `<li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</li>`;
    }
    html += `</ul></li>`;
    return html;
  }
});
