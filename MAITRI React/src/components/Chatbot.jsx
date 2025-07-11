import { useState, useEffect, useRef } from 'react'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Priya, your personal wellness companion. 🌸\n\nI'm here to help you with:\n• Health and wellness advice\n• Symptom guidance\n• Nutrition recommendations\n• Mental health support\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Only scroll to bottom when new messages are added, not on initial load
    if (messages.length > 1) {
      scrollToBottom()
    }
  }, [messages])

  const generateAIResponse = (userMessage) => {
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
    }

    const lowerMessage = userMessage.toLowerCase()
    let category = 'default'
    
    if (lowerMessage.includes('period') || lowerMessage.includes('menstrual') || lowerMessage.includes('cycle')) {
      category = 'period'
    } else if (lowerMessage.includes('headache') || lowerMessage.includes('head') || lowerMessage.includes('pain')) {
      category = 'headache'
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
      category = 'food'
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('overwhelmed')) {
      category = 'stress'
    }

    const categoryResponses = responses[category]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const sendMessage = () => {
    if (inputMessage.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const sendQuickMessage = (message) => {
    setInputMessage(message)
    setTimeout(() => sendMessage(), 100)
  }

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat? This action cannot be undone.')) {
      setMessages([{
        id: 1,
        text: "Hi there! I'm Priya, your personal wellness companion. 🌸\n\nHow can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      }])
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="container-fluid chat-container">
      <div className="row h-100">
        {/* Chat Sidebar */}
        <div className="col-md-3 chat-sidebar">
          <div className="sidebar-header">
            <div className="ai-avatar">
              <i className="fas fa-robot fa-2x text-pink"></i>
            </div>
            <h5>Priya</h5>
            <p className="text-muted">Your AI Wellness Companion</p>
          </div>
          
          <div className="quick-actions">
            <h6>Quick Actions</h6>
            <div className="action-buttons">
              <button 
                className="btn btn-outline-primary btn-sm mb-2 w-100" 
                onClick={() => sendQuickMessage('Tell me about period health')}
              >
                <i className="fas fa-calendar-alt me-2"></i>Period Health
              </button>
              <button 
                className="btn btn-outline-primary btn-sm mb-2 w-100" 
                onClick={() => sendQuickMessage('I have a headache, what should I do?')}
              >
                <i className="fas fa-head-side-virus me-2"></i>Headache Relief
              </button>
              <button 
                className="btn btn-outline-primary btn-sm mb-2 w-100" 
                onClick={() => sendQuickMessage('Suggest some healthy foods')}
              >
                <i className="fas fa-apple-alt me-2"></i>Nutrition Tips
              </button>
              <button 
                className="btn btn-outline-primary btn-sm mb-2 w-100" 
                onClick={() => sendQuickMessage('I feel stressed, help me')}
              >
                <i className="fas fa-leaf me-2"></i>Stress Management
              </button>
            </div>
          </div>
        </div>

        {/* Chat Main Area */}
        <div className="col-md-9 chat-main">
          <div className="chat-header">
            <div className="d-flex align-items-center">
              <div className="status-indicator online"></div>
              <h5 className="mb-0 ms-2">Chat with Priya</h5>
            </div>
            <button className="btn btn-outline-secondary btn-sm" onClick={clearChat}>
              <i className="fas fa-trash me-2"></i>Clear Chat
            </button>
          </div>

          <div className="chat-messages" id="chatMessages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}-message`}>
                <div className="message-avatar">
                  <i className={`fas ${message.sender === 'user' ? 'fa-user' : 'fa-robot'} ${message.sender === 'bot' ? 'text-pink' : ''}`}></i>
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    {message.text.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message">
                <div className="message-avatar">
                  <i className="fas fa-robot text-pink"></i>
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message to Priya..."
              />
              <button className="btn btn-primary" type="button" onClick={sendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            {isTyping && (
              <div className="typing-indicator-text">
                <small className="text-muted">
                  <i className="fas fa-robot me-1"></i>Priya is typing...
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
