// Chatbot functionality
let chatMessages = [];

// Initialize chatbot
document.addEventListener('DOMContentLoaded', function() {
    setupChatbot();
});

function setupChatbot() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    // Enter key to send message
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Auto-focus on input
    messageInput.focus();
}

// Send message function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        addMessage(response, 'bot');
    }, 1500);
}

// Add message to chat
function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    messageElement.className = `message ${sender}-message`;
    messageElement.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-robot'} ${sender === 'bot' ? 'text-pink' : ''}"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble">
                <p>${message}</p>
            </div>
            <span class="message-time">${currentTime}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store message
    window.chatMessages.push({
        message: message,
        sender: sender,
        timestamp: new Date()
    });
}

// Generate AI response (simulated)
function generateAIResponse(userMessage) {
    const responses = {
        'period': [
            "During your menstrual cycle, it's important to stay hydrated and eat iron-rich foods like spinach, lentils, and lean meats. Heat therapy and gentle exercise can help with cramps. 🌸",
            "Period pain is normal, but severe pain isn't. Try yoga, warm baths, and anti-inflammatory foods. If pain is severe, please consult a healthcare provider.",
            "Your period health is important! Track your cycle, eat balanced meals, and don't hesitate to reach out if you notice unusual changes."
        ],
        'headache': [
            "For headaches, try staying hydrated, getting enough sleep, and reducing screen time. Peppermint tea and gentle neck stretches can help. If headaches persist, please see a doctor.",
            "Headaches can be caused by stress, dehydration, or hormonal changes. Try relaxation techniques, ensure you're eating regularly, and consider keeping a headache diary.",
            "Immediate relief: drink water, rest in a dark room, and try a cold compress. For prevention, maintain regular sleep and meal schedules."
        ],
        'food': [
            "Great question about nutrition! Focus on whole foods: leafy greens, fruits, lean proteins, and whole grains. Foods rich in iron, calcium, and omega-3s are especially important for women.",
            "For balanced nutrition, try to include: colorful vegetables, fruits, nuts, seeds, and lean proteins. Limit processed foods and stay hydrated with plenty of water.",
            "Healthy eating tip: Aim for variety in your meals. Include foods rich in folate (leafy greens), calcium (dairy/alternatives), and iron (beans, meat, fortified cereals)."
        ],
        'stress': [
            "Stress management is crucial for overall health. Try deep breathing exercises, meditation, or gentle yoga. Regular exercise and adequate sleep also help manage stress levels.",
            "I understand stress can be overwhelming. Consider talking to someone you trust, practicing mindfulness, or trying creative activities. Remember, it's okay to ask for help.",
            "Stress relief techniques: take short walks, practice gratitude, listen to calming music, or try progressive muscle relaxation. Small steps make a big difference!"
        ],
        'default': [
            "Thank you for sharing that with me. As your wellness companion, I'm here to provide general health information. For specific medical concerns, please consult with a healthcare professional.",
            "I'm here to support your wellness journey! Could you tell me more about what you're experiencing? I can provide general guidance on nutrition, lifestyle, and wellness.",
            "Every woman's health journey is unique. I'm here to provide supportive information and general wellness tips. What specific area would you like to focus on today?",
            "I understand you're looking for guidance. I can help with general wellness, nutrition tips, stress management, and lifestyle advice. What would be most helpful for you right now?"
        ]
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Determine response category
    let category = 'default';
    if (lowerMessage.includes('period') || lowerMessage.includes('menstrual') || lowerMessage.includes('cycle')) {
        category = 'period';
    } else if (lowerMessage.includes('headache') || lowerMessage.includes('head') || lowerMessage.includes('pain')) {
        category = 'headache';
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
        category = 'food';
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('overwhelmed')) {
        category = 'stress';
    }
    
    // Return random response from category
    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

// Quick message function
function sendQuickMessage(message) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = message;
    sendMessage();
}

// Show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.classList.remove('d-none');
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.classList.add('d-none');
}

// Clear chat function
function clearChat() {
    if (confirm('Are you sure you want to clear the chat? This action cannot be undone.')) {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot text-pink"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>Hi there! I'm Priya, your personal wellness companion. 🌸</p>
                        <p>How can I assist you today?</p>
                    </div>
                    <span class="message-time">Just now</span>
                </div>
            </div>
        `;
        window.chatMessages = [];
        MaitriUtils.showToast('Chat cleared successfully!', 'info');
    }
}

// Export chat function (for future use)
function exportChat() {
    const chatData = {
        messages: window.chatMessages,
        exportDate: new Date(),
        user: 'Anonymous User'
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `maitri-chat-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Initialize empty chat messages array
window.chatMessages = [];

console.log('Chatbot initialized successfully!');
