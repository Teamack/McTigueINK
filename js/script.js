import { processRequest } from '../actions/generateContent.js';

document.getElementById('contentForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const action = document.getElementById('action').value;
    const input = document.getElementById('input').value;

    const generatedContent = await processRequest(action, input);

    document.getElementById('result').innerText = generatedContent;
});
