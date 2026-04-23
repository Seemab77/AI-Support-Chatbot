/**
 * Gemini API Service for Chat Responses
 * Uses Google's Gemini API for intelligent NLP responses
 * Requires GEMINI_API_KEY in environment variables
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');

class GeminiService {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.warn('⚠️ GEMINI_API_KEY not set. Gemini service will not work.');
            console.warn('Set GEMINI_API_KEY in your .env file to enable Gemini responses.');
        }

        this.client = new GoogleGenerativeAI(apiKey);
        this.model = this.client.getGenerativeModel({ model: 'gemini-1.5-flash' });
        this.conversationHistory = new Map(); // Store conversation history per sessionId
    }

    /**
     * Initialize or get conversation history for a session
     */
    _getConversationHistory(sessionId) {
        if (!this.conversationHistory.has(sessionId)) {
            this.conversationHistory.set(sessionId, []);
        }
        return this.conversationHistory.get(sessionId);
    }

    /**
     * Send message to Gemini and get response
     */
    async sendMessage(userMessage, sessionId = uuidv4()) {
        try {
            if (!process.env.GEMINI_API_KEY) {
                return {
                    success: false,
                    error: 'GEMINI_API_KEY not configured',
                    sessionId,
                    userMessage,
                    fulfillmentText: "Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file."
                };
            }

            const history = this._getConversationHistory(sessionId);

            // Build conversation content with history
            let conversationContent = [];

            // Add previous messages to context
            for (const msg of history) {
                conversationContent.push({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                });
            }

            // Add current user message
            conversationContent.push({
                role: 'user',
                parts: [{ text: userMessage }]
            });

            // System prompt for the chatbot
            const systemPrompt = `You are a helpful AI support assistant for a website. You help users with:
- General information about the website
- Customer support questions
- Billing inquiries
- Technical issues
- Account management

Be friendly, concise, and professional. Keep responses under 3 sentences when possible.`;

            // Call Gemini API
            const response = await this.model.generateContent({
                contents: conversationContent,
                systemInstruction: systemPrompt
            });

            const text = response.response.text();

            // Store in conversation history
            history.push({ role: 'user', text: userMessage });
            history.push({ role: 'model', text });

            // Keep history manageable (last 10 exchanges)
            if (history.length > 20) {
                history.splice(0, 2);
            }

            return {
                success: true,
                sessionId,
                userMessage,
                fulfillmentText: text,
                fulfillmentMessages: [{ text: { text: [text] } }],
                intent: this._extractIntent(text),
                parameters: {},
                confidence: 0.95,
                allRequiredParamsPresent: true,
                source: 'gemini'
            };
        } catch (error) {
            console.error('Gemini API Error:', error);
            return {
                success: false,
                sessionId,
                userMessage,
                error: error.message,
                fulfillmentText: "Sorry, I encountered an error processing your request. Please try again."
            };
        }
    }

    /**
     * Simple intent extraction from response
     */
    _extractIntent(text) {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('billing') || lowerText.includes('payment') || lowerText.includes('invoice')) {
            return 'billing';
        }
        if (lowerText.includes('technical') || lowerText.includes('error') || lowerText.includes('broken')) {
            return 'technical_issue';
        }
        if (lowerText.includes('account') || lowerText.includes('profile') || lowerText.includes('login')) {
            return 'account_management';
        }
        if (lowerText.includes('help') || lowerText.includes('support') || lowerText.includes('assist')) {
            return 'help';
        }
        if (lowerText.includes('about') || lowerText.includes('information') || lowerText.includes('what')) {
            return 'information';
        }

        return 'general';
    }

    /**
     * Clear conversation history (useful for new users or logout)
     */
    clearHistory(sessionId) {
        this.conversationHistory.delete(sessionId);
    }

    /**
     * Get conversation history
     */
    getHistory(sessionId) {
        return this._getConversationHistory(sessionId);
    }

    /**
     * Generate a new session ID
     */
    generateSessionId() {
        return uuidv4();
    }
}

module.exports = new GeminiService();
