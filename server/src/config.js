const path = require('path');
require('dotenv').config();

module.exports = {
    server: {
        port: process.env.PORT || 5000,
        env: process.env.NODE_ENV || 'development'
    },
    dialogflow: {
        projectId: process.env.DIALOGFLOW_PROJECT_ID,
        credentials: {
            type: 'service_account',
            project_id: process.env.DIALOGFLOW_PROJECT_ID,
            private_key_id: process.env.DIALOGFLOW_PRIVATE_KEY_ID,
            private_key: process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
            client_id: process.env.DIALOGFLOW_CLIENT_ID,
            auth_uri: process.env.DIALOGFLOW_AUTH_URI,
            token_uri: process.env.DIALOGFLOW_TOKEN_URI,
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/'
        },
        languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE || 'en-US'
    },
    database: {
        mongoUri: process.env.MONGODB_URI
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    },
    session: {
        secret: process.env.SESSION_SECRET || 'your-secret-key'
    }
};
