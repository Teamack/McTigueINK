import { processRequest } from '../actions/generateContent.js';

document.getElementById('contentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const action = document.getElementById('action').value;
    const input = document.getElementById('input').value;

    const generatedContent = await processRequest(action, input);

    document.getElementById('result').innerText = generatedContent;
});

async function saveToDatabase(category, data) {
    try {
        const response = await fetch('/saveContent.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, data })
        });

        const result = await response.json();
        if (result.success) {
            alert('Content saved successfully!');
        } else {
            alert('Failed to save content.');
        }
    } catch (error) {
        console.error('Error saving to database:', error);
    }
}

document.getElementById('saveBtn').addEventListener('click', async function () {
    const category = document.getElementById('category').value;
    const data = document.getElementById('result').innerText;
    if (data && data !== 'Your content will appear here.') {
        await saveToDatabase(category, data);
    } else {
        alert('No content to save.');
    }
});
