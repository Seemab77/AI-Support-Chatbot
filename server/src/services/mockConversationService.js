/**
 * Mock Conversation Service for Development/Testing
 * No MongoDB needed!
 * Stores conversations in memory
 */

class MockConversationService {
    constructor() {
        this.conversations = new Map();
    }

    /**
     * Create a new conversation session
     */
    async createConversation(sessionId, userId = null, metadata = {}) {
        const conversation = {
            _id: sessionId,
            sessionId,
            userId,
            messages: [],
            metadata,
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.conversations.set(sessionId, conversation);
        return conversation;
    }

    /**
     * Get conversation by session ID
     */
    async getConversation(sessionId) {
        return this.conversations.get(sessionId) || null;
    }

    /**
     * Add message to conversation
     */
    async addMessage(sessionId, sender, text, intent = null, confidence = null) {
        let conversation = this.conversations.get(sessionId);

        if (!conversation) {
            conversation = await this.createConversation(sessionId);
        }

        conversation.messages.push({
            sender,
            text,
            intent,
            confidence,
            timestamp: new Date()
        });

        conversation.updatedAt = new Date();
        this.conversations.set(sessionId, conversation);

        return conversation;
    }

    /**
     * Close conversation session
     */
    async closeConversation(sessionId) {
        const conversation = this.conversations.get(sessionId);
        if (conversation) {
            conversation.active = false;
            conversation.updatedAt = new Date();
        }
        return conversation;
    }

    /**
     * Get all conversations for a user
     */
    async getUserConversations(userId) {
        const userConversations = Array.from(this.conversations.values())
            .filter(conv => conv.userId === userId)
            .sort((a, b) => b.createdAt - a.createdAt);
        return userConversations;
    }

    /**
     * Clear all conversations (for testing)
     */
    async clearAll() {
        this.conversations.clear();
    }
}

module.exports = new MockConversationService();
