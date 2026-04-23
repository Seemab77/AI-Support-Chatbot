const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

/**
 * POST /api/chat/start - Start a new conversation
 */
router.post('/start', chatController.startConversation);

/**
 * POST /api/chat/send - Send a message
 */
router.post('/send', chatController.sendMessage);

/**
 * GET /api/chat/:sessionId - Get conversation history
 */
router.get('/:sessionId', chatController.getConversation);

/**
 * PUT /api/chat/:sessionId/close - Close a conversation
 */
router.put('/:sessionId/close', chatController.closeConversation);

module.exports = router;
