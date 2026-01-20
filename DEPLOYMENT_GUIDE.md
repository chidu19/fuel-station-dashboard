# Deployment Guide - Vercel + Render

Deploy your Fuel Station Analytics Dashboard for FREE using Vercel (Frontend) + Render (Backend).

## Prerequisites
- GitHub account (free)
- Vercel account (free)
- Render account (free)

---

## Step 1: Push Code to GitHub

1. Create a new repository on [github.com](https://github.com)
2. Push your project:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fuel-station-dashboard.git
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### Create Backend Service:
1. Go to [render.com](https://render.com) and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Fill in the details:
   - **Name:** `fuel-station-api`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r backend/requirements.txt`
   - **Start Command:** `cd backend && gunicorn wsgi:app`
5. Click **Create Web Service**

### Get Your Backend URL:
- After deployment completes, copy the URL: `https://fuel-station-api.onrender.com`
- This will be your `REACT_APP_API_URL`

---

## Step 3: Deploy Frontend to Vercel

### Create Frontend App:
1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project** → Select GitHub repo
3. Fill in the settings:
   - **Framework Preset:** `Create React App`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

### Add Environment Variable:
1. Go to **Settings** → **Environment Variables**
2. Add new variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://fuel-station-api.onrender.com` (your Render URL)
   - **Environments:** Select all (Production, Preview, Development)
3. Click **Save**

### Deploy:
1. Click **Deploy**
2. Wait for deployment to complete
3. Copy your Vercel URL: `https://your-app.vercel.app`

---

## Step 4: Update Production Environment

### Backend (Render):
1. Go to your Render web service settings
2. Add environment variables:
   - `FLASK_ENV`: `production`
   - `PYTHONUNBUFFERED`: `true`

### Frontend (Vercel):
- Already configured with `REACT_APP_API_URL`

---

## Step 5: Test Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Try uploading CSV/Excel data
3. Check all charts load and filter works
4. Test daily analysis page

---

## Important Notes

### Database Persistence:
- Render's free tier uses ephemeral storage (resets on redeploy)
- **For Production:** Upgrade to Render's paid plan with persistent storage OR
- **Alternative:** Use PostgreSQL on Render (free tier available)

### Free Tier Limitations:
- **Render:** Spins down after 15 min of inactivity (cold start ~30 seconds)
- **Vercel:** No limitations on free tier

### Upgrading Database (Optional):

If you need persistent data, upgrade to PostgreSQL:

1. On Render dashboard, create **PostgreSQL** database
2. Update `app.py`:
```python
# Change this line:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fuel_station.db'

# To this:
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
```

3. Add `DATABASE_URL` environment variable in Render with PostgreSQL connection string

---

## Troubleshooting

### Frontend shows "Cannot connect to API"
- Check `REACT_APP_API_URL` environment variable
- Verify Render backend is running (check Render dashboard)
- Ensure CORS is enabled (already configured in backend)

### Upload fails with timeout
- Render free tier may timeout on large files
- Upgrade to paid tier or use smaller files

### Cold start delay
- Normal for free tier (first request takes 30-60 seconds)
- Upgrade to paid plan for instant access

---

## Your Live URLs After Deployment

- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://fuel-station-api.onrender.com`
- **Health Check:** `https://fuel-station-api.onrender.com/api/health`

---

## Next Steps

1. Monitor usage on both platforms
2. Consider upgrading to paid tiers when needed
3. Enable automatic deployments (already enabled by default)
4. Set up domain names (optional)

**Your app is now LIVE and FREE!** 🚀
