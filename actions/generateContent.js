export async function processRequest(action, input) {
    const outline = await fetch('./outline/ethyreaOutline.json').then(res => res.json());

    if (action === 'summarize') {
        return `Summary: ${input.substring(0, 100)}... (rest summarized)`;
    } else if (action === 'elaborate') {
        return `Expanded Content: Based on ${input}, Ethyrea's lore ties closely to ${outline.leyLines.fire}.`;
    } else if (action === 'generateScene') {
        return `Scene Generated: A Nexus Point, ${outline.nexusPoints[0]}, pulses with shadow energy.`;
    }
    return 'Invalid Action';
}
