/**
 * Mock Dialogflow Service for Development/Testing
 * No Google Cloud credentials needed!
 * Use this while you set up real Dialogflow
 */

const { v4: uuidv4 } = require('uuid');

class MockDialogflowService {
    constructor() {
        this.responses = {
            greeting: {
                patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings'],
                responses: [
                    "Hi! I'm here to help. What can I assist you with?",
                    "Hello! How can I help you today?",
                    "Hey there! What can I do for you?"
                ]
            },
            how_are_you: {
                patterns: ['how are you', 'how are you doing', 'how you doing', 'whats up', "what's up", 'how you been'],
                responses: [
                    "I'm doing great, thanks for asking! I'm here and ready to help. What can I assist you with?",
                    "I'm functioning perfectly! Thanks for asking. How can I help you today?",
                    "All systems running smoothly! Ready to assist you. What do you need?"
                ]
            },
            help: {
                patterns: ['help', 'need help', 'can you help', 'assist me', 'support'],
                responses: [
                    "I'm here to help! What do you need assistance with?",
                    "Of course! I can help with:\n- Billing questions\n- Technical issues\n- Account management\n- General information",
                    "Sure thing! What's your question?"
                ]
            },
            website_info: {
                patterns: ['about', 'tell me about', 'what is this', 'website info', 'company info', 'who are you'],
                responses: [
                    "We're an AI-powered support platform helping businesses provide better customer service.",
                    "Our website offers intelligent chatbot solutions integrated with Dialogflow NLP.",
                    "We provide AI chatbot technology for customer support automation."
                ]
            },
            contact: {
                patterns: ['contact', 'call', 'speak to someone', 'agent', 'representative', 'human'],
                responses: [
                    "I'm escalating you to our support team. They'll be with you shortly.",
                    "Let me connect you with a support representative.",
                    "I'll transfer you to the next available agent."
                ]
            },
            goodbye: {
                patterns: ['bye', 'goodbye', 'see you', 'farewell', 'quit', 'exit'],
                responses: [
                    "Goodbye! Have a great day!",
                    "Thanks for chatting. See you soon!",
                    "Bye! We're always here if you need help."
                ]
            },
            thanks: {
                patterns: ['thank', 'thanks', 'thank you', 'appreciate'],
                responses: [
                    "You're welcome! Happy to help!",
                    "My pleasure! Let me know if you need anything else.",
                    "You got it! Anything else I can help with?"
                ]
            },
            pricing: {
                patterns: ['price', 'cost', 'pricing', 'how much', 'expensive', 'affordable'],
                responses: [
                    "Our plans start at $9.99/month for basic support. Would you like to hear about our premium features?",
                    "We offer flexible pricing based on your needs. Let me get you pricing details!",
                    "Check out our pricing page for all available plans and features!"
                ]
            },
            features: {
                patterns: ['features', 'what can you do', 'capabilities', 'functions', 'what do you offer'],
                responses: [
                    "We offer AI chatbot integration, multi-language support, analytics, and 24/7 availability!",
                    "Our features include: Live chat, automated responses, ticket management, and reporting.",
                    "Key features: Real-time support, AI-powered responses, team collaboration, and more!"
                ]
            },
            billing: {
                patterns: ['billing', 'invoice', 'payment', 'charge', 'refund', 'subscription'],
                responses: [
                    "You can manage your billing in your account settings. Would you like help with a specific charge?",
                    "For billing inquiries, I can connect you with our billing team right away!",
                    "Let me help you with your billing. What specific issue can I assist with?"
                ]
            },
            account: {
                patterns: ['account', 'login', 'password', 'email', 'profile', 'sign up'],
                responses: [
                    "I can help with account issues! Are you having trouble logging in or resetting your password?",
                    "For account-related matters, let me get you to our account specialist.",
                    "What account issue can I help you resolve today?"
                ]
            },
            technical: {
                patterns: ['error', 'bug', 'broken', 'not working', 'issue', 'problem', 'crash'],
                responses: [
                    "I'm sorry you're experiencing an issue! Can you describe what's happening?",
                    "Let's troubleshoot this together. What error message are you seeing?",
                    "I'll connect you with our technical team to resolve this quickly!"
                ]
            },
            availability: {
                patterns: ['hours', 'available', 'open', 'closed', 'when', 'schedule', 'timing'],
                responses: [
                    "We're available 24/7 to assist you! Our team is always here.",
                    "Our support is available round-the-clock for all your needs.",
                    "We operate 24 hours a day, 7 days a week for your convenience!"
                ]
            },
            order_status: {
                patterns: ['order', 'status', 'tracking', 'delivery', 'shipped', 'arrived'],
                responses: [
                    "I can help track your order! Do you have your order number?",
                    "Let me look up your order status. What's your order ID?",
                    "I'll check on your shipment for you. Please provide your order number."
                ]
            },
            feedback: {
                patterns: ['feedback', 'review', 'rating', 'complaint', 'suggestion', 'improve'],
                responses: [
                    "Your feedback is valuable to us! We'd love to hear your suggestions.",
                    "Thank you for sharing your feedback! How can we improve?",
                    "We appreciate your input! Please tell us what we can do better."
                ]
            },
            demo: {
                patterns: ['demo', 'trial', 'test', 'try', 'see how', 'show me'],
                responses: [
                    "Great! I'd be happy to show you a demo. Let me schedule that for you!",
                    "We offer a free trial period. Would you like to get started?",
                    "I can set up a demo call with our team. When works best for you?"
                ]
            }
        };
    }

