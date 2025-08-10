document.addEventListener("DOMContentLoaded", () => {
    const contentDisplay = document.getElementById("contentDisplay");

    const links = document.querySelectorAll("[data-category]");
    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const category = e.target.getAttribute("data-category");
            await loadCategory(category);
        });
    });

    async function loadCategory(category) {
        const basePath = `/ethyrea/${category}/`;
        const fileList = {
            "characters": ["mainProtagonists.json", "antagonists.json"],
            "worldbuilding": ["geography/mountains.json", "flora/magicalPlants.json"],
            "magic": ["leyLines.json", "spells.json"],
            "artifacts": ["artifacts.json"]
        };

        contentDisplay.innerHTML = `<h3>Loading ${category}...</h3>`;

        try {
            const files = fileList[category];
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
        let html = `<li><h4>${file.replace('.json', '')}</h4><ul>`;
        for (const [key, value] of Object.entries(data)) {
            html += `<li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</li>`;
        }
        html += `</ul></li>`;
        return html;
    }
});
