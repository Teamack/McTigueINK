document.addEventListener("DOMContentLoaded", () => {
    const contentDisplay = document.getElementById("contentDisplay");
    const searchInput = document.getElementById("search");
    const fileList = {
        "characters": [
            "mainProtagonists.json",
            "antagonists/kryss.json",
            "antagonists/veregar.json",
            "antagonists/vorath.json"
        ],
        "worldbuilding": [
            "geography/mountains.json",
            "fauna/mundane_animals.json",
            "fauna/magical_creatures.json"
        ],
        "magic": [
            "leyLines.json",
            "spells/elemental_spells.json",
            "spells/unique_spells.json"
        ],
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
        searchInput.value = ""; // reset previous search

        try {
            const basePath = `${category}/`; // use relative paths to avoid 404s on subdirectories
            const files = fileList[category];
            let combinedContent = `<h3>${category.toUpperCase()}</h3><ul>`;
            for (const file of files) {
                const data = await fetch(basePath + file).then(res => res.json());
                combinedContent += renderData(file, data);
            }
            combinedContent += "</ul>";
            contentDisplay.innerHTML = combinedContent;
            applyFade();
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

    // Search within displayed content
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll("#contentDisplay li").forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(query) ? "" : "none";
        });
    });

    function applyFade() {
        contentDisplay.classList.remove("fade-in");
        // trigger reflow to restart animation
        void contentDisplay.offsetWidth;
        contentDisplay.classList.add("fade-in");
    }

    // apply initial fade
    applyFade();
});
