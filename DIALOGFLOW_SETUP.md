# Dialogflow Setup Guide

## ⭐ Don't Have Billing? Start Here!

**Option 1: Use Mock Mode (Recommended - No Setup)**
- Start immediately with built-in mock AI responses
- No billing or credentials needed
- See [MOCK_MODE_GUIDE.md](./MOCK_MODE_GUIDE.md)

**Option 2: Get Free Trial**
- Google Cloud gives **$300 free credit** for 90 days
- No charges until you exceed the limit
- Perfect for testing real Dialogflow

---

## Prerequisites

- Google Cloud Account
- Project billing enabled
- Basic knowledge of intents and entities

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a Project" → "New Project"
3. Enter project name: `ai-chatbot` (or your preferred name)
4. Click "Create"
5. Wait for project creation

## Step 2: Enable Dialogflow API

1. In the Cloud Console, navigate to "APIs & Services" → "Library"
2. Search for "Dialogflow"
3. Click on "Dialogflow API"
4. Click "Enable"
5. Wait for the API to be enabled

## Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Enter service account name: `dialogflow-bot`
4. Click "Create and Continue"
5. Grant the following roles:
   - Dialogflow API Admin
   - Click "Continue"
6. Click "Done"

## Step 4: Create and Download Key

1. In Credentials page, find your service account under "Service Accounts"
2. Click on the service account email
3. Go to "Keys" tab
4. Click "Add Key" → "Create new key"
5. Choose "JSON" format
6. Click "Create"
7. The JSON key will be downloaded automatically

## Step 5: Add Credentials to .env

1. Open the downloaded JSON file
2. In your server `.env` file, add:

```env
DIALOGFLOW_PROJECT_ID=<project_id from JSON>
DIALOGFLOW_PRIVATE_KEY_ID=<private_key_id from JSON>
DIALOGFLOW_PRIVATE_KEY=<private_key from JSON (keep the \n characters)>
DIALOGFLOW_CLIENT_EMAIL=<client_email from JSON>
DIALOGFLOW_CLIENT_ID=<client_id from JSON>
DIALOGFLOW_AUTH_URI=<auth_uri from JSON>
DIALOGFLOW_TOKEN_URI=<token_uri from JSON>
```

**Important:** When copying the private_key, keep the `\n` escape sequences as they are.

## Step 6: Create Dialogflow Agent

### Via Google Cloud Console

1. Go to [Dialogflow Console](https://dialogflow.cloud.google.com)
2. Select your project
3. Click "Create Agent"
4. Enter agent name: `support-bot` (or your preferred name)
5. Select language: English
6. Click "Create"

### Create Intents

An intent represents a user's intention. Create sample intents:

#### Intent 1: Greeting
- **Display name:** `greeting`
- **Training phrases:**
  - Hello
  - Hi
  - Good morning
  - Hey there
- **Responses:**
  - Hi! How can I help you today?
  - Hello! What can I assist you with?

#### Intent 2: Help
- **Display name:** `get_help`
- **Training phrases:**
  - I need help
  - Can you help me?
  - What can you do?
  - I have a question
- **Responses:**
  - I'm here to help! What do you need assistance with?
  - Sure! What's your question?

#### Intent 3: Website Information
- **Display name:** `website_info`
- **Training phrases:**
  - Tell me about your website
  - What is this website about?
  - What do you offer?
  - Information about services
- **Responses:**
  - Our website provides AI-powered support solutions for businesses.

#### Intent 4: Contact Support
- **Display name:** `contact_support`
- **Training phrases:**
  - I want to speak to someone
  - Connect me to support
  - Human agent
  - Talk to a representative
- **Responses:**
  - I'm escalating you to our support team. They'll be with you shortly.

#### Intent 5: Goodbye
- **Display name:** `goodbye`
- **Training phrases:**
  - Bye
  - Goodbye
  - See you later
  - Thanks, bye
- **Responses:**
  - Goodbye! Have a great day!
  - Thanks for chatting. Bye!

## Step 7: Test Your Agent

1. In Dialogflow Console, go to "Integrations" → "Google Cloud Console"
2. Click the "Agent" tab
3. Use the test console on the right to test your intents
4. Type: "Hello" and see if it recognizes the greeting intent

## Step 8: Configure Fulfillment (Optional)

For custom responses:

1. Go to "Fulfillment" in the left menu
2. Enable "Webhook"
3. Enter your backend webhook URL: `https://yourdomain.com/api/chat/webhook`
4. Click "Save"

## Testing the Integration

```bash
# In your backend, test the connection
node -e "
require('dotenv').config();
const dialogflow = require('@google-cloud/dialogflow');
const client = new dialogflow.SessionsClient({
  credentials: {
    project_id: process.env.DIALOGFLOW_PROJECT_ID,
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY?.replace(/\\\\n/g, '\n'),
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  }
});
console.log('✅ Dialogflow connected successfully!');
"
```

## Entities (Optional)

Create entities to improve intent recognition:

### Entity: Support Categories
- Synonyms:
  - `billing`, `payment`, `invoice`, `price`
  - `technical`, `bug`, `error`, `issue`
  - `account`, `login`, `password`, `registration`

## Webhooks and Custom Logic

To send custom responses:

1. Create a webhook endpoint in your backend
2. Configure it in Dialogflow Fulfillment settings
3. Handle requests in your backend service

Example webhook handler:

```javascript
app.post('/api/chat/webhook', async (req, res) => {
  const { queryResult } = req.body;
  const intent = queryResult.intent.displayName;
  
  let response = 'How can I help?';
  
  if (intent === 'get_help') {
    response = 'We offer support for billing, technical issues, and account management.';
  }
  
  res.json({
    fulfillmentText: response
  });
});
```

## Troubleshooting

### Cannot Create Project
- Ensure billing is enabled
- Check project quota limits
- Verify account permissions

### API Not Enabled
- Go to APIs & Services → Library
- Search and enable Dialogflow API
- Wait a few minutes for activation

### Authentication Error
- Verify service account has correct role
- Check .env file for correct credentials
- Test credentials with sample code

### Intent Not Recognizing
- Add more training phrases (at least 5-10)
- Use varied language and phrasing
- Check intent priority order
- Verify no conflicting intents

## Best Practices

1. **Training Data**
   - Use 10+ training phrases per intent
   - Include variations and misspellings
   - Use real user language

2. **Intent Management**
   - Keep intent names lowercase with underscores
   - Group related intents
   - Use default fallback intent

3. **Monitoring**
   - Check interaction logs regularly
   - Update intents based on unrecognized queries
   - Monitor confidence scores

4. **Performance**
   - Limit context (turn count)
   - Clean up old conversations
   - Monitor API quota usage

## Resources

- [Dialogflow Documentation](https://cloud.google.com/dialogflow/es/docs)
- [Intent Building Guide](https://cloud.google.com/dialogflow/es/docs/intents-overview)
- [Entity Building Guide](https://cloud.google.com/dialogflow/es/docs/entities-overview)
- [Webhook Guide](https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook)

## Next Steps

- Set up analytics
- Create conversation flows
- Configure integrations
- Deploy to production
