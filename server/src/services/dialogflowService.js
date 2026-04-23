const dialogflow = require('@google-cloud/dialogflow');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');

class DialogflowService {
    constructor() {
        this.projectId = config.dialogflow.projectId;
        this.sessionClient = new dialogflow.SessionsClient({
            credentials: config.dialogflow.credentials
        });
        this.languageCode = config.dialogflow.languageCode;
    }

    /**
     * Send a message to Dialogflow and get a response
     * @param {string} userMessage - The user's message
     * @param {string} sessionId - The session ID for maintaining context
     * @returns {Promise<Object>} - The response from Dialogflow
     */
    async sendMessage(userMessage, sessionId = uuidv4()) {
        try {
            const sessionPath = this.sessionClient.projectAgentSessionPath(
                this.projectId,
                sessionId
            );

            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: userMessage,
                        languageCode: this.languageCode
                    }
                }
            };

            const responses = await this.sessionClient.detectIntent(request);
            const result = responses[0].queryResult;

            return {
                success: true,
                sessionId,
                userMessage,
                fulfillmentText: result.fulfillmentText,
                fulfillmentMessages: result.fulfillmentMessages,
                intent: result.intent?.displayName || 'Unknown',
                parameters: result.parameters?.fields || {},
                confidence: result.intentDetectionConfidence,
                allRequiredParamsPresent: result.allRequiredParamsPresent
            };
        } catch (error) {
            console.error('Dialogflow Error:', error);
            return {
                success: false,
                error: error.message,
                userMessage,
                fulfillmentText: 'Sorry, I could not process your request. Please try again.'
            };
        }
    }

    /**
     * Get session ID for new conversation
     * @returns {string} - New session ID
     */
    generateSessionId() {
        return uuidv4();
    }
}

module.exports = new DialogflowService();
