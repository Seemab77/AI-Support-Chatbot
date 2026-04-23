const Conversation = require('../models/Conversation');

class ConversationService {
    /**
     * Create a new conversation session
     */
    async createConversation(sessionId, userId = null, metadata = {}) {
        try {
            const conversation = new Conversation({
                sessionId,
                userId,
                messages: [],
                metadata
            });
            return await conversation.save();
        } catch (error) {
            console.error('Error creating conversation:', error);
            throw error;
        }
    }

    /**
     * Get conversation by session ID
     */
    async getConversation(sessionId) {
        try {
            return await Conversation.findOne({ sessionId });
        } catch (error) {
            console.error('Error fetching conversation:', error);
            throw error;
        }
    }

    /**
     * Add message to conversation
     */
    async addMessage(sessionId, sender, text, intent = null, confidence = null) {
        try {
            const conversation = await Conversation.findOne({ sessionId });
            if (!conversation) {
                throw new Error('Conversation not found');
            }

            conversation.messages.push({
                sender,
                text,
                intent,
                confidence,
                timestamp: new Date()
            });

            return await conversation.save();
        } catch (error) {
            console.error('Error adding message:', error);
            throw error;
        }
    }

    /**
     * Close conversation session
     */
    async closeConversation(sessionId) {
        try {
            return await Conversation.findOneAndUpdate(
                { sessionId },
                { active: false },
                { new: true }
            );
        } catch (error) {
            console.error('Error closing conversation:', error);
            throw error;
        }
    }

    /**
     * Get all conversations for a user
     */
    async getUserConversations(userId) {
        try {
            return await Conversation.find({ userId }).sort({ createdAt: -1 });
        } catch (error) {
            console.error('Error fetching user conversations:', error);
            throw error;
        }
    }
}

module.exports = new ConversationService();
