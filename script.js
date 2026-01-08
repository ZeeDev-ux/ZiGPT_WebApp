/* script.js */
const SCRIPT_URL = "APKA_GOOGLE_SCRIPT_URL_HERE"; // Apka URL yahan paste karein

function autoGrow(el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    // Reset Input
    input.value = '';
    input.style.height = "auto";
    document.getElementById('welcome').style.display = 'none';

    // Add User Message
    addBubble(text, 'user');
    
    // Add Thinking Bubble
    const botDiv = addBubble('ZiGPT is thinking...', 'bot');

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: text }] }]
            })
        });

        const data = await response.json();
        const botText = data.candidates[0].content.parts[0].text;
        
        // Render with Markdown support
        botDiv.innerHTML = marked.parse(botText);
    } catch (err) {
        botDiv.innerText = "Error: Backend Not Connected Apis.";
    }
}

function addBubble(content, role) {
    const chatWin = document.getElementById('chatWindow');
    const row = document.createElement('div');
    row.className = `message-row ${role === 'bot' ? 'bot-row' : 'user-row'}`;
    
    const avatarClass = role === 'bot' ? 'bot-avatar' : 'user-avatar';
    const avatarText = role === 'bot' ? 'Zi' : 'U';

    row.innerHTML = `
        <div class="message-content">
            <div class="avatar ${avatarClass}">${avatarText}</div>
            <div class="text-content">${content}</div>
        </div>
    `;
    
    chatWin.appendChild(row);
    chatWin.scrollTop = chatWin.scrollHeight;
    return row.querySelector('.text-content');
}

document.getElementById('sendBtn').onclick = sendMessage;

window.toggleSidebar = () => {
    // Mobile sidebar toggle logic can be added here
};

window.resetChat = () => location.reload();
