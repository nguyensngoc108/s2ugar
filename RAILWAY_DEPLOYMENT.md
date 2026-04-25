# Railway Deployment Guide 🚂

## What is Railway?

Railway is a **cloud platform** that deploys your app directly from GitHub with:
- ✅ Automatic deploys on every push
- ✅ Built-in MongoDB support
- ✅ Environment variables management
- ✅ Custom domains
- ✅ $5/month free credits

---

## Step-by-Step Deployment

### **Step 1: Create Railway Account**

1. Go to https://railway.app
2. Click **"Start Now"**
3. Sign in with **GitHub** (connect your account)
4. Accept permissions

---

### **Step 2: Create New Project**

1. Click **"+ New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find your **Baking-web-app** repository
4. Click **"Add"**

Railway will scan your repo and detect:
- 📦 `server/` folder (Node.js app)
- 📦 `client/` folder (React app)

---

### **Step 3: Add Services**

Railway shows detected services. You'll see:

```
✓ server (Node.js Dockerfile)
✓ client (React Dockerfile)
? MongoDB (need to add)
```

#### **Add MongoDB:**
1. Click **"+ Add Service"** 
2. Search for **"MongoDB"**
3. Click **"MongoDB"** → **"Deploy"**
4. Railway creates a **free MongoDB instance**

---

### **Step 4: Configure Environment Variables**

#### **For Server Service:**

1. Click on **"server"** service
2. Go to **Variables** tab
3. Add these variables:

```
PORT=5000
MONGODB_URI=${{ mongo.MONGO_URL }}
SENDGRID_API_KEY=your_sendgrid_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

#### **For Client Service:**

1. Click on **"client"** service
2. Go to **Variables** tab
3. Add this variable:

```
REACT_APP_API_URL=${{ server.SERVICE_URL }}
```

Railway automatically sets `${{ mongo.MONGO_URL }}` and `${{ server.SERVICE_URL }}` from linked services!

---

### **Step 5: Set Public URLs**

#### **For Server:**
1. Click **"server"** service
2. Under **"Deployments"** → scroll to **"Networking"**
3. You'll see a URL like: `https://baking-api-prod-xxxx.railway.app`
4. Copy this URL

#### **For Client:**
1. Click **"client"** service
2. You'll see a URL like: `https://baking-web-app-xxxx.railway.app`
3. This is your **production frontend URL**

---

### **Step 6: Get Your Credentials**

MongoDB credentials are **automatic**. Railway provides:
- `MONGO_URL` - Connection string (auto-injected)
- `MONGO_HOST`, `MONGO_PORT`, `MONGO_USER`, `MONGO_PASSWORD` (if needed separately)

Check **MongoDB service → Variables** to see all available values.

---

### **Step 7: Connect Custom Domain (Optional)**

1. Go to **"client"** service → **Settings**
2. Under **"Custom Domain"** → Add domain
3. Point your domain's nameservers to Railway's DNS
4. Takes 24-48 hours to propagate

---

### **Step 8: Deploy!**

1. Push your code to GitHub:
```bash
git add .
git commit -m "Setup Railway deployment"
git push origin main
```

2. Railway **automatically detects the push**
3. Builds and deploys all services (takes 2-5 minutes)
4. Watch deployment logs in Railway dashboard

---

## Deployment Flow

```
You push to GitHub
        ↓
Railway receives webhook
        ↓
Builds Docker images
        ↓
Spins up containers
        ↓
Services communicate
        ↓
Your app is live! 🎉
```

---

## Useful Commands

```bash
# Install Railway CLI (optional)
npm install -g @railway/cli

# Login
railway login

# Deploy from command line
railway up

# View logs
railway logs
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Build failed"** | Check logs in Railway dashboard, fix Dockerfile |
| **"Cannot connect to MongoDB"** | Verify `MONGO_URL` variable is set |
| **"Client can't reach API"** | Ensure `REACT_APP_API_URL` matches server service URL |
| **"502 Bad Gateway"** | Server might be crashing, check logs |

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| $5/month free credits | ✅ Covers small app easily |
| After $5 | ~$0.50 per GB bandwidth |
| | ~$5-10/month for typical usage |

---

## Next Steps

1. ✅ Create Railway account
2. ✅ Connect your GitHub repo
3. ✅ Add MongoDB service
4. ✅ Configure environment variables
5. ✅ Push code to GitHub
6. ✅ Watch deployment in Railway dashboard
7. ✅ Test your live app! 🚀

---

## Important: Update API URLs

Before final deployment, update your **client code** to use the production API:

In `client/src/services/httpServices.js`:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

This will automatically use Railway's server URL in production! ✨
