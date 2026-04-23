# API Documentation

Complete API reference for the AI Chatbot application.

## Base URL

- **Development:** `http://localhost:5000`
- **Production:** `https://yourdomain.com`

## Authentication

Currently, the API does not require authentication. In production, implement JWT or OAuth2 authentication.

---

## Endpoints

### 1. Start Conversation

Create a new chat session.

**Request:**
```
POST /api/chat/start
Content-Type: application/json

{
  "userId": "optional-user-id"
}
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| userId | string | No | Optional user identifier for tracking |

**Response (200 OK):**
```json
{
  "success": true,
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "conversation": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "optional-user-id",
    "messages": [],
    "active": true,
    "createdAt": "2024-04-21T10:30:00Z",
    "updatedAt": "2024-04-21T10:30:00Z"
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/chat/start \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'
```

---

### 2. Send Message

Send a message and get a response from the chatbot.

**Request:**
```
POST /api/chat/send
Content-Type: application/json

{
  "message": "Hello, how can you help?",
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "optional-user-id"
}
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| message | string | Yes | User's message |
| sessionId | string | Yes | Session ID from start endpoint |
| userId | string | No | User identifier |

**Response (200 OK):**
```json
{
  "success": true,
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "userMessage": "Hello, how can you help?",
  "botResponse": "Hi! I'm here to help. What can I assist you with?",
  "intent": "greeting",
  "confidence": 0.95,
  "messages": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "sender": "user",
      "text": "Hello, how can you help?",
      "timestamp": "2024-04-21T10:31:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "sender": "bot",
      "text": "Hi! I'm here to help. What can I assist you with?",
      "intent": "greeting",
      "confidence": 0.95,
      "timestamp": "2024-04-21T10:31:05Z"
    }
  ]
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Message and sessionId are required"
}
```

**Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Internal server error message"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/chat/send \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello",
    "sessionId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

---

### 3. Get Conversation

Retrieve full conversation history.

**Request:**
```
GET /api/chat/:sessionId
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| sessionId | string | Yes | Session ID (URL parameter) |

**Response (200 OK):**
```json
{
  "success": true,
  "conversation": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "userId": "user123",
    "messages": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "sender": "user",
        "text": "Hello",
        "timestamp": "2024-04-21T10:31:00Z"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "sender": "bot",
        "text": "Hi! How can I help?",
        "intent": "greeting",
        "confidence": 0.95,
        "timestamp": "2024-04-21T10:31:05Z"
      }
    ],
    "active": true,
    "metadata": {
      "userAgent": "Mozilla/5.0...",
      "ipAddress": "192.168.1.1",
      "source": "web"
    },
    "createdAt": "2024-04-21T10:30:00Z",
    "updatedAt": "2024-04-21T10:31:05Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Conversation not found"
}
```

**Example:**
```bash
curl -X GET http://localhost:5000/api/chat/550e8400-e29b-41d4-a716-446655440000
```

---

### 4. Close Conversation

End a conversation session.

**Request:**
```
PUT /api/chat/:sessionId/close
```

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| sessionId | string | Yes | Session ID (URL parameter) |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Conversation closed",
  "conversation": {
    "_id": "507f1f77bcf86cd799439011",
    "sessionId": "550e8400-e29b-41d4-a716-446655440000",
    "active": false,
    "messages": [...]
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Conversation not found"
}
```

**Example:**
```bash
curl -X PUT http://localhost:5000/api/chat/550e8400-e29b-41d4-a716-446655440000/close
```

---

### 5. Health Check

Check if the server is running.

**Request:**
```
GET /health
```

**Response (200 OK):**
```json
{
  "status": "Server is running"
}
```

**Example:**
```bash
curl http://localhost:5000/health
```

---

## Request/Response Format

### Request Headers
```
Content-Type: application/json
```

### Response Headers
```
Content-Type: application/json
X-Response-Time: 0.125ms
```

---

## Error Responses

### 400 Bad Request
Missing or invalid parameters.

```json
{
  "success": false,
  "error": "Message and sessionId are required"
}
```

### 404 Not Found
Resource not found.

```json
{
  "success": false,
  "error": "Conversation not found"
}
```

### 500 Internal Server Error
Server error.

```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently not implemented. In production, configure:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

---

## CORS

Allowed Origins: `http://localhost:3000` (configurable via `CORS_ORIGIN`)

### Example CORS Request
```javascript
fetch('http://localhost:5000/api/chat/start', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'user123'
  })
})
```

---

## WebSocket Events

For real-time communication, use Socket.IO.

### Client Events

#### Join Conversation
```javascript
socket.emit('join-conversation', {
  sessionId: 'session-id',
  userId: 'user-id'
});
```

#### Send Message
```javascript
socket.emit('send-message', {
  message: 'Hello',
  sessionId: 'session-id',
  userId: 'user-id'
});
```

#### Typing Indicator
```javascript
socket.emit('user-typing', {
  sessionId: 'session-id'
});

socket.emit('user-stopped-typing', {
  sessionId: 'session-id'
});
```

### Server Events

#### Conversation Joined
```javascript
socket.on('conversation-joined', (data) => {
  // { sessionId, userId, timestamp }
});
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
});
```

#### Error
```javascript
socket.on('error-message', (data) => {
  // { error, details }
});
```

#### Remote User Typing
```javascript
socket.on('user-typing', (data) => {
  // { isTyping: true, userId }
});

socket.on('user-stopped-typing', (data) => {
  // { isTyping: false, userId }
});
```

---

## Code Examples

### JavaScript/Fetch

```javascript
// Start conversation
const response = await fetch('http://localhost:5000/api/chat/start', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: 'user123' })
});
const data = await response.json();
const sessionId = data.sessionId;

// Send message
const msgResponse = await fetch('http://localhost:5000/api/chat/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Hello',
    sessionId: sessionId
  })
});
const msgData = await msgResponse.json();
console.log(msgData.botResponse);
```

### Python

```python
import requests
import json

# Start conversation
response = requests.post(
    'http://localhost:5000/api/chat/start',
    json={'userId': 'user123'}
)
session_id = response.json()['sessionId']

# Send message
msg_response = requests.post(
    'http://localhost:5000/api/chat/send',
    json={
        'message': 'Hello',
        'sessionId': session_id
    }
)
print(msg_response.json()['botResponse'])
```

### cURL

```bash
# Start conversation
SESSION_ID=$(curl -X POST http://localhost:5000/api/chat/start \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123"}' | jq -r '.sessionId')

# Send message
curl -X POST http://localhost:5000/api/chat/send \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Hello\",\"sessionId\":\"$SESSION_ID\"}"

# Get conversation
curl http://localhost:5000/api/chat/$SESSION_ID

# Close conversation
curl -X PUT http://localhost:5000/api/chat/$SESSION_ID/close
```

---

## Response Times

Typical response times:
- Start conversation: 50-100ms
- Send message: 200-500ms (depends on Dialogflow)
- Get conversation: 30-50ms
- Close conversation: 30-50ms

---

## Changelog

### Version 1.0.0
- Initial API release
- 4 main endpoints
- WebSocket support
- Dialogflow integration

---

**Last Updated:** April 21, 2026
