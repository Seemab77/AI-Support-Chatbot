# OpenAI GPT API Setup Guide

This guide explains how to enable OpenAI's GPT models for your AI chatbot.

## What is OpenAI GPT?

OpenAI provides state-of-the-art language models:
- ✅ GPT-3.5-turbo (fast, affordable, recommended)
- ✅ GPT-4 (most advanced, higher accuracy)
- ✅ Excellent conversational abilities
- ✅ Context-aware multi-turn conversations
- ✅ Pay-as-you-go pricing

## Getting Your API Key

### Step 1: Create OpenAI Account
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up for a new account or log in
3. Click on your profile → "Billing overview"
4. Add a payment method (required, but you control spending limits)

### Step 2: Generate API Key
1. Go to [API Keys page](https://platform.openai.com/account/api-keys)
2. Click "Create new secret key"
3. Copy the generated key (you won't see it again)
4. Store it safely

### Step 3: Set Spending Limits (Recommended)
1. Go to [Billing → Usage limits](https://platform.openai.com/account/billing/limits)
2. Set a monthly usage limit to avoid unexpected charges
3. Example: $5-20/month for testing

## Add API Key to Your Project

1. In your project root, create a `.env` file (if you don't have one):
   ```bash
   cp server/.env.example server/.env
   ```

2. Add your OpenAI API key to `server/.env`:
   ```
   OPENAI_API_KEY=sk-...your-actual-key...
   OPENAI_MODEL=gpt-3.5-turbo
   ```

### Model Options

- **`gpt-3.5-turbo`** (Recommended - Default)
  - Fast responses (~1-2 seconds)
  - Affordable (~$0.001 per 1K tokens)
  - Good quality for support chat
  
- **`gpt-4`**
  - Higher accuracy and reasoning
  - Slower responses (~5-10 seconds)
  - More expensive (~$0.03 per 1K tokens)
  - Best for complex queries

To use GPT-4, update `.env`:
```
OPENAI_MODEL=gpt-4
```

## Enable OpenAI Service

In `server/src/server.js` and `server/src/controllers/chatController.js`:

**Change from:**
```javascript
const dialogflowService = require('./services/mockDialogflowService');
```

**Change to:**
```javascript
const dialogflowService = require('./services/openaiService');
```

## Restart Backend Server

```bash
cd server
npm run dev
# or
nodemon src/server.js
```

You should see:
```
✅ OpenAI service initialized
🤖 Server running on port 5000
```

## Features

### 1. Multi-Turn Conversations
- OpenAI automatically maintains conversation context
- Remembers previous messages in the same session
- Provides contextual responses

### 2. System Instructions
The service uses system prompts to guide the AI:
- Professional support assistant tone
- Concise responses
- Support-focused domain

### 3. Intent Detection
Automatically detects intents from responses:
- `billing` - Payment/invoice related
- `technical_issue` - Errors/bugs
- `account_management` - Profile/login issues
- `help` - General assistance
- `information` - Website/product info
- `general` - Other queries

### 4. Flexible Temperature
Default temperature: 0.7 (balanced between creativity and consistency)
- Lower (0.0-0.5): More deterministic
- Higher (0.8-1.0): More creative

## Testing OpenAI

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
2. Type a message like "How are you?"
3. OpenAI will respond intelligently

## Pricing

### GPT-3.5-turbo
- **Input:** $0.0005 per 1K tokens
- **Output:** $0.0015 per 1K tokens
- **Example:** 100 messages with ~100 tokens each ≈ $0.02-0.05

### GPT-4
- **Input:** $0.03 per 1K tokens
- **Output:** $0.06 per 1K tokens
- **Example:** 100 messages with ~100 tokens each ≈ $0.30-0.60

### Estimate Your Usage
1. Average conversation: ~100 tokens per message
2. Typical session: ~10-20 messages
3. Monthly for 1000 users: ~$20-100 (GPT-3.5)

See [OpenAI Pricing](https://openai.com/pricing) for current rates.

## Troubleshooting

### "OPENAI_API_KEY not configured"
- Check that `.env` file exists in the `server/` directory
- Verify `OPENAI_API_KEY` is set correctly (starts with `sk-`)
- No quotes or extra spaces allowed
- Restart the backend server after adding the key

### "Unauthorized" or "Invalid API key"
- Verify API key at [OpenAI Dashboard](https://platform.openai.com/account/api-keys)
- Check if key has been revoked/rotated
- Ensure no extra spaces or line breaks in `.env`

### "Rate limit exceeded"
- Free trial has strict limits
- Upgrade to paid account or wait for quota reset
- Check usage at [OpenAI Billing](https://platform.openai.com/account/billing/overview)

### "Slow responses"
- GPT-4 is naturally slower than GPT-3.5
- Network latency may affect speed
- Typical response time: 1-3 seconds

### "Unexpected charges"
- Always set spending limits in billing settings
- Monitor usage at [Usage page](https://platform.openai.com/account/billing/usage)
- Use GPT-3.5-turbo for cost efficiency

## Switching Between Services

You can quickly switch between different NLP services:

### 1. Mock Service (No API needed)
```javascript
const dialogflowService = require('./services/mockDialogflowService');
```

### 2. Gemini API (Free tier)
```javascript
const dialogflowService = require('./services/geminiService');
```

### 3. OpenAI GPT (Production-ready)
```javascript
const dialogflowService = require('./services/openaiService');
```

### 4. Real Dialogflow (Enterprise)
```javascript
const dialogflowService = require('./services/dialogflowService');
```

Just update the import and restart the server!

## Production Checklist

- ✅ Set spending limits in OpenAI dashboard
- ✅ Use GPT-3.5-turbo for cost efficiency
- ✅ Monitor API usage regularly
- ✅ Implement rate limiting on your backend
- ✅ Cache common responses if possible
- ✅ Set reasonable max_tokens limit (500 in service)
- ✅ Use environment variables for API keys
- ✅ Test error handling (API outages)

## Migration Path

1. **Start:** Mock service (development, free)
2. **Test:** Gemini API (free tier, high quality)
3. **Production:** OpenAI GPT (reliable, production-ready)
4. **Scale:** Dialogflow + MongoDB (enterprise, persistent storage)

## Questions?

- [OpenAI Documentation](https://platform.openai.com/docs)
- [API Reference](https://platform.openai.com/docs/api-reference)
- [Community Forum](https://community.openai.com/)
- [API Status](https://status.openai.com/)
