# Raindrop Taxi — Website + Admin (Demo)

This repository contains a small Node.js + Express demo for a taxi booking front-end and a basic admin interface.
**It is a demo** — payment & booking flows are client-side and use UPI deep links and WhatsApp links. To run this in production you'll need secure hosting, HTTPS, real payment gateways, and stronger authentication.

## What is included
- `server.js` — Express server serving `public/` and a small JSON-backed content API.
- `site.json` — current site content (brand, images, UPI, driver phone).
- `public/index.html` — the customer-facing site (reads `/api/content`).
- `public/admin.html` — admin interface for editing content and uploading images (uses `x-admin-token` header).
- `public/assets/*` — images (logo, car, driver).
- `package.json` — Node dependencies.

## Quick start (local)
1. Install Node.js (v16+ recommended).
2. Copy this repo locally or create the folder structure above and paste the files.
3. Install dependencies and start:
```bash
npm install
export ADMIN_TOKEN="YOUR_SECRET_TOKEN"   # Windows PowerShell: $env:ADMIN_TOKEN="YOUR_SECRET_TOKEN"
node server.js
