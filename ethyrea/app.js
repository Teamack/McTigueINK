document.addEventListener("DOMContentLoaded", async () => {
    const contentDisplay = document.getElementById("contentDisplay");
    const searchInput = document.getElementById("search");

    // Load category mapping
    const categories = await fetch("./categories.json").then(res => res.json());

    // Attach handler to category links
    document.querySelectorAll("[data-category]").forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const category = link.getAttribute("data-category");
            await loadCategory(category);
        });
    });

    // Websocket setup for live updates
    const socket = io('http://localhost:3000');
    socket.on('update', (data) => {
        contentDisplay.innerHTML = `<h3>Live Update</h3><p>${data}</p>`;
    });
    function broadcastUpdate(data) {
        socket.emit('update', data);
    }

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
        } else {
            document.querySelectorAll("#contentDisplay > ul > li").forEach(li => {
                li.style.display = li.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        }
    });

    // Load content for a category
    async function loadCategory(category) {
        const spinner = document.getElementById("loadingSpinner");
        if (spinner) spinner.style.display = "block";
        searchInput.value = "";
        contentDisplay.innerHTML = `<h3>Loading ${category}...</h3>`;

        try {
            const basePath = `${category}/`;
            const files = categories[category] || [];
            if (files.length === 0) {
                contentDisplay.innerHTML = `<p>No content available for ${category}.</p>`;
                return;
            }
            let combinedContent = `<h3>${category.toUpperCase()}</h3><ul>`;
            for (const file of files) {
                const data = await fetch(basePath + file).then(res => res.json());
                combinedContent += renderData(file, data);
            }
            combinedContent += "</ul>";
            contentDisplay.innerHTML = combinedContent;
            applyFade();
            broadcastUpdate(combinedContent);
        } catch (error) {
            contentDisplay.innerHTML = `<p>Error loading ${category}: ${error.message}</p>`;
        } finally {
            if (spinner) spinner.style.display = "none";
        }
    }

    // Search content across all files
    async function searchContent(query) {
        const categoriesList = Object.keys(categories);
        let results = `<h3>Search Results for \"${query}\"</h3><ul>`;
        let hasMatches = false;

        try {
            for (const category of categoriesList) {
                const basePath = `${category}/`;
                for (const file of categories[category] || []) {
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
        const entries = Object.entries(data);
        if (entries.length === 0) {
            return '';
        }
        let html = `<li><h4>${file.replace('.json', '')}</h4><ul>`;
        for (const [key, value] of entries) {
            html += `<li><strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</li>`;
        }
        html += `</ul></li>`;
        return html;
    }

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
                'Authorization': `Bearer YOUR_API_KEY`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt,
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

