# PROJECT REDROOM

Official site for Project Redroom. Static HTML deployed on Vercel, custom domain via Cloudflare DNS.

## Stack

- Static HTML / CSS / vanilla JS (no framework)
- Hosted on Vercel
- Domain: `projectredroom.com` (registered on Cloudflare, DNS pointing to Vercel)
- Payments: **not yet integrated** — Stripe planned (see `api/` directory, currently empty)

## Local development

Prerequisites:
- Node.js v18 or higher
- Vercel CLI: `npm install -g vercel`

Run locally:
```bash
vercel dev
```

This serves the site at `http://localhost:3000` with the same routing/headers as production.

## Project structure

```
projectredroom/
├── index.html              # Landing page
├── styles/
│   └── main.css            # All styles
├── scripts/
│   └── main.js             # All client-side JS
├── api/                    # Vercel serverless functions (empty until Stripe added)
├── public/                 # Static assets (favicon, og-image, etc.)
├── .gitignore
├── package.json
├── vercel.json             # Routing, headers, caching config
└── README.md
```

## Deployment

Pushes to `main` auto-deploy to production.
Pushes to any other branch create a preview deploy with a unique URL.

## TODOs before launch

- [ ] Replace `[TODO: ...]` placeholders in `index.html` meta tags
- [ ] Add real favicon files to `/public/` (favicon.svg, favicon.png, apple-touch-icon.png)
- [ ] Add OG share image at `/public/og-image.png` (1200x630px recommended)
- [ ] Decide on Optima Nova LT font licensing (currently using Oswald as fallback)
- [ ] Toggle on Cloudflare Web Analytics or Vercel Analytics

## Future: Stripe integration

When ready to add payments:
1. Create `api/create-checkout.js` (Stripe Checkout session creator)
2. Create `api/webhook.js` (Stripe webhook handler for fulfillment)
3. Create `success.html` and `cancel.html`
4. Add env vars in Vercel dashboard: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
5. Wire "Buy" buttons in `scripts/main.js` to POST to `/api/create-checkout`

**Critical:** never commit `.env.local` or any file containing real Stripe keys. `.gitignore` is configured to prevent this.
