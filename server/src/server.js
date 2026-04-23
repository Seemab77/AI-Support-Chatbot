const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const config = require('./config');
const chatRoutes = require('./routes/chatRoutes');
const corsMiddleware = require('./middleware/corsMiddleware');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Choose your NLP service:
// Option 1: Mock service (no billing, no credentials needed)
const dialogflowService = require('./services/mockDialogflowService');
const conversationService = require('./services/mockConversationService');

// Option 2: Gemini API (requires GEMINI_API_KEY in .env)
// const dialogflowService = require('./services/geminiService');
// const conversationService = require('./services/mockConversationService');

// Option 3: OpenAI GPT API (requires OPENAI_API_KEY in .env)
// const dialogflowService = require('./services/openaiService');
// const conversationService = require('./services/mockConversationService');

// Option 4: Real Dialogflow (requires credentials and MongoDB)
// const dialogflowService = require('./services/dialogflowService');
// const conversationService = require('./services/conversationService');
// const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: config.cors.origin,
        credentials: true
    }
});

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// API Routes
app.use('/api/chat', chatRoutes);

// Socket.IO Events
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    /**
     * Join conversation room
     */
    socket.on('join-conversation', (data) => {
        const { sessionId, userId } = data;
        socket.join(sessionId);
        console.log(`User ${socket.id} joined session ${sessionId}`);

        socket.emit('conversation-joined', {
            sessionId,
            userId,
            timestamp: new Date()
        });
    });

    /**
     * Receive message and send to Dialogflow
     */
    socket.on('send-message', async (data) => {
        try {
            const { message, sessionId, userId } = data;

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

            // Emit message to all users in the conversation room
            io.to(sessionId).emit('receive-message', {
                sessionId,
                userMessage: message,
                botResponse: dialogflowResponse.fulfillmentText,
                intent: dialogflowResponse.intent,
                confidence: dialogflowResponse.confidence,
                timestamp: new Date()
            });
        } catch (error) {
            console.error('Socket error:', error);
            socket.emit('error-message', {
                error: 'Failed to process message',
                details: error.message
            });
        }
    });

    /**
     * Handle disconnect
     */
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    /**
     * Typing indicator
     */
    socket.on('user-typing', (data) => {
        const { sessionId } = data;
        socket.broadcast.to(sessionId).emit('user-typing', {
            isTyping: true,
            userId: socket.id
        });
    });

    socket.on('user-stopped-typing', (data) => {
        const { sessionId } = data;
        socket.broadcast.to(sessionId).emit('user-stopped-typing', {
            isTyping: false,
            userId: socket.id
        });
    });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection (optional - not needed for mock mode)
// Uncomment below to use MongoDB for real Dialogflow setup
// const mongoose = require('mongoose');
// if (config.database.mongoUri) {
//     mongoose
//         .connect(config.database.mongoUri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         .then(() => console.log('MongoDB connected'))
//         .catch((err) => console.error('MongoDB connection error:', err));
// } else {
//     console.warn('MongoDB URI not configured. Database features will be unavailable.');
// }

console.log('✅ Mock Service Enabled');
console.log('🤖 Using Mock NLP for chat responses (no external API needed)');
console.log('📝 Conversations stored in memory (session-based)');

// Start server
const PORT = config.server.port;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Environment: ${config.server.env}`);
});

module.exports = { app, server, io };
