# Useless Portal

A fast, English-only random website button inspired by the playful spirit of The Useless Web.

## Features

- Minimal homepage with a strong one-click call to action
- Curated random destination pool based on public useless-site references
- Local repeat avoidance with `localStorage`
- Mobile filtering for desktop-only destinations
- Static SEO metadata, Open Graph tags, Twitter card tags, JSON-LD, robots.txt, and sitemap.xml
- Search-engine-readable fallback HTML before React hydration
- Vite build ready for Vercel

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Deploy

This project is a static Vite app and can be deployed directly to Vercel.

## Google SEO Setup

After deployment, verify the production URL in Google Search Console and submit:

```text
https://useless-portal.vercel.app/sitemap.xml
```

Core checks implemented from Google's SEO Starter Guide:

- The homepage has one descriptive title and one unique meta description.
- The canonical URL points to the preferred production homepage.
- `robots.txt` allows crawling and points Google to the sitemap.
- `sitemap.xml` lists the canonical homepage with a `lastmod` date.
- The initial HTML contains readable page content even before JavaScript runs.
- JSON-LD describes the site and primary webpage.
- The layout is responsive and avoids intrusive interstitials.
