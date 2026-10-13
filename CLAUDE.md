# Project CLAUDE.md: tech-geek-dev

z4nta0's developer portfolio (React, Vite, React Router, deployed on Netlify
at https://techgeek.dev/, not launched yet). Every rule in the user-level
CLAUDE.md applies here; this file records only what's specific to this
project. ease-my-life, reese-roofing, seal-and-shield, tonys-toppers,
the-bernie-bears, and hair-designs have already been converted to those rules
and serve as worked examples, with the-bernie-bears the closest match.

## Origin and sibling sites
Decided 2026-10-12. This project began as a copy of `../tech-geek-support`
(live at https://techgeek.support/), which held the portfolio, tech support
articles, and digital greeting cards on one site. That site is splitting into
three:
- **techgeek.dev** (this project): the developer portfolio only. The Support
  and Cards pages were cut out on 2026-10-12.
- **techgeek.support** (`../tech-geek-support`): tech support.
- **techgeek.cards** (`../tech-geek-cards`): the greeting cards.

All three share one design so they read as a family, and this project is
converted first, so its design becomes the shared base the other two copy.

## Kind of site
Decided 2026-10-12. z4nta0's real portfolio, so the site is indexed and gets
normal SEO, not local SEO (no storefront, hours, or service area), and never
the demo treatment.
- **Structured data**: a `WebSite` for this domain and a `Person` named
  z4nta0, never a business.
- **Name**: z4nta0 wherever the owner's name appears (the author meta, the
  structured data, copy), and https://github.com/z4nta0 as the GitHub link.
- **Contact email**: contact@techgeek.dev (mailbox not set up yet). The
  contact form sends through `netlify/functions/send-email`, which calls
  EmailJS with keys held in Netlify's environment variables.

## Directory structure
Decided 2026-10-12, matching the-bernie-bears' adaptation of the user-level
"### Directory structure" layout to a website with routes. This is the
target layout step 5 moves to.
```
src/
  main.tsx               entry point
  app.tsx                the route table, the bar, and the footer
  assets/                fonts/ (the self-hosted fonts)
  pages/
    home/                the home page
    work/                the Work page
    about/               the About page and its portrait
    contact/             the Contact page
    not-found/           the 404 page every unknown path shows
  ui/                    what more than one page uses (the bar, the footer,
                         the background pattern, the section header, the
                         tag, the project card and the project list with its
                         screenshots)
  styles/                global CSS only (fonts.css, styles.css)
```
Outside `src/`: `public/` (the favicon set, the social preview card,
`robots.txt`, the sitemap, and Netlify's `_redirects` and `_headers`),
`netlify/functions/` (the contact form's email function), `design/` (the
original images and the scripts that render them), and `tests/`.

## Unused files
Decided 2026-10-12, the same as the siblings. An unused image is listed for
the user to confirm before it's removed (the business card SVGs are kept on
purpose, see "## Deferred items"). Any other file that nothing references is
removed without asking, and Windows `:Zone.Identifier` download markers are
deleted whenever they turn up (and ignored by git).

## Cleanup plan
Decided 2026-10-12, following the-bernie-bears' order. Steps 1 through 10 go
on the `cleanup-code` branch, step 11 on `site-features`, and the close-out
on `close-out`.
1. **Project setup**: this file, the dead EmailJS client code removed
   (`src/lib/emailjs.ts`, `src/env.d.ts`, the commented-out calls, and the
   `@emailjs/browser` package, since the form sends through the Netlify
   function), the unused `NavLink` type and `longDescription` field removed,
   and `.gitignore` copied from the siblings. Done 2026-10-12, with an
   identical JavaScript bundle.
2. **Dependency upgrades**, one at a time with a build check after each:
   React Router 6 to 8 (the single `react-router` package, replacing
   `react-router-dom`), then React, Vite, `@vitejs/plugin-react`, and
   TypeScript to the siblings' versions, plus `@types/node`. Each is checked
   against the previous build with screenshots, computed styles, and axe in
   all three engines. `tsconfig.node.json` is currently a copy of
   `tsconfig.json` and gets the siblings' split (`tsconfig.app.json`,
   `tsconfig.node.json`). Done 2026-10-12, in four commits.
   - **How it was checked**: a scratchpad capture script (using this
     project's Playwright and the-bernie-bears' axe, since this project's
     suites come in step 4) served each build and captured every route plus
     a missing path at 390px and 1,440px, and the open phone menu, with every
     animation and transition jumped to its end: full-page screenshots,
     every element's computed style at rest, each link and button hovered,
     each Tab stop focused, axe, and a behavior log (the menu, a menu link,
     the contact form against a stubbed email function, the Work filters).
     Two captures of one build matched exactly, except that WebKit now and
     then redraws one page a few color levels differently (a different page
     each time, never more than 10 levels), which counts as noise.
   - **Vite 8.3** with `@vitejs/plugin-react` 6.1 and `@types/node`:
     byte-identical CSS, and every capture matched.
   - **React 19.3**: every capture matched. The bundle grows by about 8.5 KB
     gzipped, React's own size.
   - **React Router 8.4**: every import moved to `react-router`, every
     capture and behavior check matched, and `npm audit` is clean.
   - **TypeScript 6.0.3**: the configs split into `tsconfig.app.json` and
     `tsconfig.node.json` (which now type checks `vite.config.ts`) under a
     references-only `tsconfig.json`, and the build and a new `typecheck`
     script run `tsc -b`. Byte-identical build, and the dev server runs.
   - **Baseline accessibility**: axe already reports color contrast
     failures on every page (10 to 45 elements each) and a heading-order
     failure on Work, for steps 4 and 9.
