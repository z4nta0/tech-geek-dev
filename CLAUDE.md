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
  assets/                fonts/ (the self-hosted fonts) and images/ (the
                         project screenshots Home and Work both show)
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
original images and the scripts that render them, and the business card
artwork in `design/business-cards/`), and `tests/`.

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
3. **ESLint**, set up from the siblings' `eslint.config.ts`. Done 2026-10-12
   with the-bernie-bears' copy unchanged and the siblings' versions; the
   repository lints with no findings, and `tsconfig.node.json` type checks
   the config too.
4. **Playwright and axe** in all three engines, with baseline screenshots of
   every route at phone and desktop widths and the open phone menu, taken
   before anything moves. Its dev server runs on port 5194 (the siblings use
   5190 through 5193). Whatever the current site already fails is listed
   here for the step that fixes it. Done 2026-10-12 (see "## Test suites").
   The interaction and SEO suites join in step 11, once there's something
   for them to check. Everything below fails on the current site, in every
   engine unless noted:
   - **The closed phone menu stays live** (every page, every width): the
     drawer is only moved out of view, so its links take Tab stops while off
     screen ("Home", "Work", "About", "Contact" focused but not on screen),
     and its "Hire Me" link overlaps the bar's logo, links, button, and
     toggle, which accounts for most of the responsive suite's overlap
     failures: step 8, when the menu's state moves to attributes.
   - **Contrast** (serious, every page): the orange text and buttons, the
     wordmark's ".dev", the code window, filter labels, tags, the footer, and
     Contact's labels and submit button: step 9, raised with the user first.
   - **No reduced motion**: `fadeUp`, `tickerScroll`, and the other
     animations all play: step 8.
   - **Contact's fields have no visible focus indicator** (the name, email,
     budget, and message fields): step 8, with the focus ring rule in step 11.
   - **Heading order** on Work (a project card's `h3` under the page's `h1`
     with no `h2` between): step 6.
   - **Sideways scrolling**: the Home hero's heading is wider than a small
     phone, scrolling the page about 75px at 320px, 35px at 360px, and 5 to
     10px at 390px (the reflow check fails Home and the menu state at 320px),
     and the hero heading spills its box at most widths up to 480px and again
     from 1,025px: steps 9 and 10.
   - **Other spills** the responsive suite reports at a few widths each, on
     About (around 1,024px), Contact (320px to 641px), Work (320px, 480px,
     768px), and the 404 page (360px to 480px): steps 9 and 10, rechecked
     once the menu no longer overlaps everything.
5. **Directory structure**: kebab-case files in the layout above, the fonts
   (Syne, DM Mono, Lora) self-hosted instead of loaded from Google Fonts,
   the single-page fallback moved from `netlify.toml` to
   `public/_redirects`, and the email function rewritten in TypeScript.
   Done 2026-10-12 in five commits:
   - **Fallback**: the same rule moved to `public/_redirects`, and
     `netlify.toml`, which held nothing else, was removed; Netlify finds the
     email function in its default `netlify/functions` folder.
   - **Source files**: moved into the layout above with only their import
     paths changed (each now naming its extension), plus the project type
     joining `ui/projects.ts` and `global.css` becoming `styles.css`. Module
     class hashes follow file paths, so the build can't be byte-identical;
     every capture matched instead.
   - **Images**: the portrait moved beside the About page, the project
     screenshots into `src/assets/images/`, and the unused business card
     SVGs into `design/business-cards/`, with a byte-identical build.
   - **Fonts**: the same latin files Google served, declared in
     `styles/fonts.css`; Syne (400 to 800) and Lora's upright face (400 to
     700) are variable, while Lora's italic and the four DM Mono faces are
     single weights. The rendering suite matched apart from the WebKit flake
     (see "## Test suites").
   - **Email function**: `netlify/functions/send-email.mts`, written to the
     formatting rules and type checked through `tsconfig.node.json`, with
     `@netlify/functions` now a dev dependency for its types. Checked with a
     stubbed fetch on every path. It also fixes a bug: a send EmailJS refused
     read the reply twice, so the page always got a generic 500 rather than
     EmailJS's own status and explanation.
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

## Test suites
Added 2026-10-12, adapted from the-bernie-bears'. Playwright suites live in
`tests/`, one project per suite and engine in `tests/playwright.config.ts`,
which starts its own dev server on port 5194 (never the usual 5173, nor the
sibling projects' 5190 through 5193) and stops it afterwards. Every suite
runs in Chromium, Firefox, and WebKit. Results, screenshots, and traces go to
`tests/output/` (git-ignored); `npx playwright show-report
tests/output/report` opens the HTML report. The states the suites visit
(every route and the 404 page at 390px and 1,440px, plus the phone menu open
at 390px) are listed in `tests/support/states.ts`, whose `opeStaFun` skips
animations that repeat forever (the hero's turning shapes, the skills
ticker, and the status dots) when waiting for the page to settle.
- `npm run test:accessibility`: the pre-commit accessibility scan. axe-core
  checks each state against WCAG 2.2 A and AA plus best practices
  (`axe.spec.ts`), and scripted checks (`scripted.spec.ts`) cover link and
  button names, a Tab walk (order, traps, focus on screen, uncovered, and
  visible), reflow at 320px, and motion under reduced motion. axe's "needs
  review" results are printed and attached to the report rather than failing
  the run.
- `npm run test:rendering`: compares a full-page screenshot of every state
  with its baseline in `tests/rendering/baselines/`, with zero tolerance,
  under reduced motion and with the page's clock fixed to one date, since the
  footer's year comes from it. Baselines are captured on Linux. After an
  intended visual change, refresh with `npm run test:rendering --
  --update-snapshots` and commit the baselines with it.
- `npm run test:responsive`: measures every route, the 404 page, and the
  open menu at 14 widths from 320 to 1,920px (the 640px, 768px, and 1,024px
  breakpoints and the pixel past each included), failing on sideways
  scrolling, an unclipped element past either edge, text spilling its box,
  or two reachable controls overlapping.
- `npm test` runs every suite.
- **Known flakes**: WebKit's Home at 390px (about 5,000 pixels over the top
  840px, up to 10 color levels) and Chromium's Contact at 1,440px (a few
  pixels) often differ from their baselines, and now and then another WebKit
  state does. The cause is the infinite animations (Home's turning shapes and
  skills ticker, Contact's pulsing status dot), which have no reduced-motion
  variant yet, so they keep moving while the suite captures. A failure like
  that gets a rerun, not new baselines, until step 8 stops them.

## Found for later
- **The Hire Me buttons reload the whole site** (step 11): the bar's and the
  drawer's Hire Me are plain `<a href='/contact'>` links rather than router
  links, so they load the page from scratch instead of switching routes.
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
- **Business card SVGs** (`design/business-cards/`): kept as the
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
