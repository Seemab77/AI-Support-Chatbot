# AI Chatbot Web Application

A comprehensive web-based AI chatbot application that integrates with Google Dialogflow for natural language processing. This application provides real-time support capabilities with both REST API and Socket.IO real-time communication options.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Socket.IO Events](#socketio-events)
- [Database Models](#database-models)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

## Features

✨ **Core Features:**
- 🤖 AI-powered chatbot using Google Dialogflow
- 💬 Real-time messaging with Socket.IO
- 🔄 REST API fallback for reliability
- 💾 Optional conversation history storage
- 👥 Multi-user session support
- 📱 Responsive design
- 🎯 Intent detection with confidence scoring
- ⌚ Message timestamps and metadata tracking
- 🔗 Session management
- 🚀 Production-ready code structure

## Tech Stack

### Frontend
- **React 18.2** - UI library
- **CSS3** - Styling with modern features
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **Mongoose** - MongoDB ODM (optional)
- **@google-cloud/dialogflow** - Dialogflow integration

### Database (Optional)
- **MongoDB** - NoSQL database for conversation history
- **Firebase** - Alternative cloud database option

## Project Structure

```
ai-chatbot/
├── server/                          # Backend application
│   ├── src/
│   │   ├── server.js               # Main server entry point
│   │   ├── config.js               # Configuration management
│   │   ├── controllers/
│   │   │   └── chatController.js   # Chat request handlers
│   │   ├── services/
│   │   │   ├── dialogflowService.js # Dialogflow integration
│   │   │   └── conversationService.js # Conversation management
│   │   ├── models/
│   │   │   └── Conversation.js     # Mongoose schema
│   │   ├── routes/
│   │   │   └── chatRoutes.js       # API routes
│   │   └── middleware/
│   │       ├── errorHandler.js     # Error handling
│   │       └── corsMiddleware.js   # CORS configuration
│   ├── package.json
│   ├── .env.example                # Environment template
│   └── .env                        # Local environment (gitignored)
│
├── client/                          # Frontend application
│   ├── public/
│   │   └── index.html              # HTML entry point
│   ├── src/
│   │   ├── index.js                # React entry point
│   │   ├── App.js                  # Main App component
│   │   ├── components/
│   │   │   ├── ChatBox.js          # Main chat container
│   │   │   ├── ChatMessage.js      # Message display component
│   │   │   └── MessageInput.js     # Input component
│   │   ├── services/
│   │   │   └── api.js              # API and Socket.IO services
│   │   └── styles/
│   │       ├── App.css             # Global styles
│   │       ├── ChatBox.css         # ChatBox styles
│   │       ├── ChatMessage.css     # Message styles
│   │       └── MessageInput.css    # Input styles
│   ├── package.json
│   ├── .env.example
│   └── .env                        # Local environment
│
└── README.md                        # This file
```

## Installation

### Prerequisites

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0 or **yarn**
- **MongoDB** (optional, for conversation history)
- **Google Cloud Project** with Dialogflow API enabled

### Step 1: Clone and Setup Project Directories

```bash
# Navigate to your project directory
cd "c:\Users\seema\OneDrive\Desktop\vscode\AI Chatbot Web Application Setup"
```

### Step 2: Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Edit .env with your configuration
# Add your Dialogflow credentials and other settings
```

### Step 3: Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Verify API_URL points to your backend
```

## Configuration

### Backend Configuration (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Dialogflow
DIALOGFLOW_PROJECT_ID=your-project-id
DIALOGFLOW_PRIVATE_KEY_ID=your-key-id
DIALOGFLOW_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
DIALOGFLOW_CLIENT_EMAIL=dialogflow@project.iam.gserviceaccount.com
DIALOGFLOW_CLIENT_ID=your-client-id
DIALOGFLOW_AUTH_URI=https://accounts.google.com/o/oauth2/auth
DIALOGFLOW_TOKEN_URI=https://oauth2.googleapis.com/token
DIALOGFLOW_LANGUAGE_CODE=en-US

# Database
MONGODB_URI=mongodb://localhost:27017/ai-chatbot

# CORS
CORS_ORIGIN=http://localhost:3000

# Session
SESSION_SECRET=your-secret-key
```

### Setting Up Dialogflow

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable the Dialogflow API

2. **Create Service Account**
   - Navigate to IAM & Admin > Service Accounts
   - Create a new service account
   - Grant it "Dialogflow API Admin" role
   - Create and download JSON key
   - Copy the JSON content to your `.env` file

3. **Create Dialogflow Agent**
   - Go to [Dialogflow Console](https://dialogflow.cloud.google.com)
   - Create a new agent
   - Define intents and training phrases
   - Get your Project ID and add to `.env`

### Frontend Configuration (.env)

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# App opens on http://localhost:3000
```

### Production Mode

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
# Serve the build directory with a static server
```

## API Endpoints

### Chat Endpoints

#### Start Conversation
```
POST /api/chat/start
Body: { userId?: string }
Response: { success: true, sessionId: string, conversation: object }
```

#### Send Message
```
POST /api/chat/send
Body: {
  message: string,
  sessionId: string,
  userId?: string
}
Response: {
  success: true,
  sessionId: string,
  userMessage: string,
  botResponse: string,
  intent: string,
  confidence: number,
  messages: array
}
```

#### Get Conversation History
```
GET /api/chat/:sessionId
Response: {
  success: true,
  conversation: {
    sessionId: string,
    userId: string,
    messages: array,
    createdAt: timestamp,
    updatedAt: timestamp
  }
}
```

#### Close Conversation
```
PUT /api/chat/:sessionId/close
Response: {
  success: true,
  message: "Conversation closed",
  conversation: object
}
```

## Socket.IO Events

### Client Events

#### Join Conversation
```javascript
socket.emit('join-conversation', {
  sessionId: string,
  userId?: string
})
```

#### Send Message
```javascript
socket.emit('send-message', {
  message: string,
  sessionId: string,
  userId?: string
})
```

#### User Typing
```javascript
socket.emit('user-typing', {
  sessionId: string
})
```

#### User Stopped Typing
```javascript
socket.emit('user-stopped-typing', {
  sessionId: string
})
```

### Server Events

#### Conversation Joined
```javascript
socket.on('conversation-joined', (data) => {
  // { sessionId, userId, timestamp }
})
```

#### Receive Message
```javascript
socket.on('receive-message', (data) => {
  // {
  //   sessionId,
  //   userMessage,
  //   botResponse,
  //   intent,
  //   confidence,
  //   timestamp
  // }
})
```

#### Error Message
```javascript
socket.on('error-message', (data) => {
  // { error, details }
})
```

#### User Typing
```javascript
socket.on('user-typing', (data) => {
  // { isTyping: true, userId }
})
```

#### User Stopped Typing
```javascript
socket.on('user-stopped-typing', (data) => {
  // { isTyping: false, userId }
})
```

## Database Models

### Conversation Schema

```javascript
{
  sessionId: String,          // Unique session identifier
  userId: String,             // Optional user identifier
  messages: [
    {
      sender: 'user' | 'bot',
      text: String,
      timestamp: Date,
      intent: String,          // Dialogflow intent
      confidence: Number        // Intent confidence (0-1)
    }
  ],
  active: Boolean,
  metadata: {
    userAgent: String,
    ipAddress: String,
    source: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

### Server (.env)

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| PORT | number | No | 5000 | Server port |
| NODE_ENV | string | No | development | Environment mode |
| DIALOGFLOW_PROJECT_ID | string | Yes | - | Google Cloud project ID |
| DIALOGFLOW_PRIVATE_KEY_ID | string | Yes | - | Service account key ID |
| DIALOGFLOW_PRIVATE_KEY | string | Yes | - | Service account private key |
| DIALOGFLOW_CLIENT_EMAIL | string | Yes | - | Service account email |
| DIALOGFLOW_CLIENT_ID | string | Yes | - | Service account client ID |
| DIALOGFLOW_AUTH_URI | string | No | Google default | OAuth auth URI |
| DIALOGFLOW_TOKEN_URI | string | No | Google default | OAuth token URI |
| DIALOGFLOW_LANGUAGE_CODE | string | No | en-US | Bot language |
| MONGODB_URI | string | No | - | MongoDB connection string |
| CORS_ORIGIN | string | No | http://localhost:3000 | CORS allowed origin |
| SESSION_SECRET | string | No | your-secret-key | Session encryption secret |

### Frontend (.env)

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| REACT_APP_API_URL | string | No | http://localhost:5000 | Backend API URL |
| REACT_APP_SOCKET_URL | string | No | http://localhost:5000 | Socket.IO server URL |

## Troubleshooting

### Common Issues

#### 1. Dialogflow Connection Error
**Problem:** `Cannot find module '@google-cloud/dialogflow'` or authentication fails

**Solution:**
- Verify Dialogflow package is installed: `npm install @google-cloud/dialogflow`
- Check `.env` file has all required Dialogflow credentials
- Ensure service account has Dialogflow API Admin role
- Test credentials: `node -e "require('dotenv').config(); console.log(process.env.DIALOGFLOW_PROJECT_ID)"`

#### 2. CORS Error
**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Update `CORS_ORIGIN` in server `.env` to match frontend URL
- Ensure both frontend and backend are running on correct ports
- Check browser console for actual error details

#### 3. Socket.IO Connection Issues
**Problem:** Socket connection stuck in "Disconnected" state

**Solution:**
- Verify backend is running: `curl http://localhost:5000/health`
- Check `REACT_APP_SOCKET_URL` in frontend `.env`
- Ensure ports are not blocked by firewall
- Check browser Network tab for WebSocket connections

#### 4. MongoDB Connection Error
**Problem:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
- Verify MongoDB is running: `mongod --version`
- Check `MONGODB_URI` format is correct
- Ensure MongoDB service is started
- For local MongoDB: `mongodb://localhost:27017/ai-chatbot`

#### 5. Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000    # Windows
lsof -i :5000                   # macOS/Linux

# Kill the process or use different port
SET PORT=5001                   # Windows
PORT=5001                       # macOS/Linux
```

### Debug Mode

Enable detailed logging:

**Backend:**
```bash
DEBUG=* npm run dev
```

**Frontend:**
```bash
// Add to api.js
axios.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

## Performance Optimization

### Backend
- Implement request caching for repeated queries
- Use connection pooling for MongoDB
- Add rate limiting for API endpoints
- Optimize Dialogflow request handling

### Frontend
- Lazy load components
- Implement message virtualization for long histories
- Cache conversation data locally
- Optimize socket event listeners

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file to version control
   - Rotate sensitive keys regularly
   - Use strong `SESSION_SECRET`

2. **API Security**
   - Implement API rate limiting
   - Add input validation
   - Use HTTPS in production
   - Implement CSRF protection

3. **Data Privacy**
   - Encrypt sensitive conversation data
   - Implement user data retention policies
   - Add user consent management
   - Comply with GDPR/CCPA requirements

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Conversation analytics and insights
- [ ] Multi-language support
- [ ] Custom chatbot training
- [ ] Agent escalation workflow
- [ ] Video/Audio support
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] A/B testing framework
- [ ] Integration with CRM systems

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Contact development team

## Changelog

### Version 1.0.0 (Initial Release)
- Initial project setup
- Core chatbot functionality
- Dialogflow integration
- Socket.IO real-time communication
- REST API endpoints
- MongoDB support
- React frontend
- Comprehensive documentation

---

**Last Updated:** April 21, 2026
#   A I - S u p p o r t - C h a t b o t  
 