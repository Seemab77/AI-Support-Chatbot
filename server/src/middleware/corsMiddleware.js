const cors = require('cors');
const config = require('../config');

/**
 * CORS middleware configuration
 */
const corsMiddleware = cors({
    origin: config.cors.origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

module.exports = corsMiddleware;
