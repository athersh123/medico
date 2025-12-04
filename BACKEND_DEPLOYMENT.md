# Backend Deployment Guide for Medicor API

## 🚀 Deploy Backend to Railway (Recommended)

Railway offers a free tier and is easy to deploy.

### Step 1: Prepare Backend

1. **Create separate package.json for backend** (already exists in `/server`)

2. **Verify server/package.json has these scripts:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

3. **Environment Variables Needed:**
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `PORT` - Port number (Railway sets this automatically)
   - `EMAIL_PASSWORD` - Gmail app password for contact form

---

## 🛤️ Deploy to Railway

### Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account (free)
3. Create new cluster (free M0 tier)
4. Create database user
5. Whitelist all IPs: `0.0.0.0/0` (for Railway access)
6. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/medicor?retryWrites=true&w=majority
   ```

### Step 2: Deploy to Railway

1. **Go to Railway**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub
   - Select your medicor repository

3. **Configure Service**
   - Railway will auto-detect Node.js
   - Set **Root Directory**: `server`
   - Set **Start Command**: `node server.js`
   - Or let Railway auto-detect (it usually does)

4. **Add Environment Variables**
   - Go to Variables tab
   - Add these variables:
   
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medicor?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-key-change-this-in-production-12345
   EMAIL_PASSWORD=your-gmail-app-password
   ```

5. **Deploy**
   - Railway will automatically build and deploy
   - Wait 2-3 minutes
   - Check logs for "Connected to MongoDB"

6. **Get Your Backend URL**
   - Go to Settings tab
   - Find "Public Domain"
   - Copy URL (e.g., `medicor-api.up.railway.app`)
   - Test: Visit `https://your-url.railway.app/api/health`

---

## 🎨 Alternative: Deploy to Render

### Step 1: Setup

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"

### Step 2: Configure

```
Name: medicor-api
Root Directory: server
Environment: Node
Build Command: npm install
Start Command: node server.js
```

### Step 3: Environment Variables

Add in Render dashboard:
```
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
EMAIL_PASSWORD=your-gmail-app-password
```

### Step 4: Deploy

- Click "Create Web Service"
- Wait for build to complete
- Get URL from dashboard

---

## 🔧 Alternative: Deploy to Heroku

### Prerequisites
```bash
# Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

### Deploy Steps

```bash
# Login to Heroku
heroku login

# Navigate to server directory
cd d:\medicor\server

# Initialize git if not already
git init
git add .
git commit -m "Initial server commit"

# Create Heroku app
heroku create medicor-api-backend

# Set environment variables
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-secret-key"
heroku config:set EMAIL_PASSWORD="your-gmail-app-password"

# Deploy
git push heroku main

# Open app
heroku open

# View logs
heroku logs --tail
```

---

## 🔐 Update Backend CORS for Production

After deploying frontend to Netlify, update CORS in `server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-site.netlify.app',      // Add your Netlify URL
    'https://medicor-ai.netlify.app',     // Example
    'https://your-custom-domain.com'       // If you have one
  ],
  credentials: true
}));
```

**Important:** Add your actual Netlify URL!

Then redeploy backend.

---

## ✅ Test Backend Deployment

### 1. Health Check
```bash
curl https://your-backend-url.railway.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Medicor API is running"
}
```

### 2. Test Signup
```bash
curl -X POST https://your-backend-url.railway.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### 3. Test Login
```bash
curl -X POST https://your-backend-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

---

## 📊 Environment Variables Checklist

| Variable | Required | Example |
|----------|----------|---------|
| MONGODB_URI | Yes | `mongodb+srv://...` |
| JWT_SECRET | Yes | `your-random-secret-key` |
| PORT | No | `5000` (auto-set by Railway) |
| EMAIL_PASSWORD | Yes | Gmail app password |

---

## 🔄 Continuous Deployment

Railway/Render automatically redeploy when you push to GitHub:

```bash
# Make changes to backend
cd d:\medicor\server
# Edit files...

# Commit and push
git add .
git commit -m "Update backend"
git push origin main

# Railway/Render automatically rebuilds!
```

---

## 🚨 Troubleshooting

### Backend Not Starting

**Check logs:**
- Railway: Click on deployment → View Logs
- Render: Go to Logs tab
- Heroku: `heroku logs --tail`

**Common issues:**
1. MongoDB connection failed
   - Check MONGODB_URI is correct
   - Check MongoDB Atlas allows all IPs (0.0.0.0/0)
   - Check database user credentials

2. Port issues
   - Don't hardcode port in production
   - Use: `const PORT = process.env.PORT || 5000;`

3. Missing dependencies
   - Make sure package.json is in server directory
   - Run `npm install` locally to test

### CORS Errors

If frontend can't connect to backend:
1. Update CORS origins in server.js
2. Include your Netlify URL
3. Redeploy backend

### MongoDB Connection Issues

```javascript
// In server.js, add better error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
```

---

## 📝 Next Steps After Backend Deployment

1. ✅ Backend deployed and running
2. ✅ MongoDB connected
3. ✅ Health endpoint responding
4. ✅ CORS configured with Netlify URL
5. ➡️ Copy backend URL
6. ➡️ Deploy frontend to Netlify
7. ➡️ Set REACT_APP_API_URL in Netlify
8. ➡️ Test full application

---

## 🎉 Success!

Your backend is now deployed! 

**Backend URL**: `https://your-app.railway.app`

**Next**: Deploy frontend to Netlify and connect them!

See `NETLIFY_DEPLOYMENT.md` for frontend deployment.
