# 🚀 Medicor AI - Complete Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All features working locally
- [ ] No console errors
- [ ] Code pushed to GitHub
- [ ] .gitignore file updated
- [ ] Environment variables documented

### ✅ Backend Preparation
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created (free M0 tier)
- [ ] Database user created
- [ ] All IPs whitelisted (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Gmail app password ready (for contact form)

### ✅ Frontend Preparation
- [ ] Build works locally (`npm run build`)
- [ ] netlify.toml file in root
- [ ] .env.production.example created
- [ ] All API calls use REACT_APP_API_URL

---

## Deployment Steps

### Step 1: Deploy Backend (Choose One)

#### Option A: Railway (Recommended)
- [ ] Sign up at https://railway.app
- [ ] Create new project from GitHub
- [ ] Set root directory to `server`
- [ ] Add environment variables:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] EMAIL_PASSWORD
- [ ] Wait for deployment
- [ ] Test health endpoint: `https://your-url.railway.app/api/health`
- [ ] Copy backend URL: `_____________________`

#### Option B: Render
- [ ] Sign up at https://render.com
- [ ] Create new web service
- [ ] Connect GitHub repo
- [ ] Set root directory to `server`
- [ ] Add environment variables
- [ ] Deploy and copy URL

#### Option C: Heroku
- [ ] Install Heroku CLI
- [ ] Login: `heroku login`
- [ ] Create app: `heroku create medicor-api`
- [ ] Set config vars
- [ ] Deploy: `git push heroku main`
- [ ] Copy backend URL

---

### Step 2: Update Backend CORS

- [ ] Open `server/server.js`
- [ ] Add your Netlify URL to CORS origins
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-site.netlify.app',  // ADD THIS
  ],
  credentials: true
}));
```
- [ ] Commit and push changes
- [ ] Backend auto-redeploys

---

### Step 3: Deploy Frontend to Netlify

- [ ] Sign up at https://netlify.com
- [ ] Click "Add new site" → "Import from Git"
- [ ] Select GitHub repository
- [ ] Configure build settings:
  - Build command: `npm run build`
  - Publish directory: `build`
- [ ] Add environment variable:
  - [ ] Key: `REACT_APP_API_URL`
  - [ ] Value: `https://your-backend-url.railway.app/api`
- [ ] Deploy site
- [ ] Copy frontend URL: `_____________________`

---

### Step 4: Testing

#### Test Backend
- [ ] Visit: `https://your-backend-url/api/health`
- [ ] Should return: `{"status":"OK","message":"Medicor API is running"}`
- [ ] Check MongoDB connection in logs

#### Test Frontend
- [ ] Visit your Netlify URL
- [ ] Check homepage loads
- [ ] Test signup with new account
- [ ] Test login
- [ ] Test symptom analysis on Home page
- [ ] Test speech recognition
- [ ] Test medical report upload on Scan page
- [ ] Test contact form
- [ ] Check all pages (About, Developer, Contact)

#### Check Browser Console
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] API calls go to production backend (not localhost)
- [ ] All features work

---

## Post-Deployment

### Domain Setup (Optional)
- [ ] Buy custom domain
- [ ] Connect to Netlify in settings
- [ ] Update DNS records
- [ ] Enable HTTPS (automatic on Netlify)

### Monitoring
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Enable Netlify Analytics
- [ ] Monitor backend logs
- [ ] Set up uptime monitoring (UptimeRobot)

### Performance
- [ ] Enable Netlify CDN
- [ ] Enable asset optimization
- [ ] Test loading speed
- [ ] Optimize images if needed

### Security
- [ ] HTTPS enabled (automatic)
- [ ] Environment variables not exposed
- [ ] MongoDB user has limited permissions
- [ ] JWT secret is strong
- [ ] Rate limiting on backend (optional)

---

## URLs to Remember

```
Frontend URL: https://_________________.netlify.app
Backend URL: https://_________________.railway.app
Backend Health: https://_________________.railway.app/api/health
MongoDB Atlas: https://cloud.mongodb.com
Netlify Dashboard: https://app.netlify.com
Railway Dashboard: https://railway.app
```

---

## Common Issues & Solutions

### Issue: "Network Error" on frontend
**Solution:**
- Check REACT_APP_API_URL is set in Netlify
- Check backend is running
- Check CORS includes Netlify URL
- Rebuild frontend after env var changes

### Issue: "502 Bad Gateway" on backend
**Solution:**
- Check MongoDB connection
- Check environment variables
- Check backend logs for errors
- Restart backend service

### Issue: Login/Signup not working
**Solution:**
- Check MongoDB is connected
- Check JWT_SECRET is set
- Check API calls in Network tab
- Verify CORS is configured

### Issue: Contact form not sending emails
**Solution:**
- Check EMAIL_PASSWORD is set in backend
- Use Gmail app password (not regular password)
- Check backend logs for email errors

---

## Maintenance

### Update Code
```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Auto-deploys on Railway and Netlify!
```

### View Logs
- **Railway**: Dashboard → Service → Logs
- **Netlify**: Dashboard → Deploys → Deploy log
- **MongoDB**: Atlas → Database → Monitoring

### Rollback Deployment
- **Netlify**: Go to Deploys → Click previous deploy → Publish
- **Railway**: Go to Deployments → Select previous → Redeploy

---

## Success! 🎉

Your Medicor AI application is now live!

**Share your links:**
- Frontend: `https://your-site.netlify.app`
- Try all features
- Share with users
- Collect feedback
- Iterate and improve!

---

## Support Resources

- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- React Deployment: https://create-react-app.dev/docs/deployment

---

**Built with ❤️ - Now deployed to the world! 🌍**
