# 🌿 VitaRoot — Deployment Guide

## What's in this package

```
vitaroot/
├── index.html              ← Your full website (all pages)
├── netlify.toml            ← Netlify config (routing + security headers)
├── netlify/
│   └── functions/
│       └── ai-proxy.js     ← Secure backend proxy (hides your API key)
└── README.md               ← This file
```

---

## 🚀 Deploy to Netlify in 5 minutes

### Step 1 — Create a free Netlify account
Go to https://netlify.com and sign up (free).

### Step 2 — Deploy the site

**Option A: Drag & Drop (easiest)**
1. Go to https://app.netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag the entire `vitaroot/` FOLDER onto the upload area
4. Netlify deploys instantly ✅

**Option B: Via GitHub (recommended for updates)**
1. Create a free GitHub account at https://github.com
2. Create a new repository called `vitaroot`
3. Upload all files keeping the folder structure
4. In Netlify: "Add new site" → "Import from Git" → select your repo
5. Build settings: leave blank (static site)
6. Click "Deploy site" ✅

---

## 🔑 Step 3 — Add your Anthropic API Key (CRITICAL)

This is what makes all the AI features work securely.

1. Get your API key at https://console.anthropic.com
   - Sign up / log in → "API Keys" → "Create Key"
   - Copy the key (starts with `sk-ant-...`)

2. In your Netlify dashboard:
   - Go to **Site configuration** → **Environment variables**
   - Click **"Add a variable"**
   - Key:   `ANTHROPIC_API_KEY`
   - Value: `sk-ant-YOUR_KEY_HERE`
   - Click **Save**

3. **Redeploy your site** (Netlify → Deploys → "Trigger deploy")

Your AI features are now live and your API key is 100% hidden from users. ✅

---

## 🌐 Step 4 — Add a Custom Domain (optional)

1. Buy a domain at Namecheap.com or GoDaddy.com (~$10/year)
   - Suggested: `vitaroot.com` or `vitarootapp.com`

2. In Netlify: **Domain management** → **Add custom domain**
3. Follow the DNS instructions Netlify provides
4. SSL/HTTPS is automatically added for free ✅

---

## 🔒 Security Notes

- Your `ANTHROPIC_API_KEY` is stored only in Netlify's encrypted environment variables
- The browser calls `/api/ai` (your proxy) — never Anthropic directly
- The proxy (`netlify/functions/ai-proxy.js`) adds the key server-side
- No key is ever exposed in your HTML, JS, or network requests

---

## 💡 After Launch — Recommended Upgrades

| Feature | Tool | Cost |
|---------|------|------|
| Rate limiting (prevent abuse) | Upstash Redis | Free tier |
| User accounts & database | Supabase | Free tier |
| Email newsletter | Mailchimp / ConvertKit | Free tier |
| Analytics | Plausible / Google Analytics | Free |
| Image hosting | Cloudinary | Free tier |

---

## 🆘 Troubleshooting

**AI features not working?**
→ Check that `ANTHROPIC_API_KEY` is set in Netlify environment variables
→ Trigger a new deploy after adding the key

**Site not loading?**
→ Make sure `index.html` is at the ROOT of the uploaded folder, not inside a subfolder

**Function errors?**
→ In Netlify dashboard: Functions → ai-proxy → View logs

---

Built with ❤️ using VitaRoot — *Grow From Within*
