const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        userId: {
            type: String,
            default: null,
            index: true
        },
        messages: [
            {
                sender: {
                    type: String,
                    enum: ['user', 'bot'],
                    required: true
                },
                text: {
                    type: String,
                    required: true
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                },
                intent: {
                    type: String,
                    default: null
                },
                confidence: {
                    type: Number,
                    default: null
                }
            }
        ],
        active: {
            type: Boolean,
            default: true
        },
        metadata: {
            userAgent: String,
            ipAddress: String,
            source: String
        }
    },
    {
        timestamps: true,
        collection: 'conversations'
    }
);

module.exports = mongoose.model('Conversation', conversationSchema);
