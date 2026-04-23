// Choose your NLP service:
// Option 1: Mock service (no billing, no credentials needed)
const dialogflowService = require('../services/mockDialogflowService');
const conversationService = require('../services/mockConversationService');

// Option 2: Gemini API (requires GEMINI_API_KEY in .env)
// const dialogflowService = require('../services/geminiService');
// const conversationService = require('../services/mockConversationService');

// Option 3: OpenAI GPT API (requires OPENAI_API_KEY in .env)
// const dialogflowService = require('../services/openaiService');
// const conversationService = require('../services/mockConversationService');

// Option 4: Real services (requires credentials and MongoDB)
// const dialogflowService = require('../services/dialogflowService');
// const conversationService = require('../services/conversationService');

class ChatController {
    /**
     * Handle incoming chat message
     */
    async sendMessage(req, res) {
        try {
            const { message, sessionId, userId } = req.body;

            if (!message || !sessionId) {
                return res.status(400).json({
                    success: false,
                    error: 'Message and sessionId are required'
                });
            }

            // Get or create conversation
            let conversation = await conversationService.getConversation(sessionId);
            if (!conversation) {
                conversation = await conversationService.createConversation(
                    sessionId,
                    userId,
                    {
                        userAgent: req.get('user-agent'),
                        ipAddress: req.ip
                    }
                );
            }

            // Save user message
            await conversationService.addMessage(sessionId, 'user', message);

            // Get response from Dialogflow
            const dialogflowResponse = await dialogflowService.sendMessage(
                message,
                sessionId
            );

            if (dialogflowResponse.success) {
                // Save bot message
                await conversationService.addMessage(
                    sessionId,
                    'bot',
                    dialogflowResponse.fulfillmentText,
                    dialogflowResponse.intent,
                    dialogflowResponse.confidence
                );
            }

            return res.json({
                success: true,
                sessionId,
                userMessage: message,
                botResponse: dialogflowResponse.fulfillmentText,
                intent: dialogflowResponse.intent,
                confidence: dialogflowResponse.confidence,
                messages: (await conversationService.getConversation(sessionId)).messages
            });
        } catch (error) {
            console.error('Error in sendMessage:', error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * Get conversation history
     */
    async getConversation(req, res) {
        try {
            const { sessionId } = req.params;

            if (!sessionId) {
                return res.status(400).json({
                    success: false,
                    error: 'sessionId is required'
                });
            }

            const conversation = await conversationService.getConversation(sessionId);

            if (!conversation) {
                return res.status(404).json({
                    success: false,
                    error: 'Conversation not found'
                });
            }

            return res.json({
                success: true,
                conversation
            });
        } catch (error) {
            console.error('Error in getConversation:', error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * Start new conversation
     */
    async startConversation(req, res) {
        try {
            const { userId } = req.body;
            const sessionId = dialogflowService.generateSessionId();

            const conversation = await conversationService.createConversation(
                sessionId,
                userId || null,
                {
                    userAgent: req.get('user-agent'),
                    ipAddress: req.ip
                }
            );

            return res.json({
                success: true,
                sessionId,
                conversation
            });
        } catch (error) {
            console.error('Error in startConversation:', error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * Close conversation
     */
    async closeConversation(req, res) {
        try {
            const { sessionId } = req.params;

            if (!sessionId) {
                return res.status(400).json({
                    success: false,
                    error: 'sessionId is required'
                });
            }

            const conversation = await conversationService.closeConversation(sessionId);

            return res.json({
                success: true,
                message: 'Conversation closed',
                conversation
            });
        } catch (error) {
            console.error('Error in closeConversation:', error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = new ChatController();
