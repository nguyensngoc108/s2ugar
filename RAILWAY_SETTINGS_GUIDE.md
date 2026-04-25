# Railway Deployment Settings Guide 🚂

## Complete Configuration Checklist

After connecting your GitHub repo to Railway, you'll need to configure these settings:

---

## 1️⃣ PROJECT SETTINGS

### Access Settings Panel
```
Railway Dashboard 
→ Your Project
→ Settings (gear icon, top right)
```

**Settings to Check:**
- ✅ Project name: "Baking-web-app" (or preferred name)
- ✅ Environment: Select "production"
- ✅ Visibility: Keep Private (not public)

---

## 2️⃣ SERVICE SETTINGS - SERVER

### Access Server Service
```
Dashboard → Click "server" service
```

### Variables Tab (Environment Variables)

**Add these exact variables:**

| Variable | Value | Source |
|----------|-------|--------|
| `PORT` | `5000` | Fixed value |
| `MONGODB_URI` | `${{ mongo.MONGO_URL }}` | From MongoDB service |
| `SENDGRID_API_KEY` | Your SendGrid key | From `.env.prod` |
| `CLOUDINARY_NAME` | Your Cloudinary name | From `.env.prod` |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key | From `.env.prod` |
| `CLOUDINARY_API_SECRET` | Your Cloudinary secret | From `.env.prod` |
| `JWT_SECRET` | Your JWT secret key | From `.env.prod` |
| `NODE_ENV` | `production` | Fixed value |

**How to add variables:**
1. Click Variables tab
2. Click "+ Add Variable"
3. Enter Name (e.g., `SENDGRID_API_KEY`)
4. Paste Value from your `.env.prod` file
5. Click Add

### Networking Tab (Public URL)

**Check:**
- ✅ Service URL appears (e.g., `https://baking-api-xxxx.railway.app`)
- ✅ This is your **backend URL** for client to call
- ✅ Copy this URL → you'll use it in client variables

### Build & Deploy Tab

**Settings:**
- ✅ Dockerfile: `server/Dockerfile` (should be auto-detected)
- ✅ Root Directory: `.` (current directory)
- ✅ Auto Deploy: Toggle ON (deploys on GitHub push)

### Health Check (Optional but Recommended)

1. Click "Settings" (in service)
2. Scroll to "Health Check"
3. Add endpoint: `/api/health` or `/`
4. This monitors if your server is running

---

## 3️⃣ SERVICE SETTINGS - CLIENT

### Access Client Service
```
Dashboard → Click "client" service
```

### Variables Tab (Environment Variables)

**Add this variable:**

| Variable | Value |
|----------|-------|
| `REACT_APP_SERVER_URL` | `${{ server.SERVICE_URL }}` |

**Note:** The `${{ server.SERVICE_URL }}` is **automatically replaced** with your server's public URL!

### Networking Tab

**Your Frontend URL:**
- ✅ You'll see: `https://baking-web-app-xxxx.railway.app`
- ✅ This is what you share with users
- ✅ Visit this URL to test your app

### Build & Deploy Tab

**Settings:**
- ✅ Dockerfile: `client/Dockerfile` (auto-detected)
- ✅ Root Directory: `.`
- ✅ Auto Deploy: ON
- ✅ Build Command: `npm run build` (in Dockerfile)
- ✅ Start Command: Nginx serves static files (in Dockerfile)

---

## 4️⃣ ADD MONGODB SERVICE

### Add MongoDB
```
Dashboard → "+ Add Service"
→ Plugins
→ Search "MongoDB"
→ "MongoDB" template
→ Click "Deploy"
```

### MongoDB Auto-Configuration

Railway **automatically**:
- ✅ Creates MongoDB instance
- ✅ Generates connection string
- ✅ Provides `MONGO_URL` variable
- ✅ No need to manually configure!

### Access MongoDB Variables
```
Dashboard → Click "mongo" service
→ Variables tab
```

**Available variables:**
- `MONGO_URL` - Full connection string (what you need!)
- `MONGO_HOST` - Server address
- `MONGO_PORT` - Port number
- `MONGO_USERNAME` - Username
- `MONGO_PASSWORD` - Password
- `MONGO_DATABASE` - Database name

---

## 5️⃣ ENVIRONMENT MANAGEMENT

### Development vs Production

**Development (Local):**
```
.env file (in your folder)
- Uses localhost MongoDB
- Uses localhost server
```

