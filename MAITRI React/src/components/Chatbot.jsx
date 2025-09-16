// Import React hooks and components needed for chatbot
import { useState, useEffect, useRef } from 'react'
import { useUser } from '../context/UserContext'
import ReactMarkdown from 'react-markdown'
import './Chatbot.css'

const Chatbot = () => {
  const { user } = useUser()
  // Initialize chat with welcome message from Maitri
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Maitri, your compassionate AI health companion. 🌸\n\nI'm here to support you through your wellness journey with:\n• Personalized health guidance\n• Women's health expertise\n• Emotional support and understanding\n• Evidence-based wellness advice\n\nHow can I help you feel your best today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false) // Show typing indicator
  const messagesEndRef = useRef(null) // Reference for auto-scrolling to latest message

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Only scroll to bottom when new messages are added, not on initial load
    if (messages.length > 1) {
      scrollToBottom()
    }
  }, [messages])

  // New AI-powered response function
  const getAIResponse = async (userMessage) => {
    try {
      const response = await fetch('http://localhost:8080/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          userId: user?.email || 'anonymous',
          timestamp: Date.now()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.message
    } catch (error) {
      console.error('Error getting AI response:', error)
      return "Hi! I'm having some connectivity issues, but I'm still here to help with wellness guidance! What's on your mind?"
    }
  }

  // Fallback responses for when AI is unavailable
  const generateFallbackResponse = (userMessage) => {
    const responses = {
      'greeting': [
        "Hi there! 😊 How are you feeling today?",
        "Hello! I'm here to help with any health questions you have.",
        "Hey! What's on your mind today?",
        "Hi! How can I support your wellness today?"
      ],
      'headache': [
        "For headache relief, try these steps immediately: 1) Drink a full glass of water, 2) Apply a cold compress to your forehead or warm compress to neck, 3) Rest in a quiet, dark room, 4) Gently massage your temples. This could be from dehydration, stress, eye strain, or hormonal changes. If headaches are severe, frequent, or accompanied by vision changes, see a doctor within 24 hours."
      ],
      'period': [
        "For period pain relief: 1) Apply heat (heating pad or warm bath), 2) Try gentle yoga or light stretching, 3) Stay hydrated, 4) Consider anti-inflammatory medication if you normally take it. Period pain happens due to uterine contractions from hormone changes. See a doctor if pain is severe enough to interfere with daily activities or if you experience heavy bleeding with large clots."
      ],
      'stomach': [
        "For stomach discomfort: 1) Sip on ginger tea or chew fresh ginger, 2) Try peppermint tea, 3) Eat small, bland foods like crackers or toast, 4) Avoid lying down immediately after eating. This could be from stress, food sensitivity, hormonal changes, or eating too quickly. Consult a doctor if you have persistent pain, vomiting, or symptoms lasting more than 48 hours."
      ],
      'stress': [
        "For immediate stress relief: 1) Try the 4-7-8 breathing technique (inhale for 4, hold for 7, exhale for 8), 2) Practice grounding - name 5 things you can see, 4 you can touch, 3 you can hear, 3) Step outside for fresh air if possible, 4) Do gentle stretching. Stress affects your body through hormone release. If anxiety is interfering with sleep, work, or daily life, consider speaking with a counselor or doctor."
      ],
      'fatigue': [
        "For fatigue relief: 1) Ensure you're drinking enough water, 2) Try a 10-15 minute walk in natural light, 3) Eat a balanced snack with protein and complex carbs, 4) Check if you're getting 7-9 hours of sleep. Fatigue can result from iron deficiency, hormonal changes, stress, or poor sleep quality. See a doctor if fatigue persists despite adequate rest or if it's accompanied by other concerning symptoms."
      ],
      'sleep': [
        "For better sleep tonight: 1) Keep room cool and dark, 2) Try progressive muscle relaxation, 3) Avoid screens 1 hour before bed, 4) Consider chamomile tea or magnesium supplement if you normally take them. Sleep issues often relate to stress, hormonal fluctuations, or irregular schedules. If sleep problems persist for more than 2 weeks, discuss with a healthcare provider."
      ],
      'pain': [
        "For general pain management: 1) Apply appropriate heat or cold therapy, 2) Try gentle movement or stretching, 3) Stay hydrated, 4) Practice relaxation techniques. Pain can have many causes including muscle tension, inflammation, or stress. If pain is severe, sudden, or doesn't improve with basic care, please see a healthcare provider promptly."
      ],
      'food': [
        "Focus on colorful fruits, leafy greens, lean proteins, and whole grains. Iron, calcium, and omega-3s are especially important for women! 🥗",
        "Healthy eating tip: Include variety, stay hydrated, and don't skip meals. Your body will thank you!"
      ],
      'thanks': [
        "You're so welcome! I'm always here when you need me. 😊",
        "Happy to help! Take care of yourself! 💕",
        "Anytime! Your health and happiness matter. ✨"
      ],
      'default': [
        "I'm here to help with your wellness journey! What would you like to know about?",
        "Tell me more about what you're experiencing. I can provide general health guidance and support.",
        "I'm listening! How can I support your health and wellness today?"
      ]
    }

    const lowerMessage = userMessage.toLowerCase()
    let category = 'default'
    
    // Check for greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/)) {
      category = 'greeting'
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      category = 'thanks'
    } else if (lowerMessage.includes('headache') || lowerMessage.includes('migraine') || lowerMessage.includes('head pain')) {
      category = 'headache'
    } else if (lowerMessage.includes('period') || lowerMessage.includes('menstrual') || lowerMessage.includes('cramp') || lowerMessage.includes('pms')) {
      category = 'period'
    } else if (lowerMessage.includes('stomach') || lowerMessage.includes('nausea') || lowerMessage.includes('digestive') || lowerMessage.includes('bloating')) {
      category = 'stomach'
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('fatigue') || lowerMessage.includes('exhausted') || lowerMessage.includes('energy')) {
      category = 'fatigue'
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes("can't sleep")) {
      category = 'sleep'
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('panic')) {
      category = 'stress'
    } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt') || lowerMessage.includes('ache')) {
      category = 'pain'
    } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet')) {
      category = 'food'
    }

    const categoryResponses = responses[category]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage('')
    setIsTyping(true)

    try {
      // Try to get AI response first
      let aiResponse = await getAIResponse(currentMessage)
      
      // If AI response fails or is empty, use fallback
      if (!aiResponse || aiResponse.trim() === '') {
        aiResponse = generateFallbackResponse(currentMessage)
      }

      const botResponse = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Error in sendMessage:', error)
      // Use fallback response on error
      const botResponse = {
        id: messages.length + 2,
        text: generateFallbackResponse(currentMessage),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const sendQuickMessage = (message) => {
    setInputMessage(message)
    setTimeout(() => sendMessage(), 100)
  }

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat? This action cannot be undone.')) {
      setMessages([{
        id: 1,
        text: "Hi there! I'm Maitri, your personal wellness companion. 🌸\n\nHow can I assist you today?",
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
    <div className="chat-container" style={{width: '100vw', margin: 0, padding: 0}}>
      <div className="row h-100" style={{margin: 0}}>
        {/* Chat Sidebar */}
        <div className="col-md-3 chat-sidebar" style={{backgroundColor: '#ffc0cb', padding: '20px', margin: 0}}>
          <div className="sidebar-header">
            <div className="ai-avatar">
              <i className="fas fa-heart fa-2x text-pink"></i>
            </div>
            <h5>Maitri</h5>
            <p className="text-muted">Your Compassionate AI Health Companion</p>
            <small className="text-muted">Powered by AI • Always here to listen</small>
          </div>
          
          <div className="quick-actions">
            <h6>Quick Actions</h6>
            <div className="action-buttons">
              <button 
                className="btn btn-outline-primary btn-sm mb-2 w-100" 
                onClick={() => sendQuickMessage('I need guidance about my menstrual health and cycle tracking')}
              >
                <i className="fas fa-calendar-alt me-2"></i>Menstrual Health
              </button>
              <button 
                className="btn btn-outline-primary btn-sm mb-2 w-100" 
                onClick={() => sendQuickMessage('I am feeling stressed and overwhelmed. Can you help me?')}
              >
                <i className="fas fa-heart me-2"></i>Emotional Support
              </button>
              <button 
                className="btn btn-outline-primary btn-sm mb-2 w-100" 
                onClick={() => sendQuickMessage('What are some healthy nutrition tips for women my age?')}
              >
                <i className="fas fa-apple-alt me-2"></i>Nutrition Guidance
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
        <div className="col-md-9 chat-main" style={{padding: 0, margin: 0}}>
          <div className="chat-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="status-indicator online"></div>
              <h5 className="mb-0 ms-2">Chat with Maitri</h5>
            </div>
            <button className="btn btn-outline-secondary btn-sm" onClick={clearChat}>
              <i className="fas fa-trash me-2"></i>Clear Chat
            </button>
          </div>

          <div className="chat-messages" id="chatMessages" style={{
            height: 'calc(100vh - 200px)', 
            overflowY: 'auto', 
            padding: '15px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            marginBottom: '80px'
          }}>
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}-message`}>
                <div className="message-avatar">
                  {message.sender === 'user' ? (
                    <div className="user-logo" style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#ffc0cb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  ) : (
                    <div className="bot-logo" style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#ffc0cb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#333',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      M
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    <ReactMarkdown
                      components={{
                        // Custom styling for markdown elements
                        p: ({children}) => <div style={{margin: '0 0 8px 0'}}>{children}</div>,
                        strong: ({children}) => <strong style={{fontWeight: 'bold', color: '#c2185b'}}>{children}</strong>,
                        em: ({children}) => <em style={{fontStyle: 'italic'}}>{children}</em>,
                        ul: ({children}) => <ul style={{marginLeft: '16px', marginBottom: '8px'}}>{children}</ul>,
                        li: ({children}) => <li style={{marginBottom: '4px'}}>{children}</li>
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
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
                  <div className="bot-logo" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#ffc0cb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>
                    M
                  </div>
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

          <div className="chat-input-container" style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: '25%',
            backgroundColor: 'white',
            padding: '15px',
            borderTop: '1px solid #e0e0e0',
            zIndex: 1000
          }}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message to Maitri..."
              />
              <button className="btn btn-primary" type="button" onClick={sendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            {isTyping && (
              <div className="typing-indicator-text">
                <small className="text-muted">
                  <i className="fas fa-robot me-1"></i>Maitri is typing...
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
