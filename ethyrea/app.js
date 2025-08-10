document.addEventListener("DOMContentLoaded", () => {
    const contentDisplay = document.getElementById("contentDisplay");
    const fileList = {
        "characters": ["mainProtagonists.json", "antagonists.json"],
        "worldbuilding": ["geography/mountains.json", "flora/magicalPlants.json"],
        "magic": ["leyLines.json", "spells.json"],
        "artifacts": ["artifacts.json"]
    };

    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const category = btn.getAttribute("data-category");
            await loadCategory(category);
        });
    });

    async function loadCategory(category) {
        const spinner = document.getElementById("loadingSpinner");
        spinner.style.display = "block";

        try {
            const basePath = `/ethyrea/${category}/`;
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
        } finally {
            spinner.style.display = "none";
        }
    }

    function renderData(file, data) {
        let html = `<li>
            <button class="toggle-content">${file.replace('.json', '')}</button>
            <div class="content-detail" style="display:none;">`;

        for (const [key, value] of Object.entries(data)) {
            html += `<p><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</p>`;
        }

        html += `</div></li>`;
        return html;
    }

    // Toggle content visibility
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("toggle-content")) {
            const detail = e.target.nextElementSibling;
            detail.style.display = detail.style.display === "none" ? "block" : "none";
        }
    });
});
