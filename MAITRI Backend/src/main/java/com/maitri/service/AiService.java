package com.maitri.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service

public class AiService {

    private static final Logger logger = LoggerFactory.getLogger(AiService.class);

    // Getting our secret API key from the config file - keep this safe!
    @Value("${app.gemini.api-key}")
    private String apiKey;

    // Which AI model should we chat with? Gemini 1.5 Flash is pretty awesome
    @Value("${app.gemini.model:gemini-1.5-flash}")
    private String model;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    // Maitri's personality and system prompt
    private static final String SYSTEM_PROMPT = """
        You are Maitri, a warm and friendly AI health companion for women. Your name means "loving-kindness" in Sanskrit.
        
        **Your Personality:**
        - Warm, caring, and approachable like a good friend
        - Conversational and natural - don't be overly formal
        - Keep responses concise unless detailed information is specifically requested
        - Use emojis occasionally to feel more human and friendly
        
        **Your Expertise:**
        - Women's reproductive health (periods, PCOS, pregnancy wellness)
        - Hormonal health and balance
        - Mental health and emotional support
        - Nutrition and fitness for women
        - General health guidance and symptom management
        
        **IMPORTANT SYMPTOM RESPONSE GUIDELINES:**
        
        **For Physical Symptoms/Health Issues:**
        1. **Provide Immediate Relief Options:** Always offer practical, safe home remedies and self-care steps they can try right away
        2. **Explain Possible Causes:** Give likely explanations for their symptoms in simple, non-alarming language
        3. **Be Detailed but Reassuring:** Provide comprehensive advice without using scary medical terms
        4. **Use Minimal Emojis:** Keep responses professional for health concerns (max 1-2 emojis)
        5. **Avoid Panic-Inducing Language:** Never mention worst-case scenarios, death, or rare dangerous conditions unless absolutely critical
        
        **Response Structure for Symptoms:**
        1. Acknowledge their concern empathetically
        2. Provide immediate self-care steps they can try
        3. Explain what might be causing it (common, non-scary explanations)
        4. Suggest when to see a doctor (timeframe and specific warning signs)
        5. Offer additional prevention tips if relevant
        
        **Formatting Guidelines:**
        - Use **bold text** for important concepts and key terms (like **RICE method**)
        - For acronyms, write them as: **R**est, **I**ce, **C**ompress, **E**levate (each letter bolded separately)
        - Use bullet points for step-by-step instructions
        - Use numbered lists for sequential steps
        - Keep paragraphs short and readable
        - Bold important medical methods or techniques
        
        **For Serious Symptoms (severe pain, breathing issues, chest pain, etc.):**
        - Still provide immediate steps they can take RIGHT NOW
        - Then clearly state they need medical attention immediately
        - Don't describe worst-case scenarios, just emphasize urgency
        
        **Examples:**
        - Headache → Hydration, rest, neck stretches, possible triggers, when to worry
        - Period pain → Heat therapy, gentle movement, pain relief options, hormonal explanations
        - Nausea → Position changes, ginger, breathing techniques, possible causes
        - Anxiety → Breathing exercises, grounding techniques, lifestyle factors
        
        **Communication Style:**
        - Casual greetings: Brief and warm with emojis
        - Health symptoms: Detailed, helpful, minimal emojis, reassuring tone
        - General questions: Balanced detail based on complexity
        - Always be supportive but never replace professional medical advice
        
        Remember: Your goal is to help them feel better immediately while providing education, not to diagnose or alarm them.
        """;

    public AiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public Mono<String> getChatResponse(String userMessage) {
        try {
            // Combine system prompt with user message
            String fullPrompt = SYSTEM_PROMPT + "\n\nUser: " + userMessage + "\n\nMaitri:";
            
            // Create request body for Gemini API
            Map<String, Object> requestBody = createGeminiRequestBody(fullPrompt);
            
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey;
            
            return webClient.post()
                .uri(url)
                .header("Content-Type", "application/json")
                .header("User-Agent", "Maitri-HealthApp/1.0")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .map(this::extractResponseText)
                .timeout(java.time.Duration.ofSeconds(10))
                .doOnError(error -> logger.error("Gemini API Error: {}", error.getMessage()))
                .onErrorResume(WebClientResponseException.class, ex -> {
                    logger.error("Gemini API HTTP Error: {} - {}", ex.getStatusCode(), ex.getResponseBodyAsString());
                    return Mono.just("Hi! I'm having some connectivity issues right now, but I'm still here to help with basic wellness guidance! What would you like to know about?");
                })
                .onErrorResume(Exception.class, ex -> {
                    logger.error("General Error in Gemini API call: {}", ex.getMessage(), ex);
                    return Mono.just("Hi there! I'm experiencing some technical issues, but I can still provide basic health tips. What's on your mind?");
                });
                
        } catch (Exception e) {
            logger.error("Error creating Gemini request: {}", e.getMessage(), e);
            return Mono.just("Hi! I'm here to help with your wellness journey. Having some tech issues, but what would you like to know?");
        }
    }

    private Map<String, Object> createGeminiRequestBody(String prompt) {
        Map<String, Object> requestBody = new HashMap<>();
        
        // Create contents array
        Map<String, Object> content = new HashMap<>();
        Map<String, String> part = new HashMap<>();
        part.put("text", prompt);
        content.put("parts", List.of(part));
        
        requestBody.put("contents", List.of(content));
        
        // Add generation config for better responses
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("temperature", 0.7);
        generationConfig.put("topK", 40);
        generationConfig.put("topP", 0.95);
        generationConfig.put("maxOutputTokens", 1024);
        requestBody.put("generationConfig", generationConfig);
        
        // Add safety settings
        List<Map<String, Object>> safetySettings = List.of(
            Map.of("category", "HARM_CATEGORY_HARASSMENT", "threshold", "BLOCK_MEDIUM_AND_ABOVE"),
            Map.of("category", "HARM_CATEGORY_HATE_SPEECH", "threshold", "BLOCK_MEDIUM_AND_ABOVE"),
            Map.of("category", "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold", "BLOCK_MEDIUM_AND_ABOVE"),
            Map.of("category", "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold", "BLOCK_MEDIUM_AND_ABOVE")
        );
        requestBody.put("safetySettings", safetySettings);
        
        return requestBody;
    }

    private String extractResponseText(String jsonResponse) {
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            JsonNode candidatesNode = rootNode.path("candidates");
            
            if (candidatesNode.isArray() && candidatesNode.size() > 0) {
                JsonNode firstCandidate = candidatesNode.get(0);
                JsonNode contentNode = firstCandidate.path("content");
                JsonNode partsNode = contentNode.path("parts");
                
                if (partsNode.isArray() && partsNode.size() > 0) {
                    return partsNode.get(0).path("text").asText();
                }
            }
            
            return "Hi! Let me try to help you with that. What specific health topic are you interested in?";
            
        } catch (Exception e) {
            System.err.println("Error parsing Gemini response: " + e.getMessage());
            return "Hi there! I'm here to help. What would you like to know about your health and wellness?";
        }
    }
}
