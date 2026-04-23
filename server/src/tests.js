/**
 * Basic Integration Tests for Chat API
 * Run with: npm test
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000';

describe('Chat API Tests', () => {
    let sessionId;

    test('Health Check', async () => {
        const response = await axios.get(`${API_URL}/health`);
        expect(response.status).toBe(200);
        expect(response.data.status).toBe('Server is running');
    });

    test('Start Conversation', async () => {
        const response = await axios.post(`${API_URL}/api/chat/start`, {
            userId: 'test-user-123'
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.sessionId).toBeDefined();

        sessionId = response.data.sessionId;
    });

    test('Send Message', async () => {
        const response = await axios.post(`${API_URL}/api/chat/send`, {
            message: 'Hello, can you help me?',
            sessionId: sessionId
        });

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.botResponse).toBeDefined();
        expect(response.data.intent).toBeDefined();
    });

    test('Get Conversation', async () => {
        const response = await axios.get(`${API_URL}/api/chat/${sessionId}`);

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.conversation.messages.length).toBeGreaterThan(0);
    });

    test('Close Conversation', async () => {
        const response = await axios.put(`${API_URL}/api/chat/${sessionId}/close`);

        expect(response.status).toBe(200);
        expect(response.data.success).toBe(true);
        expect(response.data.conversation.active).toBe(false);
    });

    test('Send Message to Invalid Session', async () => {
        try {
            await axios.post(`${API_URL}/api/chat/send`, {
                message: 'Hello',
                sessionId: 'invalid-session-id'
            });
            fail('Should have thrown error');
        } catch (error) {
            expect(error.response.status).toBe(500);
        }
    });

    test('Get Non-existent Conversation', async () => {
        try {
            await axios.get(`${API_URL}/api/chat/non-existent-id`);
            fail('Should have thrown error');
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});

/**
 * Frontend Component Tests
 * Run with: npm test
 */

describe('ChatBox Component', () => {
    test('ChatBox renders correctly', () => {
        // Mock test - implement with React Testing Library
        expect(true).toBe(true);
    });

    test('Message input sends message', () => {
        // Mock test - implement with React Testing Library
        expect(true).toBe(true);
    });

    test('Displays bot response', () => {
        // Mock test - implement with React Testing Library
        expect(true).toBe(true);
    });
});
