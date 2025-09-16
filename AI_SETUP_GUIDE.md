# Maitri AI Integration Setup Guide

## Getting Your Gemini API Key

### Step 1: Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure Backend
1. Open `MAITRI Backend/src/main/resources/application.properties`
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```
   app.gemini.api-key=AIzaSyDAcq3CJ129f8w240dTKXV4xnblWRhFLps
   ```

### Step 3: Test the Integration
1. Start your backend server:
   ```bash
   cd "MAITRI Backend"
   mvn spring-boot:run
   ```

2. Start your frontend:
   ```bash
   cd "MAITRI React"
   npm run dev
   ```

3. Go to the chatbot page and test a message

## AI Features Implemented

### Maitri's Personality
- **Name**: Maitri (meaning "friendship" and "loving-kindness" in Sanskrit)
- **Expertise**: Women's health, reproductive wellness, mental health, nutrition
- **Communication Style**: Warm, understanding, professional yet friendly

### Key Capabilities
1. **Women's Health Guidance**
   - Menstrual health and cycle tracking
   - Reproductive health information
   - Hormonal health support

2. **Mental Wellness Support**
   - Emotional support and validation
   - Stress management techniques
   - Mental health resources

3. **Nutrition & Lifestyle**
   - Personalized nutrition advice
   - Healthy eating recommendations
   - Lifestyle optimization tips

4. **Safety Features**
   - Always recommends professional medical consultation for serious issues
   - Provides disclaimers for health advice
   - Maintains appropriate boundaries

### Fallback System
If the Gemini API is unavailable, Maitri will use predefined responses to ensure users always get helpful information.

## Technical Implementation

### Backend Components
- `AiService.java`: Main AI integration service
- `ChatController.java`: REST API endpoints for chat
- `ChatRequest.java` & `ChatResponse.java`: Data transfer objects

### Frontend Updates
- Enhanced `Chatbot.jsx` with AI integration
- Real-time communication with backend
- Improved user interface with better quick actions

### API Endpoints
- `POST /api/chat/message`: Send message to AI
- `GET /api/chat/health`: Health check for chat service

## Customizing Maitri's Responses

To modify Maitri's personality or expertise, edit the `SYSTEM_PROMPT` in:
`MAITRI Backend/src/main/java/com/maitri/service/AiService.java`

The prompt defines:
- Maitri's core identity and purpose
- Expertise areas and knowledge base
- Communication style and guidelines
- Safety and ethical boundaries

## Troubleshooting

### Common Issues:
1. **API Key Error**: Ensure your Gemini API key is correctly set in application.properties
2. **Connection Issues**: Check that backend is running on port 8080
3. **CORS Issues**: Frontend origins are already configured in the ChatController

### Error Handling:
- Invalid API responses fall back to predefined responses
- Network errors are gracefully handled
- User-friendly error messages for technical issues

## Security Notes
- API key is stored securely in backend configuration
- Frontend never has direct access to the API key
- All AI requests are proxied through your backend
- Rate limiting can be added to the ChatController if needed

## Future Enhancements
- Chat history persistence
- User-specific conversation context
- Integration with health tracking features
- Multi-language support
- Voice interaction capabilities
