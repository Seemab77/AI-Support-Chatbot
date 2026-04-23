# Using Mock Dialogflow (No Billing Required)

## Quick Start - Use Mock Mode

Your chatbot is now ready to use **without any Dialogflow credentials!**

### Step 1: Update Server Config

Edit `server/src/server.js` and change this line:

**Find:**
```javascript
const dialogflowService = require('./services/dialogflowService');
```

**Replace with:**
```javascript
// Use mock service for development (no billing needed)
const dialogflowService = require('./services/mockDialogflowService');

// Or use real Dialogflow when ready:
// const dialogflowService = require('./services/dialogflowService');
```

### Step 2: Skip .env Setup

You **do NOT need** to set up `.env` file for mock mode!

### Step 3: Run Your Chatbot

```bash
# Terminal 1 - Backend
cd server
npm install  # if not done yet
npm run dev
# ✅ Server running on http://localhost:5000

# Terminal 2 - Frontend
cd client
npm install  # if not done yet
npm start
# ✅ Frontend on http://localhost:3000
```

### Step 4: Test It

Open http://localhost:3000 and try:
- "Hello"
- "Can you help me?"
- "Tell me about your website"
- "I want to speak to someone"
- "Thanks!"

**Everything works!** ✅

---

## What's in Mock Mode?

The mock service recognizes these intents:

| Intent | Try These | Response |
|--------|-----------|----------|
| **greeting** | hello, hi, good morning | Welcome message |
| **help** | help, need help, can you assist | Offer support options |
| **website_info** | about, tell me about, company info | Website description |
| **contact** | speak to agent, human, representative | Escalation message |
| **goodbye** | bye, farewell, exit | Goodbye message |
| **thanks** | thank you, thanks, appreciate | Thank you response |

---

## Switching to Real Dialogflow Later

When you have billing set up:

1. Get Dialogflow credentials (see [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md))
2. Create `.env` file in `server/` folder
3. Add credentials to `.env`
4. Change import in `server/src/server.js` back to real service
5. Restart server

```javascript
// Use real Dialogflow
const dialogflowService = require('./services/dialogflowService');
```

---

## Customizing Mock Responses

Edit `server/src/services/mockDialogflowService.js` to add more intents:

```javascript
your_intent: {
  patterns: ['keyword1', 'keyword2', 'keyword3'],
  responses: [
    "Response option 1",
    "Response option 2",
    "Response option 3"
  ]
}
```

**Example:**

```javascript
order_status: {
  patterns: ['order', 'track order', 'where is my package'],
  responses: [
    "Your order is being prepared and will ship within 24 hours.",
    "I can help track your order! What's your order number?",
    "Let me check your order status..."
  ]
}
```

---

## Testing Without Frontend

Test via API:

```bash
# Start conversation
$SESSION_ID = (curl -X POST http://localhost:5000/api/chat/start `
  -H "Content-Type: application/json" `
  -d '{"userId":"test"}' | ConvertFrom-Json).sessionId

# Send message
curl -X POST http://localhost:5000/api/chat/send `
  -H "Content-Type: application/json" `
  -d "{`"message`":`"Hello`",`"sessionId`":`"$SESSION_ID`"}"
```

---

## Advantages of Mock Mode

✅ **Start immediately** - no setup needed
✅ **Test UI/UX** - focus on frontend
✅ **Develop features** - work on backend logic
✅ **No costs** - completely free
✅ **Easy switching** - swap to real Dialogflow anytime

---

## When to Move to Real Dialogflow?

When you:
- Need better NLP accuracy
- Have production-ready UI
- Get Google Cloud free trial ($300)
- Have specific business intents

---

## Free Trial Alternative

**Still want real Dialogflow?** Get free trial:

1. Go to [Google Cloud Free Trial](https://cloud.google.com/free)
2. Click "Start free"
3. $300 credit - lasts 90 days
4. No charge until you exceed limit
5. Follow [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md)

---

## Features Working in Mock Mode

✅ Session management
✅ Conversation history
✅ Real-time Socket.IO
✅ Intent detection
✅ Confidence scoring (simulated)
✅ REST API
✅ UI animations
✅ All frontend features

---

## Troubleshooting

**Q: Messages not responding?**
- Check terminal 1 is running backend
- Make sure using `mockDialogflowService`
- Restart backend server

**Q: Want to add custom responses?**
- Edit `mockDialogflowService.js`
- Add new intent to `this.responses`
- Restart server

**Q: Ready to use real Dialogflow?**
- See [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md)
- Or get free trial first

---

## Next Steps

1. ✅ Run backend & frontend (should be working now!)
2. ✅ Test chatbot with mock responses
3. ⏭️ Customize mock responses for your use case
4. ⏭️ Build out frontend features
5. ⏭️ Get real Dialogflow when ready

**You're all set!** Start developing! 🚀

---

**Need help?** Check main [README.md](./README.md) or [QUICKSTART.md](./QUICKSTART.md)
