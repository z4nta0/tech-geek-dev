# TechGeek.dev

The developer portfolio of z4nta0, a full stack web developer. It shows the websites and web apps z4nta0 has built, who z4nta0 is and how they work, and how to get in touch about a project.

Live at [techgeek.dev](https://techgeek.dev/).

It's one of three sister sites that share a design so they read as one family, and its footer links to the other two:

- **[techgeek.dev](https://techgeek.dev/)**: this portfolio.
- **[techgeek.support](https://techgeek.support/)**: tech support help and articles.
- **[techgeek.cards](https://techgeek.cards/)**: interactive digital greeting cards.

## Stack

- **Node.js** 22.22 or newer (React Router 8 requires it)
- **Vite 8** dev server / bundler
- **React 19** + **TypeScript 6**
- **React Router 8** (Home, Work, About, and Contact, plus a 404 page for every other path)
- **ESLint 9** with typescript-eslint, and **Playwright** with axe-core for the test suites
- Deployed on **Netlify**, which serves `index.html` for every path (`public/_redirects`), sends the security headers in `public/_headers`, and handles the contact form through Netlify Forms

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Checks

```bash
npm run lint       # ESLint across the repo
npm run typecheck  # TypeScript across src/, the configs, tests/, and the design/ scripts
```

## Tests

```bash
npm test                    # every suite
npm run test:accessibility  # axe-core plus scripted keyboard, naming, reflow, and motion checks
npm run test:interaction    # page navigation, the phone menu, and every link and button's hover, press, and focus feedback
npm run test:rendering      # full-page screenshots of each page state against approved baselines
npm run test:responsive     # every page and the phone menu from 320 to 1,920px: no sideways scroll, spill, or overlap, and every paragraph within its measure
npm run test:seo            # titles, descriptions, canonical links, robots, social tags, structured data, the preview card, icons, robots.txt, and the sitemap
```

Each suite runs in Chromium, Firefox, and WebKit against its own dev server on port 5194, so a dev server already running on 5173 is left alone. Reports land in `tests/output/` (git-ignored); `npx playwright show-report tests/output/report` opens the HTML report. The rendering suite's approved screenshots live in `tests/rendering/baselines/` and match to the pixel, so after a change meant to alter how a page looks, review the diff in the report, then run `npm run test:rendering -- --update-snapshots` and commit the new baselines with the change. Chromium and WebKit capture with the faint background patterns hidden, since they draw them slightly differently from run to run; Firefox still checks them. The baselines were captured on Linux, and font rendering differs between systems, so on macOS or Windows refresh them locally before relying on the comparison. If a browser is missing, `npx playwright install chromium firefox webkit` installs all three.

## Build

```bash
npm run build
npm run preview
```

## Images

The project screenshots, the portrait, the social preview card, and the icons are all rendered by scripts, so they can be rebuilt whenever something changes:

```bash
npm run screenshots  # photographs each project's live site, then runs npm run images
npm run images       # encodes the originals in design/images/originals/ as WebP where the site imports them
npm run og-image     # captures design/og-image/card.html as public/og-image.png
npm run icons        # renders favicon.ico, the PNG icons, and the Apple touch icon from public/favicon.svg
```

The originals in `design/images/originals/` are kept out of git, so a fresh checkout needs `npm run screenshots` (or the original files) before `npm run images` can run. To add a project, give it a record in `src/ui/projects.ts` and a row in `SIT_REC_ARR` in `design/images/capture.mts` and in `IMA_REC_ARR` in `design/images/render.mts`, then run `npm run screenshots`. Apps cache a link's preview card for days, so a changed card should get a new file name (`og-image-2.png`), with every tag in `index.html` that points at it updated.

## Project structure

```
src/
├── assets/            Self-hosted fonts and the project screenshots
├── pages/
│   ├── home/          Home page and its .module.css
│   ├── work/          Work page, its .module.css, and edge-fade.ts (the filter row's scroll fades)
│   ├── about/         About page, its .module.css, and the portrait
│   ├── contact/       Contact page and its .module.css
│   └── not-found/     The 404 page every unknown path shows, with its .module.css
├── ui/                What more than one page uses: the bar and its phone menu, the footer, the background pattern, the section header, the tag, the project card and the project list (projects.ts), plus page-links.ts, profile-links.ts, page-description.ts (a page's own search description), and scroll-top.ts (each new page opens at its top)
├── styles/            fonts.css (@font-face) + styles.css (design tokens, base element styles, the shared focus ring, and the shared keyframes)
├── app.tsx            Root component and the route table
└── main.tsx           Entry point
public/                Files served at fixed addresses: the icons, the social card, robots.txt, sitemap.xml, and Netlify's _headers and _redirects
tests/
├── accessibility/     axe-core scan and scripted checks
├── interaction/       navigation, phone menu, and hover, press, and focus feedback checks
├── rendering/         screenshot comparisons, their baselines/, and the stylesheet that hides the background patterns
├── responsive/        layout checks across screen widths
├── seo/               head tags, structured data, preview card, icon, and crawler file checks
├── support/           the page states the suites visit
└── playwright.config.ts

design/                Source artwork and the scripts that render it, not served
├── business-cards/    The business card front and back
├── icons/             render.mts, which builds the icon set in public/ (npm run icons)
├── images/            capture.mts and render.mts, which build the screenshots and the portrait (npm run screenshots, npm run images)
└── og-image/          card.html and render.mts, which build public/og-image.png (npm run og-image)
```

## Design notes

- **Type pairing:** Syne, a wide display face, for headings and the wordmark; DM Mono for labels, buttons, and code; and Lora's italic for the occasional accent word. All three are self-hosted (`src/assets/fonts/`, declared in `src/styles/fonts.css`), so a visit makes no third-party requests.
- **Palette:** A warm ivory page (`#F5F0E8`) and a deep ink (`#1A1A2E`) for text and the footer, with a bright orange (`#F26419`) and a soft blue (`#7DB9D8`) as the accents. Text in those hues reads darker shades of each so it meets contrast.
- **Scale:** Every size, from type to spacing to motion, is a step on one scale built from the plastic ratio (about 1.32) on an 11px base, and layout widths grow with the screen between fixed bounds.
- **Theme:** A geometric, technical motif runs through the site: hexagons, grid and dot patterns, circuit lines, and a code window on Home.
- **Motion:** Each page fades up into place, and the hero's shapes turn slowly. Links, buttons, and cards respond to hover, press, and keyboard focus with a color shift, a small lift or press-in, and a focus ring that eases in, and the phone menu fades in over a dimmed page with its rows arriving one after another. All of it turns off when a visitor's system asks for reduced motion, leaving only the instant color and position changes.

## Search and the contact form

Home, Work, About, and Contact are indexed, each with its own title, description, and canonical link, and the 404 page carries `noindex`. The structured data describes z4nta0 as a person and the site as theirs. `index.html` carries the home page's title and description, since link checkers and many crawlers read it without running the site's script; the other pages set their own, and every page shares one social preview card, since link previews only ever read `index.html`.

The contact form posts to Netlify Forms: a hidden copy of the form in `index.html` registers its fields, and Netlify emails each submission to the address set in its dashboard, with the visitor's email as the reply-to.
