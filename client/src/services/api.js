import axios from 'axios';
import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

/**
 * API Service for HTTP calls
 */
export const chatAPI = {
    startConversation: async (userId = null) => {
        try {
            const response = await axios.post(`${API_URL}/api/chat/start`, { userId });
            return response.data;
        } catch (error) {
            console.error('Error starting conversation:', error);
            throw error;
        }
    },

    sendMessage: async (message, sessionId, userId = null) => {
        try {
            const response = await axios.post(`${API_URL}/api/chat/send`, {
                message,
                sessionId,
                userId
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },

    getConversation: async (sessionId) => {
        try {
            const response = await axios.get(`${API_URL}/api/chat/${sessionId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching conversation:', error);
            throw error;
        }
    },

    closeConversation: async (sessionId) => {
        try {
            const response = await axios.put(
                `${API_URL}/api/chat/${sessionId}/close`
            );
            return response.data;
        } catch (error) {
            console.error('Error closing conversation:', error);
            throw error;
        }
    }
};

/**
 * Socket.IO Service for real-time communication
 */
export const createSocketConnection = () => {
    return io(SOCKET_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
    });
};

export const socketEvents = {
    JOIN_CONVERSATION: 'join-conversation',
    SEND_MESSAGE: 'send-message',
    RECEIVE_MESSAGE: 'receive-message',
    USER_TYPING: 'user-typing',
    USER_STOPPED_TYPING: 'user-stopped-typing',
    CONVERSATION_JOINED: 'conversation-joined',
    ERROR_MESSAGE: 'error-message',
    DISCONNECT: 'disconnect',
    CONNECT: 'connect'
};
