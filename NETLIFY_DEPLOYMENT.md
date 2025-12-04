# Medicor AI - Netlify Deployment Guide

## 🚀 Deploy to Netlify

This guide will help you deploy the Medicor AI application to Netlify.

### ⚠️ Important: Full-Stack Application

Medicor is a **full-stack application** with:
- **Frontend**: React app (can be deployed to Netlify)
- **Backend**: Node.js + Express + MongoDB (needs separate hosting)

**You'll need TWO deployments:**
1. Frontend on Netlify (this guide)
2. Backend on a server (Heroku, Railway, Render, etc.)

---

## 📋 Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Netlify Account** - Sign up at https://netlify.com
3. **Backend Hosted** - Your backend API must be deployed separately

---

## 🎯 Step 1: Prepare Your Frontend for Deployment

### 1.1 Update Package.json

Make sure your `package.json` has a build script:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### 1.2 Create Environment Variables

Create a `.env.production` file in the root directory:

```env
# Production API URL (your deployed backend)
REACT_APP_API_URL=https://your-backend-api.herokuapp.com/api
```

**Replace with your actual backend URL after deploying it!**

---

## 🔧 Step 2: Deploy Backend First

Your backend needs to be hosted separately. Popular options:

### Option A: Railway (Recommended - Free tier available)
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your medicor repository
5. Railway will auto-detect Node.js
6. Set root directory to `/server`
7. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Random secret key
   - `PORT` - 5000
   - `EMAIL_PASSWORD` - Gmail app password

### Option B: Render (Free tier)
1. Go to https://render.com
2. Create "New Web Service"
3. Connect GitHub repository
4. Set:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add environment variables (same as above)

### Option C: Heroku
```bash
# Install Heroku CLI
heroku login
cd d:\medicor\server
heroku create medicor-api
git subtree push --prefix server heroku main
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set JWT_SECRET="your-secret"
```

### MongoDB Setup
If you don't have MongoDB Atlas:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Use it as `MONGODB_URI` in backend environment variables

**📝 Note your backend URL!** You'll need it for the frontend.

---

## 🌐 Step 3: Deploy Frontend to Netlify

### Method 1: Deploy via Netlify Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   cd d:\medicor
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize
   - Select your `medicor` repository

3. **Configure Build Settings**
   ```
   Base directory: (leave empty or use "/")
   Build command: npm run build
   Publish directory: build
   ```

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.com/api`
   - ⚠️ Use your actual deployed backend URL!

5. **Deploy**
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at a random URL like `random-name-123.netlify.app`

6. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add custom domain or change site name

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
cd d:\medicor
netlify init

# Deploy
netlify deploy --prod
```

---

## 🔐 Step 4: Configure Environment Variables

In Netlify Dashboard:
1. Go to **Site settings**
2. Click **Environment variables**
3. Add these variables:

```
REACT_APP_API_URL = https://your-backend-api.herokuapp.com/api
```

**Important:** 
- Must start with `REACT_APP_` to be accessible in React
- Must NOT have trailing slash
- Must be your deployed backend URL (not localhost)

---

## ✅ Step 5: Test Your Deployment

1. Visit your Netlify URL
2. Test login/signup (should connect to backend)
3. Test all features
4. Check browser console for errors

### Common Issues:

**Issue: "Network Error" or API calls failing**
- ✅ Check `REACT_APP_API_URL` is set correctly
- ✅ Check backend is deployed and running
- ✅ Check backend CORS allows your Netlify domain

**Issue: "Page not found" on refresh**
- ✅ Make sure `netlify.toml` is in root directory
- ✅ Redirects should be configured (already in netlify.toml)

**Issue: Environment variables not working**
- ✅ Rebuild site after adding environment variables
- ✅ Make sure they start with `REACT_APP_`

---

## 🔄 Continuous Deployment

Netlify automatically rebuilds when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Netlify automatically rebuilds and deploys!
```

---

## 🛠️ Update Backend CORS

After deploying, update your backend CORS to allow your Netlify domain:

```javascript
// In server/server.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-site-name.netlify.app',  // Add your Netlify URL
    'https://your-custom-domain.com'        // If you have custom domain
  ],
  credentials: true
}));
```

Redeploy backend after this change.

---

## 📊 Deployment Checklist

### Backend Deployment:
- [ ] MongoDB Atlas database created
- [ ] Backend deployed to Railway/Render/Heroku
- [ ] Environment variables set (MONGODB_URI, JWT_SECRET, etc.)
- [ ] Backend health endpoint working (https://your-api.com/api/health)
- [ ] CORS configured to allow Netlify domain

### Frontend Deployment:
- [ ] Code pushed to GitHub
- [ ] Connected to Netlify
- [ ] Build settings configured
- [ ] REACT_APP_API_URL set to backend URL
- [ ] netlify.toml file in root
- [ ] Build successful
- [ ] Site live and accessible

### Testing:
- [ ] Can access the site
- [ ] Login/Signup works
- [ ] Home page symptom analysis works
- [ ] Scan page medical report analysis works
- [ ] Contact form sends emails
- [ ] All pages load correctly
- [ ] No console errors

---

## 🔗 Quick Links After Deployment

- **Frontend URL**: https://your-site.netlify.app
- **Backend URL**: https://your-backend.railway.app
- **Backend Health**: https://your-backend.railway.app/api/health
- **Netlify Dashboard**: https://app.netlify.com
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## 💡 Pro Tips

1. **Use a custom domain**
   - Makes your site look professional
   - Buy domain from Namecheap, GoDaddy, etc.
   - Connect in Netlify settings

2. **Enable HTTPS** (Automatic on Netlify)
   - Free SSL certificate
   - Automatic renewal

3. **Set up monitoring**
   - Use Netlify Analytics
   - Monitor API calls
   - Set up error tracking (Sentry)

4. **Performance optimization**
   - Netlify automatically optimizes builds
   - Use Netlify CDN for fast global access
   - Enable asset optimization in settings

---

## 🚨 Troubleshooting

### Build Fails on Netlify

**Check build logs:**
1. Go to Deploys tab
2. Click on failed deploy
3. Read error message

**Common fixes:**
```bash
# If npm install fails
rm -rf node_modules package-lock.json
npm install

# If build fails
npm run build
# Fix any errors locally first
```

### API Calls Not Working

**Check network tab in browser:**
1. Open DevTools (F12)
2. Go to Network tab
3. Try login/signup
4. Check API request URL
5. Should be your backend URL, not localhost

### Backend Not Responding

**Check backend logs:**
- Railway: Click on service → Logs
- Render: Go to Logs tab
- Heroku: `heroku logs --tail`

---

## 📞 Need Help?

If you encounter issues:
1. Check Netlify build logs
2. Check browser console (F12)
3. Check backend logs
4. Verify all environment variables
5. Make sure backend is running

---

## 🎉 Success!

Your Medicor AI app is now live on Netlify! 

Share your URL: `https://your-site.netlify.app`

---

**Next Steps:**
1. Deploy backend to Railway/Render
2. Update REACT_APP_API_URL with backend URL
3. Rebuild on Netlify
4. Test all features
5. Share with users! 🚀
