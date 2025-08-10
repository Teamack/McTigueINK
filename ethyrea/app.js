document.addEventListener("DOMContentLoaded", () => {
    const contentDisplay = document.getElementById("contentDisplay");
    const searchInput = document.getElementById("search");
codex/refine-user-interface-and-experience
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
=======

codex/enhance-user-interface-and-interactivity
    // Category buttons
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        button.addEventListener("click", async (e) => {
=======
    const socket = io('http://localhost:3000');

    socket.on('update', (data) => {
        contentDisplay.innerHTML = `<h3>Live Update</h3><p>${data}</p>`;
    });

    function broadcastUpdate(data) {
        socket.emit('update', data);
    }

    const links = document.querySelectorAll("[data-category]");
    links.forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
main
            const category = e.target.getAttribute("data-category");
main
            await loadCategory(category);
        });
    });

codex/enhance-user-interface-and-interactivity
    // AI generation button
    const aiButton = document.createElement("button");
    aiButton.textContent = "Generate with AI";
    aiButton.id = "aiGenerate";
    aiButton.classList.add("category-btn");
=======
    const aiButton = document.createElement("button");
    aiButton.textContent = "Generate with AI";
    aiButton.id = "aiGenerate";
main
    document.getElementById("navigation").appendChild(aiButton);

    aiButton.addEventListener("click", async () => {
        const promptText = prompt("Enter a prompt for AI (e.g., 'Describe a shadowy Nexus Point'):");
        if (promptText) {
            const generatedContent = await generateWithAI(promptText);
codex/enhance-user-interface-and-interactivity
            contentDisplay.innerHTML = `<h3>AI Generated Content</h3><p>${generatedContent}</p>`;
        }
    });

    // Search functionality
    searchInput.addEventListener("input", async (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 2) {
            await searchContent(query);
        }
    });

    // Load content for a category
=======
            document.getElementById("contentDisplay").innerHTML = `<h3>AI Generated Content</h3><p>${generatedContent}</p>`;
        }
    });

main
    async function loadCategory(category) {
codex/refine-user-interface-and-experience
        const spinner = document.getElementById("loadingSpinner");
        spinner.style.display = "block";
        searchInput.value = ""; // reset previous search
=======
        const basePath = `/ethyrea/${category}/`;
        const fileList = {
            "characters": ["mainProtagonists.json", "antagonists.json"],
            "worldbuilding": ["geography/mountains.json", "flora/magicalPlants.json"],
            "magic": ["leyLines.json", "spells.json"],
            "artifacts": ["artifacts.json"],
            "lore": ["myths.json"]
        };

        contentDisplay.innerHTML = `<h3>Loading ${category}...</h3>`;
main

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
codex/refine-user-interface-and-experience
            applyFade();
=======
            broadcastUpdate(combinedContent);
main
        } catch (error) {
            contentDisplay.innerHTML = `<p>Error loading ${category}: ${error.message}</p>`;
        } finally {
            spinner.style.display = "none";
        }
    }

    // Search content across all files
    async function searchContent(query) {
        const categories = ["characters", "worldbuilding", "magic", "artifacts", "lore"];
        let results = `<h3>Search Results for \"${query}\"</h3><ul>`;
        let hasMatches = false;

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
                    const itemHtml = renderData(file, filteredData);
                    if (itemHtml) {
                        hasMatches = true;
                        results += itemHtml;
                    }
                }
            }
            results += "</ul>";
            contentDisplay.innerHTML = hasMatches ? results : `<p>No results found for \"${query}\".</p>`;
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
codex/refine-user-interface-and-experience
        let html = `<li>
            <button class="toggle-content">${file.replace('.json', '')}</button>
            <div class="content-detail" style="display:none;">`;

        for (const [key, value] of Object.entries(data)) {
            html += `<p><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</p>`;
=======
        const entries = Object.entries(data);
        if (entries.length === 0) {
            return '';
        }
        let html = `<li><h4>${file.replace('.json', '')}</h4><ul>`;
        for (const [key, value] of entries) {
            html += `<li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</li>`;
main
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

async function generateWithAI(prompt) {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY` // Replace with your OpenAI API key
            },
            body: JSON.stringify({
codex/enhance-user-interface-and-interactivity
                model: 'text-davinci-003',
=======
                model: "text-davinci-003", // or "gpt-4" if available
main
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
codex/enhance-user-interface-and-interactivity
        console.error('Error with AI generation:', error);
        return 'An error occurred while generating content.';
=======
        console.error("Error with AI generation:", error);
        return "An error occurred while generating content.";
main
    }
}
