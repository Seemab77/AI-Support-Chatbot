# Quick Start Guide

Get your AI Chatbot up and running in 10 minutes!

## Prerequisites Check

```bash
# Verify Node.js installed (v14 or higher)
node --version

# Verify npm installed
npm --version
```

## 1. Quick Setup (5 minutes)

### Step 1: Navigate to Your Project
```bash
cd "c:\Users\seema\OneDrive\Desktop\vscode\AI Chatbot Web Application Setup"
```

### Step 2: Backend Setup
```bash
cd server

# Install dependencies
npm install

# Copy environment template
copy .env.example .env

# Edit .env file with your Dialogflow credentials
# (see DIALOGFLOW_SETUP.md for getting credentials)
```

### Step 3: Frontend Setup
```bash
cd ../client

# Install dependencies
npm install

# Verify .env has correct API URL
# Default is http://localhost:5000
```

## 2. Choose Your Path (0-2 minutes)

### 🚀 Path A: Start Immediately (No Billing Needed) ⭐ RECOMMENDED
Use **Mock Dialogflow** - perfect for testing!
- No setup required
- Free responses built-in
- Easy to switch to real Dialogflow later

**How:** Just run the app (steps 3 below) - it works out of the box!

See [MOCK_MODE_GUIDE.md](./MOCK_MODE_GUIDE.md) for details.

---

### 🔮 Path B: Use Real Dialogflow (Optional - With Billing)
If you have billing or want free trial:

1. Go to [Google Cloud Free Trial](https://cloud.google.com/free) - get $300 credit
2. Follow [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md)
3. Get credentials and add to `server/.env`

**⭐ Recommended:** Start with mock mode, switch to real later!

## 3. Run the Application (3 minutes)

### Terminal 1 - Start Backend
```bash
cd server
npm run dev
# ✅ Server running on http://localhost:5000
```

### Terminal 2 - Start Frontend
```bash
cd client
npm start
# ✅ App opens automatically on http://localhost:3000
```

## 4. Test the Chatbot

1. Open http://localhost:3000 in your browser
2. Type: "Hello" 
3. You should see a response!

## Common First-Time Issues

### ❌ "Cannot find module @google-cloud/dialogflow"
```bash
cd server
npm install @google-cloud/dialogflow
```

### ❌ Port 5000 already in use
```bash
# Change port in server/.env
PORT=5001

# Update frontend .env
REACT_APP_API_URL=http://localhost:5001
```

### ❌ CORS error in browser
- Verify `CORS_ORIGIN` in server/.env matches your frontend URL
- Default should be `http://localhost:3000`

### ❌ Socket.IO not connecting
- Ensure backend is running
- Check browser Network tab for WebSocket errors
- Verify `REACT_APP_SOCKET_URL` in frontend/.env

## Project Structure

```
📁 server/              ← Backend Node.js app
   📄 package.json      ← Dependencies
   📁 src/
      📄 server.js      ← Main server file
      📁 services/      ← Dialogflow integration
      📁 routes/        ← API endpoints
      
📁 client/              ← Frontend React app
   📄 package.json
   📁 public/           ← Static files
   📁 src/
      📁 components/    ← React components
      📁 services/      ← API client
      📁 styles/        ← CSS files
```

## Key Features to Try

### 1. Basic Chat
- Type a greeting message
- See AI response with intent detection

### 2. View Intent
- Each bot message shows the detected intent
- Try different topics to see different intents

### 3. Conversation History
- Messages are saved in the session
- Close and reopen to start new session

### 4. Connection Status
- Green dot = connected via Socket.IO
- Red dot = using REST API fallback

### 5. Real-time Indicators
- See typing indicator when bot responds
- Check message timestamps

## API Testing (Optional)

### Start Conversation
```bash
curl -X POST http://localhost:5000/api/chat/start \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'
```

### Send Message
```bash
curl -X POST http://localhost:5000/api/chat/send \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello",
    "sessionId": "your-session-id-here"
  }'
```

## Database Setup (Optional)

If you want to save conversation history:

1. Install MongoDB locally or use MongoDB Atlas (free)
2. Add connection string to `server/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ai-chatbot
   ```
3. Restart backend

## Next Steps

✅ Now that it's running:

1. **Customize Intents**
   - Edit intents in Dialogflow Console
   - Add more training phrases

2. **Style the Chatbot**
   - Edit CSS in `client/src/styles/`
   - Customize colors and layout

3. **Deploy**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup

4. **Add Authentication**
   - Implement user login
   - Track conversation per user

5. **Integrate with Website**
   - Embed chatbot widget in your website
   - Add custom styling

## Development Commands

### Backend
```bash
npm start      # Production mode
npm run dev    # Development with auto-reload
npm test       # Run tests
```

### Frontend
```bash
npm start      # Development server with hot reload
npm run build  # Create production build
npm test       # Run tests
npm run eject  # Advanced: customize build config
```

## Debugging

### Enable Verbose Logging
```bash
# Backend
set DEBUG=* & npm run dev        # Windows
DEBUG=* npm run dev              # macOS/Linux

# Frontend - check browser console (F12)
```

### Check Dialogflow Connection
```bash
# In backend terminal
node -e "
require('dotenv').config();
const df = require('@google-cloud/dialogflow');
console.log('Project ID:', process.env.DIALOGFLOW_PROJECT_ID);
console.log('✅ Config loaded');
"
```

## File Structure Reference

| File | Purpose |
|------|---------|
| `server/src/server.js` | Main backend server with Express & Socket.IO |
| `server/src/services/dialogflowService.js` | Dialogflow API integration |
| `client/src/components/ChatBox.js` | Main chat UI component |
| `client/src/services/api.js` | Frontend API client |
| `.env.example` | Environment variables template |

## Stopping the Application

```bash
# In each terminal, press Ctrl + C

# On Windows, if stuck:
# Find and kill processes
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Get Help

1. Check [README.md](./README.md) for comprehensive documentation
2. See [DIALOGFLOW_SETUP.md](./DIALOGFLOW_SETUP.md) for Dialogflow help
3. See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
4. Check browser console for frontend errors (F12)
5. Check terminal output for backend errors

## Pro Tips

💡 **Tip 1:** Use `npm install -g nodemon` for auto-restart on code changes
```bash
npm run dev  # Uses nodemon in development
```

💡 **Tip 2:** Keep browser DevTools open to debug
- F12 → Console tab for frontend errors
- Network tab to see API requests

💡 **Tip 3:** Test API endpoints with Postman/Insomnia
- Easier than curl for testing

💡 **Tip 4:** Store environment variables securely
- Never commit .env to git
- Use .env.example as template

💡 **Tip 5:** Check Dialogflow logs
- Go to Dialogflow Console
- View interaction logs to improve bot

## Performance Tips

- Use Socket.IO for production (faster than REST)
- Enable message compression
- Implement caching for common responses
- Monitor API rate limits

## Security Reminders

🔒 Before Production:
- Never commit `.env` to Git
- Use strong `SESSION_SECRET`
- Enable HTTPS in production
- Implement rate limiting
- Validate all user inputs

## Checklist

- [ ] Node.js v14+ installed
- [ ] npm installed
- [ ] Dialogflow credentials obtained
- [ ] `.env` file created with credentials
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can see chatbot UI in browser
- [ ] Can send/receive messages

## Success! 🎉

You now have a working AI chatbot! Next:
- Customize the styling
- Add more intents
- Integrate with your website
- Deploy to production

Happy chatting! 💬

---

**Need help?** See the full [README.md](./README.md)

**Ready to deploy?** See [DEPLOYMENT.md](./DEPLOYMENT.md)
