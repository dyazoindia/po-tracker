# Dyazo PO Tracker

Portal-wise Purchase Order tracking system for Dyazo (Amazon / Flipkart / Blinkit / Zepto).

## Structure
```
po-tracker/
  frontend/   → React (Vite) app → deploy to Vercel
  backend/    → Node.js/Express + MongoDB → deploy to Render
```

## Local Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env      # fill in your MongoDB Atlas URI + Slack webhook
npm run dev
```
Runs on http://localhost:5000

### Frontend
```bash
cd frontend
npm install
cp .env.example .env      # set VITE_API_URL=http://localhost:5000
npm run dev
```
Runs on http://localhost:5173

## Excel Upload
Go to **Upload Data** in the sidebar. Required columns in your .xlsx: `PO ID, Portal, SKU, Qty Ordered, Appointment Date`.
Optional columns: `Product Name, Appointment Slot, Assigned To`. Portal must be one of: amazon, flipkart, blinkit, zepto (case-insensitive).
Existing PO IDs get updated instead of duplicated.

## Deployment

1. Push this whole folder to a new GitHub repo (e.g. `dyazoindia/po-tracker`).
2. **Backend → Render**: New Web Service → connect repo → Root Directory: `backend` → Build: `npm install` → Start: `npm start` → add env vars (MONGO_URI, SLACK_WEBHOOK_URL, FRONTEND_URL).
3. **Frontend → Vercel**: New Project → connect repo → Root Directory: `frontend` → add env var `VITE_API_URL` = your Render backend URL.
4. **Cron**: use Render Cron Jobs or cron-job.org to hit:
   - `POST /api/cron/check-overdue` — every few hours
   - `POST /api/cron/daily-digest` — once daily, morning

## Custom Domain
- Vercel: add `po.dyazo.com` in Project → Settings → Domains, then add the CNAME record it gives you in Hostinger DNS.
- Render: add `api-po.dyazo.com` in Service → Settings → Custom Domain, then add that CNAME in Hostinger DNS too.
