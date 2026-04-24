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
                    "Hey! I'm here to help. What do you need?",
                    "Hi there! How can I assist?",
                    "Hello! What can I do for you?"
                ]
            },
            how_are_you: {
                patterns: ['how are you', 'how are you doing', 'how you doing', 'whats up', "what's up", 'how you been'],
                responses: [
                    "Running smoothly! Ready to help. What's on your mind?",
                    "All good! How can I assist you today?",
                    "Functioning well, thanks! What can I help with?"
                ]
            },
            help: {
                patterns: ['help', 'need help', 'can you help', 'assist me', 'support'],
                responses: [
                    "I can help with:\n• Account & login issues\n• Billing & payments\n• Technical problems\n• General questions\n\nWhat do you need?",
                    "What specific issue can I help you with?",
                    "Sure! What's the problem?"
                ]
            },
            website_info: {
                patterns: ['about', 'tell me about', 'what is this', 'website info', 'company info', 'who are you'],
                responses: [
                    "We provide AI-powered support chatbots for businesses. Our platform handles customer inquiries 24/7 with intelligent responses.",
                    "We're a support automation platform using NLP to handle customer questions efficiently.",
                    "Our chatbot technology helps businesses scale their support without increasing costs."
                ]
            },
            contact: {
                patterns: ['contact', 'call', 'speak to someone', 'agent', 'representative', 'human'],
                responses: [
                    "I'm connecting you with our support team. They'll respond shortly.",
                    "Getting you to a specialist now.",
                    "Transferring to human support..."
                ]
            },
            goodbye: {
                patterns: ['bye', 'goodbye', 'see you', 'farewell', 'quit', 'exit'],
                responses: [
                    "Thanks for chatting! Come back if you need help.",
                    "Bye! We're always here.",
                    "Take care! See you soon."
                ]
            },
            thanks: {
                patterns: ['thank', 'thanks', 'thank you', 'appreciate'],
                responses: [
                    "Happy to help! Anything else?",
                    "You're welcome! Let me know if you need more.",
                    "Got it! Need anything else?"
                ]
            },
            pricing: {
                patterns: ['price', 'cost', 'pricing', 'how much', 'expensive', 'affordable'],
                responses: [
                    "Our pricing:\n• Basic: $9.99/month (ideal for startups)\n• Pro: $29.99/month (advanced features)\n• Enterprise: Custom pricing\n\nWhich interests you?",
                    "We have flexible pricing starting at $9.99/month. Want details on a specific plan?",
                    "Plans range from $9.99 to custom enterprise solutions. What's your budget?"
                ]
            },
            features: {
                patterns: ['features', 'what can you do', 'capabilities', 'functions', 'what do you offer'],
                responses: [
                    "Key features:\n• 24/7 AI responses\n• Multi-language support\n• Analytics & reporting\n• Integration APIs\n• Conversation history\n\nWant more details?",
                    "We offer: Live chat, AI automation, analytics, team collaboration, and reporting.",
                    "Features include real-time support, AI-powered responses, custom intents, and full analytics."
                ]
            },
            billing: {
                patterns: ['billing', 'invoice', 'payment', 'charge', 'refund', 'subscription'],
                responses: [
                    "For billing:\n1. Check your account settings\n2. Review invoices section\n3. Update payment method\n\nStill need help? Let me connect you with billing support.",
                    "What's the billing issue? I can help or escalate to our billing team.",
                    "Billing questions? I'll help you sort it out."
                ]
            },
            account: {
                patterns: ['account', 'login', 'password', 'email', 'profile', 'sign up'],
                responses: [
                    "Account help:\n• Reset password: Use 'Forgot Password' link\n• Update profile: Settings → Account\n• Change email: Contact support\n\nNeed something else?",
                    "Having trouble logging in or changing your profile?",
                    "What account issue can I help with?"
                ]
            },
            technical: {
                patterns: ['error', 'bug', 'broken', 'not working', 'issue', 'problem', 'crash'],
                responses: [
                    "Let's troubleshoot:\n1. What error are you seeing?\n2. When did it start?\n3. Have you tried refreshing?\n\nTell me more details.",
                    "Describe the issue and I'll help fix it or escalate to our technical team.",
                    "What's the error? Let me help."
                ]
            },
            availability: {
                patterns: ['hours', 'available', 'open', 'closed', 'when', 'schedule', 'timing'],
                responses: [
                    "We're available 24/7/365. Support team is always here.",
                    "Round-the-clock support. We never close.",
                    "Available anytime, anywhere. No downtime."
                ]
            },
            order_status: {
                patterns: ['order', 'status', 'tracking', 'delivery', 'shipped', 'arrived'],
                responses: [
                    "To check your order:\n1. Have your order number ready\n2. Give me the ID\n3. I'll look it up\n\nWhat's your order number?",
                    "I can track your order. What's your order ID?",
                    "Order number?"
                ]
            },
            feedback: {
                patterns: ['feedback', 'review', 'rating', 'complaint', 'suggestion', 'improve'],
                responses: [
                    "Your feedback matters. Tell us:\n• What worked?\n• What didn't?\n• How can we improve?\n\nShare your thoughts.",
                    "We value your input. What can we do better?",
                    "What's your feedback?"
                ]
            },
            demo: {
                patterns: ['demo', 'trial', 'test', 'try', 'see how', 'show me'],
                responses: [
                    "I can set up a demo for you. Choose:\n• Live walkthrough\n• Free trial (7 days)\n• Video tutorial\n\nWhat works for you?",
                    "Want a live demo or self-guided trial? Let me know.",
                    "I'll set up a demo. What's best for you?"
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
        const msg = message.toLowerCase();

        // Keyword-based intelligent responses
        if (msg.match(/\b(what|how|why|when|where|who|which)\b/)) {
            // It's a question - provide helpful guidance
            if (msg.match(/\b(time|date|today|tomorrow|schedule)\b/)) {
                return "I can help with scheduling. What specific date or time do you need?";
            }
            if (msg.match(/\b(weather|rain|snow|temperature)\b/)) {
                return "I'm here for support, not weather! But I can help with our services. What do you need?";
            }
            if (msg.match(/\b(name|who are you|your name)\b/)) {
                return "I'm your AI Support Assistant. I'm here to help with any questions about our service. What can I do?";
            }
            if (msg.match(/\b(sports|games|movies|music)\b/)) {
                return "Fun question! While I love those topics, I'm focused on supporting our services. How can I help you today?";
            }
            if (msg.match(/\b(joke|funny|laugh)\b/)) {
                return "Why did the chatbot cross the road? To help the customer on the other side! 😄 Now, how can I assist you?";
            }
            if (msg.match(/\b(love|like|enjoy)\b.*\b(you|bot|assistant)\b/)) {
                return "Thanks! I enjoy helping customers. What can I do for you today?";
            }
            if (msg.match(/\b(health|medical|doctor|sick)\b/)) {
                return "I'm not a medical professional, but I can help with service-related questions. What do you need?";
            }
            if (msg.match(/\b(api|integrate|code|developer|technical)\b/)) {
                return "Great! Our API docs are at docs.example.com. Want help with specific integration?";
            }
            if (msg.match(/\b(recommend|suggest|best|should i)\b/)) {
                return "I'd recommend starting with our starter plan. What are you trying to accomplish?";
            }

            // Generic question response
            return "That's a great question! Can you give me more details so I can help better?";
        }

        // Statements and commands
        if (msg.match(/\b(ok|okay|sure|yes|got it|understood)\b/)) {
            return "Great! What else can I help you with?";
        }
        if (msg.match(/\b(no|nope|not|don't|doesn't)\b/)) {
            return "No problem. What can I assist you with instead?";
        }
        if (msg.match(/\b(sorry|apologize|my bad|my mistake)\b/)) {
            return "No worries! Everyone makes mistakes. How can I help?";
        }
        if (msg.match(/\b(maybe|perhaps|possibly|might|could)\b/)) {
            return "Let me help you figure that out. What are you considering?";
        }
        if (msg.match(/\b(confused|lost|stuck|help)\b/)) {
            return "Don't worry! Walk me through it step by step. What's the issue?";
        }
        if (msg.match(/\b(test|demo|try|show)\b/)) {
            return "I can show you a demo! What feature interests you most?";
        }
        if (msg.match(/\b(admin|manage|control|settings|configuration)\b/)) {
            return "You can manage these in your account dashboard. What specifically do you need to change?";
        }
        if (msg.match(/\b(secure|safety|privacy|encryption|data)\b/)) {
            return "Security is our priority. We use end-to-end encryption and comply with GDPR. Any specific concerns?";
        }
        if (msg.match(/\b(expensive|cheap|budget|money|afford)\b/)) {
            return "Our pricing is flexible and competitive. Want to see our plans?";
        }
        if (msg.match(/\b(slow|fast|speed|performance|lag)\b/)) {
            return "Performance matters! Our average response time is <100ms. Having specific issues?";
        }

        // Casual/vague statements
        const genericResponses = [
            "Got it! How can I help you with that?",
            "Thanks for sharing. What do you need specifically?",
            "Understood! What else can I assist with?",
            "Good to know! Can you tell me more?",
            "Interesting! How can I help?",
            "Got you! What's your question?"
        ];
        return this._getRandomResponse(genericResponses);
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
