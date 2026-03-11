# Nigeria Constitution

The 1999 Constitution of the Federal Republic of Nigeria, as amended — beautifully rendered. Free and open source.

**Live site:** https://nigeria-constitution.vercel.app

---

## About

This project renders the full Nigerian Constitution from markdown source files into a clean, typographically precise reading experience. It is built as a public resource — no paywall, no login, no tracking.

## Features

- Full text of all 8 chapters and schedules
- In-page full-text search powered by Fuse.js
- Navigable table of contents with active-section tracking
- Dark and light mode (dark by default)
- Deep links to any section via URL anchors
- Fully static — deploys to Vercel, Netlify, or any CDN
- SEO-optimised with per-page Open Graph images and sitemap

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 3 (Vue 3, Composition API) |
| Styling | Tailwind CSS v3 + CSS variables |
| Content | @nuxt/content v2 (markdown) |
| Search | Fuse.js (client-side) |
| Theme | @nuxtjs/color-mode |
| OG images | nuxt-og-image |
| Sitemap | @nuxtjs/sitemap |
| Deployment | Vercel (static generation) |

## Fonts

- **Instrument Serif** — display headings
- **IBM Plex Mono** — labels, chips, code, navigation
- **Lora** — body reading text

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm generate
```

## Content Source

Constitution markdown files sourced from [mykeels/nigerian-constitution](https://github.com/mykeels/nigerian-constitution). The Constitution of the Federal Republic of Nigeria is public domain.

## Attribution

Built by [Habibthadev](https://habibthadev.tech)

## License

MIT. Constitution content is public domain.
