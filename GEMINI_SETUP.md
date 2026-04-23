# Gemini API Setup Guide

This guide explains how to enable Google's Gemini API for your AI chatbot.

## What is Gemini?

Gemini is Google's latest large language model that provides:
- ✅ Free tier with generous rate limits
- ✅ High-quality conversational AI
- ✅ Context-aware responses
- ✅ Multi-turn conversation support
- ✅ No credit card required for free tier

## Getting Your API Key

### Step 1: Create a Google AI Studio Account
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Get API Key" or "Create new secret key"
3. Select your Google project (create one if needed)
4. Copy the generated API key

### Step 2: Add API Key to Your Project

1. In your project root, create a `.env` file (if you don't have one):
   ```bash
   cp server/.env.example server/.env
   ```

2. Add your Gemini API key to `server/.env`:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```

### Step 3: Enable Gemini Service

In `server/src/server.js` and `server/src/controllers/chatController.js`:

**Change from:**
```javascript
const dialogflowService = require('./services/mockDialogflowService');
```

**Change to:**
```javascript
const dialogflowService = require('./services/geminiService');
```

### Step 4: Restart Backend Server

```bash
cd server
npm run dev
# or
nodemon src/server.js
```

You should see:
```
✅ Gemini service initialized
🤖 Server running on port 5000
```

## Features

### 1. Context-Aware Conversations
The Gemini service maintains conversation history per session, allowing multi-turn conversations with context awareness.

### 2. System Instructions
The service uses a system prompt to guide Gemini to be a helpful support assistant:
- Friendly and professional tone
- Concise responses
- Support-focused answers

### 3. Intent Detection
Automatically detects intents from responses:
- `billing` - Payment/invoice related
- `technical_issue` - Errors/bugs
- `account_management` - Profile/login issues
- `help` - General assistance
- `information` - Website/product info
- `general` - Other queries

### 4. Confidence Scoring
All responses include a 0.95 confidence score, indicating high confidence in Gemini's responses.

## Testing Gemini

### Test via API
```bash
$body = @{
    userId="test"
    sessionId="test-session-123"
    message="Hello, what can you help me with?"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/chat/send `
    -Method POST `
    -Body $body `
    -ContentType "application/json" | Select-Object -ExpandProperty Content
```

### Test via Web UI
1. Open http://localhost:3000 in your browser
2. Type a message
3. Gemini will respond with contextual answers

## Troubleshooting

### "GEMINI_API_KEY not configured"
- Check that `.env` file exists in the `server/` directory
- Verify `GEMINI_API_KEY` is set correctly (no quotes or extra spaces)
- Restart the backend server after adding the key

### "API call failed"
- Verify your API key is valid at [Google AI Studio](https://aistudio.google.com/)
- Check internet connection
- Monitor rate limits (free tier: 60 requests/minute)

### "Response is too slow"
- Gemini may take 1-2 seconds per response
- This is normal for API-based services
- Free tier has rate limiting

## Switching Between Services

You can quickly switch between different NLP services:

### 1. Mock Service (No API needed)
```javascript
const dialogflowService = require('./services/mockDialogflowService');
```

### 2. Gemini API (Recommended)
```javascript
const dialogflowService = require('./services/geminiService');
```

### 3. Real Dialogflow (Enterprise)
```javascript
const dialogflowService = require('./services/dialogflowService');
```

Just update the import and restart the server!

## API Limits & Pricing

### Free Tier (Generative AI for Google Cloud)
- **Rate Limit:** 60 requests/minute
- **Cost:** Free
- **Requests/day:** Unlimited (within rate limit)
- **Best for:** Development & small-scale deployments

### Paid Tier
See [Google AI Pricing](https://ai.google.dev/pricing) for details.

## Migration Path

1. **Start:** Mock service (development, no dependencies)
2. **Test:** Gemini API (free tier, high quality)
3. **Scale:** Dialogflow + MongoDB (enterprise, persistent storage)

## Questions?

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Google Cloud Console](https://console.cloud.google.com/)
