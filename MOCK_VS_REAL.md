# Mock vs Real Dialogflow - Quick Switch Guide

## Current Setup

Your app comes with **2 NLP options:**

### 1️⃣ **Mock Dialogflow** (Currently Active)
- ✅ No setup needed
- ✅ No billing required
- ✅ Works immediately
- ✅ Perfect for development
- ✅ Great for testing UI

**File:** `server/src/services/mockDialogflowService.js`

### 2️⃣ **Real Dialogflow**
- ✅ Real NLP AI
- ✅ Requires Google Cloud credentials
- ✅ Requires billing ($300 free trial available)
- ✅ Better accuracy
- ✅ Perfect for production

**File:** `server/src/services/dialogflowService.js`

---

## How to Switch

### Currently Using: Mock Mode (No Setup)

Your `server/src/server.js` line should be:
```javascript
// Mock mode - no billing needed!
const dialogflowService = require('./services/mockDialogflowService');
```

**This is the default.** Just run `npm run dev` and you're done!

---

### To Switch to Real Dialogflow

1. **Get Credentials** (See [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md))
   
2. **Create .env file** in `server/` folder:
   ```
   DIALOGFLOW_PROJECT_ID=your-project-id
   DIALOGFLOW_PRIVATE_KEY=your-private-key
   DIALOGFLOW_CLIENT_EMAIL=your-email@project.iam.gserviceaccount.com
   # ... other credentials
   ```

3. **Edit** `server/src/server.js` - find this line:
   ```javascript
   const dialogflowService = require('./services/mockDialogflowService');
   ```

   **Replace with:**
   ```javascript
   const dialogflowService = require('./services/dialogflowService');
   ```

4. **Restart server:**
   ```bash
   npm run dev
   ```

---

### Back to Mock Mode

If real Dialogflow breaks or you want to test without it:

Change in `server/src/server.js`:
```javascript
// Change from:
const dialogflowService = require('./services/dialogflowService');

// To:
const dialogflowService = require('./services/mockDialogflowService');
```

Restart: `npm run dev`

---

## Comparison

| Feature | Mock | Real Dialogflow |
|---------|------|-----------------|
| **Setup Time** | 0 seconds | 20-30 min |
| **Billing Required** | ❌ No | ⚠️ Yes ($) |
| **Free Trial** | ✅ Yes | ✅ $300 credit |
| **NLP Accuracy** | Good | Excellent |
| **Custom Training** | Limited | ✅ Full |
| **Production Ready** | ❌ No | ✅ Yes |
| **Development** | ✅ Best | ❌ Overkill |
| **Testing** | ✅ Best | ❌ Slower |

---

## Real Dialogflow Free Trial

Google Cloud offers **$300 free credit** for 90 days:

1. Go to [https://cloud.google.com/free](https://cloud.google.com/free)
2. Click "Start free"
3. Add payment method (won't charge)
4. Get $300 credit
5. Enable Dialogflow API
6. Create service account
7. Download credentials
8. Add to `.env`
9. Switch import in `server.js`

**Total cost if you don't exceed credits: $0**

---

## My Recommendation

**Phase 1 - Development (RIGHT NOW):**
- Use Mock mode
- Build features
- Test UI/UX
- Takes 5 minutes

**Phase 2 - Testing (Next week):**
- Get free trial
- Get real Dialogflow credentials
- Train custom intents
- Takes 20 minutes

**Phase 3 - Production:**
- Keep using real Dialogflow
- Monitor usage
- Scale as needed

---

## Mock Mode - What Intents Are Supported?

Default mock responses include:

```
"hello" → greeting
"help" → help offer
"about" → website info
"speak to agent" → contact
"bye" → goodbye
"thanks" → thank you
```

**Easy to add more!** Edit `mockDialogflowService.js`

---

## Common Issues

**❌ "Cannot find module"**
```bash
# Make sure in server folder
cd server
npm install
npm run dev
```

**❌ "Module not found: mockDialogflowService"**
- Check file exists: `server/src/services/mockDialogflowService.js`
- Check import path is correct

**❌ "Real Dialogflow not working"**
- Check `.env` has all credentials
- Check file path: `server/src/services/dialogflowService.js`
- Test credentials: `node -e "require('dotenv').config(); console.log(process.env.DIALOGFLOW_PROJECT_ID)"`

---

## Test Both

Try this workflow:

```bash
# 1. Test mock mode
npm run dev
# Visit http://localhost:3000
# Try: "hello", "help", "bye"

# 2. Switch to real (if credentials ready)
# Edit server/src/server.js (change import)
npm run dev
# Visit http://localhost:3000
# Test with real AI
```

---

## Recommendation Summary

🚀 **Start now with mock mode** - 0 seconds setup
📱 **Build your app** - focus on features
🔄 **Switch when ready** - to real Dialogflow
💰 **Free trial** - $300 credit available

You're set up to go! 🎉

---

See [MOCK_MODE_GUIDE.md](./MOCK_MODE_GUIDE.md) for more mock details.
See [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md) for real Dialogflow setup.