    /**
     * Find matching intent and return response
     */
    async sendMessage(userMessage, sessionId = uuidv4()) {
        try {
            const message = userMessage.toLowerCase().trim();
            let matchedIntent = 'unknown';
            let confidence = 0.5;
            let response = "I'm not sure how to help with that. Could you rephrase your question?";

            // Check which intent matches best
            for (const [intent, data] of Object.entries(this.responses)) {
                for (const pattern of data.patterns) {
                    if (message.includes(pattern)) {
                        matchedIntent = intent;
                        confidence = 0.8 + Math.random() * 0.2; // 0.8 - 1.0
                        response = this._getRandomResponse(data.responses);
                        break;
                    }
                }
                if (matchedIntent !== 'unknown') break;
            }

            // Fallback handling for unknown intents
            if (matchedIntent === 'unknown') {
                response = this._generateFallbackResponse(message);
                confidence = 0.6;
            }

            // Simulate API delay
            await this._delay(300);

            return {
                success: true,
                sessionId,
                userMessage,
                fulfillmentText: response,
                fulfillmentMessages: [{ text: { text: [response] } }],
                intent: matchedIntent,
                parameters: {},
                confidence,
                allRequiredParamsPresent: true
            };
        } catch (error) {
            console.error('Mock Dialogflow Error:', error);
            return {
                success: false,
                error: error.message,
                userMessage,
                fulfillmentText: 'Sorry, something went wrong. Please try again.'
            };
        }
    }

    /**
     * Generate appropriate fallback response based on message type
     */
    _generateFallbackResponse(message) {
        // Questions
        if (message.includes('?')) {
            const questionResponses = [
                "That's a great question! I'm still learning about all the details. Could you tell me more?",
                "I don't have specific information on that, but I'd be happy to help you find an answer!",
                "That's interesting! Can you give me more context so I can better assist you?"
            ];
            return this._getRandomResponse(questionResponses);
        }

        // Statements/casual chat
        const statementResponses = [
            "I understand! Is there something I can help you with?",
            "Got it! How can I assist you further?",
            "Thanks for sharing! What else can I help with?"
        ];
        return this._getRandomResponse(statementResponses);
    }

    /**
     * Generate session ID
     */
    generateSessionId() {
        return uuidv4();
    }

    /**
     * Generate a new session ID
     */
    generateSessionId() {
        return uuidv4();
    }

    /**
     * Get random response from array
     */
    _getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * Simulate network delay
     */
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = new MockDialogflowService();
