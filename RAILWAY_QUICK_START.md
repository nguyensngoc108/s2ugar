# Railway Quick Start Checklist ✅

## Before You Deploy

- [ ] Code pushed to GitHub (`git push origin main`)
- [ ] `.env.prod` has all API keys
  - [ ] `SENDGRID_API_KEY`
  - [ ] `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
  - [ ] `JWT_SECRET`
- [ ] Both Dockerfiles are working (tested locally with `docker-compose up`)

---

## 1️⃣ Create Railway Account (5 min)

```
https://railway.app → Click "Start Now" → Sign in with GitHub
```

---

## 2️⃣ Connect Your Repository (5 min)

```
Railway Dashboard → "New Project" 
→ "Deploy from GitHub repo"
→ Select "Baking-web-app"
→ Click "Add"
```

**Railway auto-detects:**
- ✅ `/server` Dockerfile
- ✅ `/client` Dockerfile

---

## 3️⃣ Add MongoDB Service (2 min)

```
Dashboard → "+ Add Service"
→ Search "MongoDB"
→ Select "MongoDB"
→ Railway creates FREE instance automatically
```

**You get:**
- ✅ Connection string (auto-injected as `${{ mongo.MONGO_URL }}`)
- ✅ No credit card needed for $5/month free tier

---

## 4️⃣ Configure Environment Variables (5 min)

### **Click "server" service → Variables tab:**

```
PORT                      = 5000
MONGODB_URI              = ${{ mongo.MONGO_URL }}
SENDGRID_API_KEY         = (copy from your .env.prod)
CLOUDINARY_NAME          = (copy from your .env.prod)
CLOUDINARY_API_KEY       = (copy from your .env.prod)
CLOUDINARY_API_SECRET    = (copy from your .env.prod)
JWT_SECRET               = (copy from your .env.prod)
NODE_ENV                 = production
```

### **Click "client" service → Variables tab:**

```
REACT_APP_SERVER_URL = ${{ server.SERVICE_URL }}
```

---

## 5️⃣ Enable Public URLs (1 min)

Railway automatically exposes both services with public URLs:

- 🔗 **Server:** `https://baking-api-xxxx.railway.app`
- 🔗 **Client:** `https://baking-web-app-xxxx.railway.app`

---

## 6️⃣ Deploy! (Push to GitHub)

```powershell
cd C:\Users\Admin\OneDrive\Documents\Baking-app\Baking-web-app

git add .
git commit -m "Add Railway configuration"
git push origin main
```

**Railway auto-builds in 2-5 minutes!**

---

## 7️⃣ Monitor Deployment

```
Railway Dashboard → Watch logs update
→ Green checkmark = Deployed! ✅
→ Your app is LIVE
```

---

## 8️⃣ Test Your Live App

1. Open **client URL** in browser: `https://baking-web-app-xxxx.railway.app`
2. Try signing in / creating orders
3. Check backend: `https://baking-api-xxxx.railway.app/api/cakes`

---

## Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| Build fails | Check logs in Railway → Fix Dockerfile issues |
| Cannot connect to DB | Verify `MONGODB_URI = ${{ mongo.MONGO_URL }}` exactly |
| Client shows 404 API | Ensure `REACT_APP_SERVER_URL` is set correctly |
| Slow first load | Normal - Railway spins up containers, takes 5-10s |

---

## Optional: Add Custom Domain

```
Client service → Settings → Custom Domain
→ Add your domain
→ Update DNS nameservers (Railway provides them)
→ Takes 24-48 hours
```

---

## Estimated Total Time: 25-30 minutes

You'll have a **fully deployed, production-ready Baking App** for free! 🚀

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Discord Community: https://discord.gg/railway
- Check deployment logs in Railway Dashboard for errors
