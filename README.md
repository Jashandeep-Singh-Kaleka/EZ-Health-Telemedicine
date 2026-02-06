# XPress Health — Landing Page

Professional landing page for [xpresshealth.care](https://xpresshealth.care), a HIPAA-compliant telemedicine platform connecting patients with licensed healthcare providers.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** TypeScript
- **Deployment:** [Vercel](https://vercel.com/)

## Pages

| Route      | Description                        |
| ---------- | ---------------------------------- |
| `/`        | Landing page with CTA              |
| `/privacy` | Privacy Policy (HIPAA-compliant)   |
| `/terms`   | Terms of Service                   |

All old application routes (e.g. `/dashboard`, `/appointments`) are permanently redirected (301) to `/`.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push this repo to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Set the **Root Directory** to `telemedicine-app` (if the repo root is the parent directory).
4. Vercel will auto-detect Next.js — no additional configuration needed.
5. Add your custom domain `xpresshealth.care` in the Vercel project settings.

## Production Features

- **Security Headers** — HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **SEO** — Open Graph, Twitter Cards, sitemap.xml, robots.txt, semantic HTML
- **Performance** — Static generation, optimized fonts, image optimization
- **Accessibility** — Semantic markup, proper heading hierarchy, focus states
- **Old Route Handling** — 301 redirects for all discontinued app routes
