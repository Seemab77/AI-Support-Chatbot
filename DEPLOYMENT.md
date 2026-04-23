# Deployment Guide

This guide covers deploying the AI Chatbot to production environments.

## Deployment Options

### Option 1: Deploy to Heroku

#### Backend Deployment

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**
   ```bash
   cd server
   heroku login
   heroku create ai-chatbot-backend
   ```

3. **Add Environment Variables**
   ```bash
   heroku config:set DIALOGFLOW_PROJECT_ID=your-project-id
   heroku config:set DIALOGFLOW_PRIVATE_KEY="your-private-key"
   # Add other environment variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

#### Frontend Deployment (Netlify)

1. **Build Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=build
   ```

3. **Set Environment Variables**
   - In Netlify dashboard
   - Settings → Build & deploy → Environment
   - Add `REACT_APP_API_URL=https://your-heroku-app.herokuapp.com`

### Option 2: Deploy to AWS

#### Backend (Elastic Beanstalk)

1. **Install AWS CLI**
   ```bash
   pip install awscli
   aws configure
   ```

2. **Initialize Elastic Beanstalk**
   ```bash
   cd server
   eb init -p node.js-18 ai-chatbot-backend
   ```

3. **Create Environment**
   ```bash
   eb create production
   ```

4. **Configure Environment Variables**
   ```bash
   eb setenv DIALOGFLOW_PROJECT_ID=your-project-id
   # Set other variables
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

#### Frontend (CloudFront + S3)

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://ai-chatbot-frontend
   ```

2. **Build and Upload**
   ```bash
   cd client
   npm run build
   aws s3 sync build/ s3://ai-chatbot-frontend --delete
   ```

3. **Create CloudFront Distribution**
   - Point to S3 bucket as origin
   - Set default root object to `index.html`

### Option 3: Deploy to DigitalOcean App Platform

1. **Connect GitHub Repository**
   - Push your code to GitHub
   - Connect DigitalOcean to GitHub

2. **Create App**
   - Specify backend and frontend services
   - Configure environment variables
   - Set build commands

3. **Deploy**
   - Click "Deploy"
   - DigitalOcean handles builds and deployments

## Production Configuration

### Environment Variables

```env
# Backend Production
NODE_ENV=production
PORT=8080
DIALOGFLOW_PROJECT_ID=your-prod-project-id
DIALOGFLOW_PRIVATE_KEY=your-prod-key
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ai-chatbot
CORS_ORIGIN=https://yourdomain.com
SESSION_SECRET=your-strong-secret-key

# Frontend Production
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_SOCKET_URL=https://api.yourdomain.com
```

### Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster

2. **Create Database**
   - Name it: `ai-chatbot`
   - Create collections for conversations

3. **Get Connection String**
   - Copy connection string
   - Replace username/password
   - Add to `MONGODB_URI`

## Performance Optimization

### Backend
```javascript
// Add caching middleware
const cache = require('express-cache-middleware');
app.use(cache());

// Compression
const compression = require('compression');
app.use(compression());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### Frontend
- Enable gzip compression
- Minify CSS and JavaScript
- Use CDN for static assets
- Implement lazy loading
- Cache API responses

## SSL/TLS Configuration

### Using Let's Encrypt with Nginx

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location /api/ {
        proxy_pass http://localhost:5000;
    }

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

## Monitoring and Logging

### Logging Setup

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Error Tracking

```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'your-sentry-dsn' });
app.use(Sentry.Handlers.errorHandler());
```

## Backup and Recovery

### Database Backups

```bash
# MongoDB backup
mongodump --uri="mongodb+srv://user:password@cluster.mongodb.net/ai-chatbot" --out=./backup

# MongoDB restore
mongorestore --uri="mongodb+srv://user:password@cluster.mongodb.net/ai-chatbot" ./backup
```

## Scaling

### Horizontal Scaling

1. **Load Balancing**
   - Use load balancer (AWS ALB, Nginx)
   - Route traffic across instances

2. **Auto-scaling**
   - Set up auto-scaling policies
   - Scale based on CPU/memory usage

3. **Database Replication**
   - Set up MongoDB replica sets
   - Enable automatic failover

## Post-Deployment

1. **Health Checks**
   ```bash
   curl https://yourdomain.com/health
   ```

2. **Test All Features**
   - Send test messages
   - Verify database connections
   - Check logs

3. **Monitor Logs**
   ```bash
   # View application logs
   heroku logs --tail
   # or
   eb logs
   ```

4. **Setup Alerts**
   - Error rate monitoring
   - Response time tracking
   - Uptime monitoring

## Rollback Procedure

### Heroku
```bash
heroku releases
heroku rollback v<number>
```

### AWS Elastic Beanstalk
```bash
eb deploy --version <version-label>
```

## Domain Configuration

1. **Register Domain**
   - Buy domain from registrar

2. **DNS Records**
   - Point A record to server IP
   - For Heroku/DigitalOcean, use CNAME

3. **SSL Certificate**
   - Auto-renewal with Let's Encrypt
   - Valid for 90 days

## Maintenance

- Regular backups (daily)
- Update dependencies monthly
- Monitor performance metrics
- Review security logs
- Scale resources as needed

## Troubleshooting

### App Not Responding
1. Check server logs
2. Verify database connection
3. Check memory/CPU usage
4. Restart application

### Database Issues
1. Check connection string
2. Verify credentials
3. Check network access
4. Review database logs

### Performance Issues
1. Profile application
2. Optimize queries
3. Implement caching
4. Scale infrastructure

## Cost Optimization

- Use free tier services where applicable
- Monitor API usage
- Optimize database indexing
- Use CDN for static content
- Implement auto-shutdown for unused resources

---

**Last Updated:** April 21, 2026
