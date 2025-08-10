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

    // AI generation button
    const aiButton = document.createElement("button");
    aiButton.textContent = "Generate with AI";
    aiButton.id = "aiGenerate";
    aiButton.classList.add("category-btn");
    document.getElementById("navigation").appendChild(aiButton);

    aiButton.addEventListener("click", async () => {
        const promptText = prompt("Enter a prompt for AI (e.g., 'Describe a shadowy Nexus Point'):");
        if (promptText) {
            const generatedContent = await generateWithAI(promptText);
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

async function generateWithAI(prompt) {
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY` // Replace with your OpenAI API key
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim();
    } catch (error) {
        console.error('Error with AI generation:', error);
        return 'An error occurred while generating content.';
    }
}
