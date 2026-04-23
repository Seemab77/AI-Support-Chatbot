# NO BILLING? GET STARTED IN 5 MINUTES! 🚀

## You Can Start RIGHT NOW - No Setup Required!

Your app comes with **Mock Dialogflow** built-in. It works immediately!

---

## Step 1: Terminal 1 - Start Backend

```powershell
cd server
npm install
npm run dev
```

**Expected output:**
```
✅ Server running on port 5000
Environment: development
```

---

## Step 2: Terminal 2 - Start Frontend

```powershell
cd client
npm install
npm start
```

**Expected output:**
```
✅ App opens in browser on http://localhost:3000
```

---

## Step 3: Test Your Chatbot! 

Open **http://localhost:3000** and try:
- Type: `"Hello"`
- Type: `"Can you help me?"`
- Type: `"Tell me about your website"`
- Type: `"I want to speak to someone"`
- Type: `"Bye"`

✅ **It works!** Your AI chatbot is live!

---

## That's It! ✅

You now have a fully working AI chatbot without any billing!

### Features Working:
✅ Chat UI
✅ Real-time messages
✅ Intent detection
✅ Conversation history
✅ API endpoints
✅ Socket.IO

---

## Want to Customize?

### Add More Responses

Edit `server/src/services/mockDialogflowService.js`

Find this section:
```javascript
this.responses = {
  greeting: {
    patterns: ['hello', 'hi', 'hey'],
    responses: [
      "Hi! I'm here to help...",
    ]
  },
  // Add your own intent here:
  faq: {
    patterns: ['what is', 'how does', 'tell me'],
    responses: [
      "Your custom response here"
    ]
  }
}
```

Restart: `npm run dev`

---

## Upgrade to Real Dialogflow Later

When ready, get real AI:

1. Go to [Google Cloud Free Trial](https://cloud.google.com/free)
2. Get $300 credit
3. See [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md)
4. Change one line in `server/src/server.js`
5. Done!

---

## Troubleshooting

**❌ "npm command not found"**
- Install Node.js from https://nodejs.org

**❌ Port 5000 in use**
- Kill process or change PORT in `server/.env`

**❌ Messages not responding**
- Check terminal 1 (backend) is running
- Restart with `npm run dev`

---

## Full Documentation

- [MOCK_MODE_GUIDE.md](./MOCK_MODE_GUIDE.md) - Mock mode details
- [README.md](./README.md) - Full documentation
- [QUICKSTART.md](./QUICKSTART.md) - 10-minute setup

---

## Next Steps

1. ✅ Backend running (terminal 1)
2. ✅ Frontend running (terminal 2)
3. ✅ Chatbot working at http://localhost:3000
4. ⏭️ Customize responses (edit mockDialogflowService.js)
5. ⏭️ Build your features
6. ⏭️ Deploy to production

**You're all set!** 🎉

---

**Questions?** Check [MOCK_MODE_GUIDE.md](./MOCK_MODE_GUIDE.md) or [README.md](./README.md)