3. **ESLint**, set up from the siblings' `eslint.config.ts`.
4. **Playwright and axe** in all three engines, with baseline screenshots of
   every route at phone and desktop widths and the open phone menu, taken
   before anything moves. Its dev server runs on port 5194 (the siblings use
   5190 through 5193). Whatever the current site already fails is listed
   here for the step that fixes it.
5. **Directory structure**: kebab-case files in the layout above, the fonts
   (Syne, DM Mono, Lora) self-hosted instead of loaded from Google Fonts,
   the single-page fallback moved from `netlify.toml` to
   `public/_redirects`, and the email function rewritten in TypeScript.
6. **Formatting, naming, and comment pass**, one file per commit, including
   `vite.config.ts` (adding the shipped-page minifier), `index.html`, and the
   email function, with the copy fixes (no em dashes).
7. **Content review with the user**: copy that looks left over from the
   template is confirmed or rewritten, since the SEO rules forbid claims the
   site can't back up: Home's stats ("100% Client Satisfaction", "5+ Happy
   Clients", ...) and skills ticker (PostgreSQL, Docker, GraphQL, AWS, Redis,
   Prisma, Tailwind), About's values, the Work page's process section,
   Contact's budget ranges, and British spellings ("specialising").
8. **Hooks and CSS modules**: every page already has a module, so this
   mostly copies the shared global classes (`container`, `section`,
   `page-enter`, `mono`, `text-muted`, ...) into the modules that use them,
   moves the menu and active link to `aria-*` and `data-*` state, and gives
   every animation and transition its reduced-motion variant.
9. **Design tokens**: the siblings' core design numbers, this site's colors
   mapped to roles, the type, spacing, duration, easing, shadow, and focus
   ring tokens, and three-segment class and keyframe names. Built as the
   shared base the support and cards sites will copy. Contrast fixes (the
   orange on ivory is about 3:1) are raised with the user first, since the
   colors visibly change.
10. **Horizontal layout**: discussed with the user before converting, per the
    user-level rules (the siblings chose the fluid horizontal rhythm).
11. **New features**: the 404 page brought in line, pages opening at the top,
    security headers (allowing the form's call to the email function), image
    optimization and the favicon set, the SEO pass and social preview card
    per "## Kind of site", interaction feedback, and the phone menu's scrim
    and inert page.
12. **Deferred items** below, as the user decides them.
13. **Close-out**: the README, the design scripts type checked, rule audit
    rounds until clean, and the version bump.

## Found for later
- **The contact form reports success on a failed send** (step 6 or 7): it
  never checks the email function's response, so an error from EmailJS
  still shows "Message Sent!".

## Deferred items
Decided 2026-10-12 to leave these until the cleanup plan is finished.
- **Home services grid**: removing the greeting cards service left 3 cards
  in a grid built for 4 columns (2 below 1024px), so desktop has an empty
  slot and tablet a short last row, which the Card Grids rule forbids. The
  user will decide whether to add a service or remove the section.
- **Linking the three sites**: this site should link out to techgeek.support
  and techgeek.cards, but where and how isn't decided. The Home call to
  action's "Need Tech Help?" link to `/support` was removed until then.
- **Tech Geek project entry** (Work and Home): it stays, but its screenshot
  (and possibly its description and GitHub link) needs updating once
  `../tech-geek-support` is finished.
- **Business card SVGs** (`src/assets/business-card-*.svg`): kept as the
  starting point for new business cards based on this site. Update their
  URL and email to techgeek.dev once everything else is done.
- **Contact email setup**: create the contact@techgeek.dev mailbox and point
  the EmailJS contact template and the Netlify environment variables at it.
  The support template variable (`EMAILJS_SUPPORT_TEMPLATE_ID`) isn't used
  here any more.
- **Shared design package** (suggested 2026-10-12, once this project is
  done): a repository holding what has to match across the three sites (the
  tokens, the self-hosted fonts and base element styles, the logo and favicon
  artwork, and possibly the bar and footer if they end up identical), added
  to each project as a GitHub dependency (`github:z4nta0/<repo>#<tag>`) so
  all three stay in sync. Each site's own page components stay in their own
  project.
