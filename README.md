# TechGeek.support — Personal Portfolio

A modern, geometric-aesthetic personal portfolio built with **Node.js**, **Vite**, **React**, **TypeScript**, and **React Router**.

---

## Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Build tool | Vite 5                           |
| Framework  | React 18                         |
| Language   | TypeScript 5                     |
| Routing    | React Router v6                  |
| Styling    | CSS Modules + CSS custom properties |
| Fonts      | Syne (display) · DM Mono · Lora  |

---

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── Nav.tsx          # Fixed navigation with mobile drawer
│   ├── Footer.tsx       # Site footer
│   ├── GeoBg.tsx        # SVG geometric background patterns
│   ├── ProjectCard.tsx  # Work portfolio card
│   ├── CardItem.tsx     # Greeting card preview card
│   ├── SectionHeader.tsx# Reusable section heading block
│   └── Tag.tsx          # Pill/chip tag component
│
├── pages/               # Route-level page components
│   ├── Home.tsx         # Landing page with hero, stats, featured work
│   ├── Work.tsx         # Full project portfolio with filter
│   ├── Cards.tsx        # Digital greeting cards gallery
│   ├── Support.tsx      # Tech support Q&A + article list
│   ├── About.tsx        # Bio, skills, timeline, values
│   ├── Contact.tsx      # Contact form + details
│   └── NotFound.tsx     # 404 page
│
├── data/
│   └── index.ts         # Mock data — replace with your real content
│
├── types/
│   └── index.ts         # TypeScript interfaces
│
├── styles/
│   └── global.css       # Design tokens, resets, animations
│
├── App.tsx              # Router setup
└── main.tsx             # Entry point
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at **http://localhost:5173**

---

## Customisation Guide

### 1. Replace mock data
Edit `src/data/index.ts` to add your real projects, greeting cards, and support articles. Each entry maps directly to its card/article component via the TypeScript interfaces in `src/types/index.ts`.

### 2. Personal details
Search for placeholder text and update:
- `"Your Name"` in `Home.tsx` hero code window
- `"hello@yourdomain.com"` in `Contact.tsx`
- `"yourhandle"` GitHub / LinkedIn links in `Contact.tsx` and `Footer.tsx`
- The portrait image URL in `About.tsx`
- Availability dates in `Contact.tsx`

### 3. Color palette
All colors are defined as CSS custom properties in `src/styles/global.css`:

```css
--blue:        #7DB9D8;   /* Powder blue — primary brand */
--orange:      #F26419;   /* Sharp orange — accent       */
--ivory:       #F5F0E8;   /* Creamy ivory — background   */
--ink:         #1A1A2E;   /* Near-black — primary text   */
```

Swap any value there and the change cascades everywhere.

### 4. Fonts
Loaded from Google Fonts in `index.html`. Current stack:
- **Syne** — display / headings (geometric, tech feel)
- **DM Mono** — monospace labels, tags, nav
- **Lora** — serif italic (used sparingly in About)

To change, update the `<link>` in `index.html` and the `--font-*` variables in `global.css`.

### 5. Adding a project
```ts
// src/data/index.ts
{
  id: 'proj-07',
  title: 'My New Project',
  description: 'Short description shown on the card.',
  tags: ['React', 'Node.js'],
  liveUrl: 'https://myproject.com',
  githubUrl: 'https://github.com/me/project',
  imageUrl: 'https://your-image-url.com/image.jpg',
  featured: true,    // Shows on home page
  year: 2025,
}
```

### 6. Adding a support article
```ts
// src/data/index.ts
{
  id: 'art-04',
  title: 'How to do X',
  slug: 'how-to-do-x',           // Used in URL: /support/how-to-do-x
  summary: 'Short summary…',
  category: 'React',
  tags: ['React', 'Hooks'],
  publishedAt: '2025-03-01',
  readingTime: 7,
  content: [
    { type: 'text',    body: 'Intro paragraph…' },
    { type: 'heading', level: 2, text: 'Step 1' },
    { type: 'code',    language: 'tsx', code: 'const x = 1' },
    { type: 'tip',     body: 'Pro tip: …' },
    { type: 'image',   src: '/images/screenshot.png', alt: 'Screenshot' },
    { type: 'video',   src: 'https://youtube.com/embed/…' },
  ],
}
```

The article detail page (`/support/:slug`) renders each block type automatically — wire it up in your router when you're ready to build it out.

---

## Pages Overview

| Route        | Page     | Description                                              |
|--------------|----------|----------------------------------------------------------|
| `/`          | Home     | Hero, stats strip, featured projects, services, CTA      |
| `/work`      | Work     | Filterable full project grid + process section           |
| `/cards`     | Cards    | Greeting cards gallery with occasion filter              |
| `/support`   | Support  | Question submission form + published articles list       |
| `/about`     | About    | Bio, skills grid, career timeline, values                |
| `/contact`   | Contact  | Contact form with budget selector + details sidebar      |
| `*`          | 404      | Animated geometric 404                                   |

---

## Design System

**Palette**
- Powder blue `#7DB9D8` — structural elements, tags, links
- Sharp orange `#F26419` — CTAs, accents, active states
- Ivory `#F5F0E8` — base background
- Near-black `#1A1A2E` — primary text, dark sections

**Type scale**
- Display: Syne 800 (hero titles)
- Heading: Syne 700
- Body: Syne 400
- Labels/tags: DM Mono
- Pull quotes: Lora italic

**Geometric motifs**
- Hexagonal logo mark
- SVG circuit/grid/dot pattern backgrounds (`GeoBg` component)
- Corner triangle accents on cards
- Rotating hex/circle/square decorative shapes on hero

---

## Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```
Add `vercel.json` for client-side routing:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```
Add `public/_redirects`:
```
/* /index.html 200
```

### Static hosting (any)
```bash
npm run build
# Upload contents of dist/ to your host
```

---

## Roadmap / Next Steps

- [ ] Wire up support article detail page (`/support/:slug`) with full article renderer
- [ ] Connect contact and support forms to a backend (e.g. Resend, EmailJS, or your own API)
- [ ] Add project detail pages (`/work/:id`) with case study layout
- [ ] Integrate CMS (e.g. Sanity, Contentful) to manage projects/articles without code changes
- [ ] Add `og:image` meta tags for social sharing
- [ ] Add `sitemap.xml` and `robots.txt` for SEO

---

## License
MIT — use freely for personal and commercial projects.