**Production (Railway):**
```
Railway Variables tab
- Uses MongoDB service connection string
- Uses Railway service URLs
```

### Team Variables (Optional)

For shared secrets across services:
```
Settings → Environment Variables
→ Add shared variables
→ Available to all services
```

---

## 6️⃣ DEPLOYMENT & MONITORING

### View Deployment Status
```
Dashboard → Click service
→ "Deployments" tab
→ See real-time build logs
```

**Status indicators:**
- 🟡 Yellow: Building...
- 🟢 Green: Running (deployed!)
- 🔴 Red: Failed (check logs)

### View Logs
```
Deployments tab → Click build
→ See full build output
→ Check for errors
```

### Restart Service
```
Service → Deployments
→ Click three dots (...)
→ "Redeploy"
```

---

## 7️⃣ CUSTOM DOMAIN (Optional)

### Add Your Domain
```
Service (client) → Settings
→ Custom Domain
→ Enter your domain (e.g., bakerapp.com)
→ Railway gives you DNS settings
→ Update your domain registrar's nameservers
→ Takes 24-48 hours to activate
```

---

## 8️⃣ BILLING & MONITORING

### View Usage
```
Settings → Billing
→ See credit usage
→ Current balance ($5/month)
→ Estimated monthly cost
```

### Cost Breakdown
```
- Server (Node): ~$1-2/month
- Client (Nginx): ~$0.50/month
- MongoDB: Included in free tier
- Total: ~$2-3/month (well under $5 free credits!)
```

### Alerts (Optional)
```
Settings → Notifications
→ Email on deployment failure
→ Email on resource limit
```

---

## 9️⃣ TROUBLESHOOTING SETTINGS

### If Build Fails
```
Deployments tab → Click failed build
→ Read error logs carefully
→ Common issues:
   - Missing Dockerfile
   - Dockerfile syntax error
   - Port not matching environment variable
```

### If Services Can't Communicate
```
Check variables:
- Server: PORT=5000 ✅
- Client: REACT_APP_SERVER_URL=${{ server.SERVICE_URL }} ✅
- All typed EXACTLY (case-sensitive!)
```

### If MongoDB Connection Fails
```
Server variables:
- MONGODB_URI=${{ mongo.MONGO_URL }} ✅
- Check spelling: MONGO_URL not MONGO_uri
```

---

## 🔟 QUICK REFERENCE TABLE

| Component | Setting | Value |
|-----------|---------|-------|
| **Server** | PORT | 5000 |
| | NODE_ENV | production |
| | MONGODB_URI | ${{ mongo.MONGO_URL }} |
| | SENDGRID_API_KEY | [your key] |
| | CLOUDINARY_NAME | [your name] |
| | JWT_SECRET | [your secret] |
| **Client** | REACT_APP_SERVER_URL | ${{ server.SERVICE_URL }} |
| **MongoDB** | Auto-created | No manual config |
| **Auto Deploy** | Both services | ON |

---

## ✅ DEPLOYMENT CHECKLIST

Before pushing to GitHub:

- [ ] Railway account created
- [ ] GitHub repo connected to Railway
- [ ] MongoDB service added
- [ ] Server variables configured (6 environment variables)
- [ ] Client variables configured (1 variable)
- [ ] `.env.prod` file has all your API keys
- [ ] Both Dockerfiles tested locally with `docker-compose up`
- [ ] Code committed: `git add . && git commit -m "..."`
- [ ] Code pushed: `git push origin main`

---

## 🚀 DEPLOYMENT FLOW

```
1. Push code to GitHub
           ↓
2. Railway receives webhook
           ↓
3. Auto-builds from Dockerfile
           ↓
4. Services start (server + client)
           ↓
5. Variables injected
           ↓
6. Server connects to MongoDB
           ↓
7. Client can reach server
           ↓
8. Your app is LIVE! ✨
```

---

## FINAL STEPS

1. **Ensure code is pushed:**
   ```powershell
   git status  # should show "nothing to commit"
   ```

2. **Go to Railway:** https://railway.app

3. **Create project:** "New Project" → "Deploy from GitHub"

4. **Configure all variables** as shown above

5. **Check deployment** in Railway dashboard

6. **Test your live app!** 🎉

---

## Need More Help?

- Variables not working? Check spelling (case-sensitive)
- Build failed? Check Dockerfile errors
- Can't connect to DB? Verify MONGODB_URI variable
- Still stuck? Share the error from Railway logs
