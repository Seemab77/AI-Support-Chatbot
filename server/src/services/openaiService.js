/**
 * OpenAI GPT API Service for Chat Responses
 * Uses OpenAI's GPT-3.5-turbo or GPT-4 models for intelligent NLP responses
 * Requires OPENAI_API_KEY in environment variables
 */

const OpenAI = require('openai');
const { v4: uuidv4 } = require('uuid');

class OpenAIService {
    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.warn('⚠️ OPENAI_API_KEY not set. OpenAI service will not work.');
            console.warn('Set OPENAI_API_KEY in your .env file to enable OpenAI responses.');
        }

        this.client = new OpenAI({ apiKey });
        this.conversationHistory = new Map(); // Store conversation history per sessionId
        this.model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
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
     * Send message to OpenAI and get response
     */
    async sendMessage(userMessage, sessionId = uuidv4()) {
        try {
            if (!process.env.OPENAI_API_KEY) {
                return {
                    success: false,
                    error: 'OPENAI_API_KEY not configured',
                    sessionId,
                    userMessage,
                    fulfillmentText: "OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file."
                };
            }

            const history = this._getConversationHistory(sessionId);

            // Build conversation messages with history
            let messages = [
                {
                    role: 'system',
                    content: `You are a helpful AI support assistant for a website. You help users with:
- General information about the website
- Customer support questions
- Billing inquiries
- Technical issues
- Account management

Be friendly, concise, and professional. Keep responses under 3 sentences when possible.`
                }
            ];

            // Add previous messages to context
            for (const msg of history) {
                messages.push({
                    role: msg.role === 'model' ? 'assistant' : msg.role,
                    content: msg.text
                });
            }

            // Add current user message
            messages.push({
                role: 'user',
                content: userMessage
            });

            // Call OpenAI API
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: messages,
                max_tokens: 500,
                temperature: 0.7
            });

            const text = response.choices[0].message.content;

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
                source: 'openai',
                model: this.model
            };
        } catch (error) {
            console.error('OpenAI API Error:', error.message);
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

module.exports = new OpenAIService();
