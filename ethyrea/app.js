document.addEventListener("DOMContentLoaded", () => {
    const contentDisplay = document.getElementById("contentDisplay");
    const searchInput = document.getElementById("search");

    // Category buttons
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        button.addEventListener("click", async (e) => {
            const category = e.target.getAttribute("data-category");
            await loadCategory(category);
        });
    });

    // Search functionality
    searchInput.addEventListener("input", async (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 2) {
            await searchContent(query);
        }
    });

    // Load content for a category
    async function loadCategory(category) {
        const basePath = `/ethyrea/${category}/`;
        const fileList = {
            "characters": ["mainProtagonists.json", "antagonists.json"],
            "worldbuilding": ["geography/mountains.json", "flora/magicalPlants.json"],
            "magic": ["leyLines.json", "spells.json"],
            "artifacts": ["artifacts.json"],
            "lore": ["myths.json"]
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

    // Search content across all files
    async function searchContent(query) {
        const categories = ["characters", "worldbuilding", "magic", "artifacts", "lore"];
        let results = `<h3>Search Results for \"${query}\"</h3><ul>`;

        try {
            for (const category of categories) {
                const basePath = `/ethyrea/${category}/`;
                const fileList = {
                    "characters": ["mainProtagonists.json", "antagonists.json"],
                    "worldbuilding": ["geography/mountains.json", "flora/magicalPlants.json"],
                    "magic": ["leyLines.json", "spells.json"],
                    "artifacts": ["artifacts.json"],
                    "lore": ["myths.json"]
                }[category];

                for (const file of fileList) {
                    const data = await fetch(basePath + file).then(res => res.json());
                    const filteredData = filterData(data, query);
                    results += renderData(file, filteredData);
                }
            }
            results += "</ul>";
            contentDisplay.innerHTML = results || `<p>No results found for \"${query}\".</p>`;
        } catch (error) {
            contentDisplay.innerHTML = `<p>Error during search: ${error.message}</p>`;
        }
    }

    // Filter data by keyword
    function filterData(data, query) {
        const filtered = {};
        for (const [key, value] of Object.entries(data)) {
            if (key.toLowerCase().includes(query) || JSON.stringify(value).toLowerCase().includes(query)) {
                filtered[key] = value;
            }
        }
        return filtered;
    }

    // Render data into HTML
    function renderData(file, data) {
        let html = `<li><h4>${file.replace('.json', '')}</h4><ul>`;
        for (const [key, value] of Object.entries(data)) {
            html += `<li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</li>`;
        }
        html += `</ul></li>`;
        return html;
    }
});
