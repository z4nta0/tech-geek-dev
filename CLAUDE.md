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

## Content
Decided 2026-10-12 by the user, in the step 7 content review.
- **Stats** (Home's strip and About's floating facts): "10+ Years
  Experience" (z4nta0 has been a developer since 2013) and "100% Client
  Satisfaction" are written as is. "Projects Shipped" and "Happy Clients"
  are counted from `ui/projects.ts` (`SHI_COU_NUM`, every record, and
  `CLI_COU_NUM`, the records whose `cliBoo` is true), so they grow as
  projects are added, and always end in a plus, since older projects that
  are no longer online still count. The client sites are Hair Designs, The
  Bernie Bears, Tony's Toppers, Seal and Shield, and Reese Roofing; Ease My
  Life and Tech Geek are z4nta0's own.
- **Reese Roofing is a mockup**, not a real business (see its own
  CLAUDE.md), so its project description says so.
- **Skills**: Home's ticker lists TypeScript, React, Node.js, Next.js, and
  Vite. About's grid keeps everything z4nta0 has worked with, even outside
  the listed projects, minus Tailwind, GraphQL, PostgreSQL, Redis, Prisma,
  Elasticsearch, AWS, and Nginx, which were removed.
- **Confirmed as accurate**: Home's hero (the availability label, the code
  window, and the 100% Open Source badge), About's values and timeline,
  Work's process steps, and Contact's budget ranges, availability, and
  response time.
- **Removed**: About's Download CV button, which linked to a file that
  never existed.
- **Copy**: American spelling throughout, and no em dashes.

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
   email function, with the copy fixes (no em dashes). Done 2026-10-12:
   `vite.config.ts`, `index.html` (its mount element renamed `appMouDiv`),
   and every TypeScript file under `src/`, each checked by the rendering
   suite, the capture harness, or a text comparison, with baselines
   refreshed only for changed copy. The components are now `AppRooCom`,
   `NavBarCom`, `SitFooCom`, `GeoBacCom`, `SecHeaCom`, `TagLabCom`,
   `ProCarCom`, `HomPagCom`, `WorPagCom`, `AboPagCom`, `ConPagCom`, and
   `NotFouCom`, and the project list is `PRO_REC_ARR`.
   - **New shared file**: `ui/page-links.ts` (`PAG_LIN_ARR`), the page list
     the bar, the phone drawer, and the footer all render.
   - **Fixes along the way**: Work's project cards gained a visually hidden
     Projects `h2`, clearing axe's heading-order failure; the Contact form
     now treats a reply the email function marks as failed as an error
     instead of showing Message Sent; a stray-space and a children-comment
     bug were caught before commit by the JSX comment audits.
   - **Accessibility**: every remaining axe failure is color contrast
     (step 9).
7. **Content review with the user**: done 2026-10-12 alongside the Home,
   About, and Contact formatting (see "## Content"). The project and client
   counts now come from the project list (7+ and 5+), the unused skills and
   the CV button are gone, Reese Roofing is described as the mockup it is,
   and the copy is in American spelling with no em dashes.
8. **Hooks and CSS modules**: every page already has a module, so this
   mostly copies the shared global classes (`container`, `section`,
   `page-enter`, `mono`, `text-muted`, ...) into the modules that use them,
   moves the menu and active link to `aria-*` and `data-*` state, and gives
   every animation and transition its reduced-motion variant. Done
   2026-10-13 in fourteen commits.
   - **State and hooks**: the bar sets `data-nav-bar-scrolled`, the drawer
     `data-mobile-menu-open`, and Work's active filter pill
     `data-filter-button-active`; the toggle's cross reads its own
     `aria-expanded` and the current link NavLink's `aria-current`. No
     JavaScript finds elements by class, so no hook attributes were needed.
     The closed drawer now turns invisible once its slide ends, which took
     its links out of the Tab order and cleared every overlap the responsive
     suite reported.
   - **Modules**: every module is formatted in markup order with regions,
     its media queries split one per element under each element's base rule,
     and every element reached through a tag selector given a class of its
     own (the project screenshot, the toggle's bars, Contact's thank-you and
     bold response time, Home's code). The global `container`, `section`,
     `page-enter`, `mono`, and `text-muted` classes were merged into each
     element's own rule with the values that actually applied: the global
     sheet loads after the modules, so `container`'s cap and padding always
     beat Work's and Contact's 640px hero caps and Home's hero padding, which
     the merged rules drop. Plain container wrappers gained `...Inner`
     classes, each page a `page` class for its entrance, and dead rules (the
     removed CV button's, a class with no rule) are gone. Vite reads module
     classes as camelCase keys.
   - **Animations that never played**: every module that named a global
     keyframe bare (`rotateSlow`, `pulse`, `fadeUp`) pointed at a scoped name
     that didn't exist, so Home's turning shapes, staggered hero entrance,
     and pulsing dot, Contact's pulsing dot, and the 404 page's turning
     hexagons never animated on the live site. At the user's choice
     (2026-10-13) they now play through `global()`, with the 404 drawing
     centered and Home's tipped square tilted through the `translate` and
     `rotate` properties so the turning transform can't undo them.
   - **Reduced motion**: every animation and transition has a variant, html
     stops smooth scrolling, and the reduced-motion check passes everywhere.
     It also cleared Contact's "no visible focus indicator" failures: the
     check read the fields mid-transition.
   - **Global sheet**: `styles.css` holds only the tokens, the base element
     styles, and the `fadeUp`, `pulse`, and `rotateSlow` keyframes; the
     unused utilities, keyframes, and two tokens are gone.
   - **Verified** after each module by comparing the built CSS rule by rule
     (as an ordered list, then as a set once rules moved), the rendering
     suite, and, where layout could shift, every layout box to three
     decimals. Chromium's baselines for Work, About, Contact, and Home were
     refreshed: once a page's entrance stops under reduced motion, Chromium
     draws its text off the animation layer with subpixel antialiasing (and
     on Contact rounds one fractional position 1px differently, every box
     unchanged). WebKit's Home phone and menu baselines were refreshed once
     two runs proved them deterministic.
   - **Checkpoint**: a full run passes 344 tests; what remains is contrast
     (step 9), the Home hero heading's spill and sideways scrolling (steps 9
     and 10), and Work's crowded filter row (step 10).
9. **Design tokens**: the siblings' core design numbers, this site's colors
   mapped to roles, the type, spacing, duration, easing, shadow, and focus
   ring tokens, and three-segment class and keyframe names. Built as the
   shared base the support and cards sites will copy. Contrast fixes (the
   orange on ivory is about 3:1) are raised with the user first, since the
   colors visibly change. Done 2026-10-13 in seven commits.
   - **Colors**: every color reads a role token. At the user's choice
     (2026-10-13), the bright orange (`--acc-mai-col`, #F26419) and blue
     (`--acc-sec-col`, #7DB9D8) stay as fills, while text in those hues
     reads darker OKLCH shades, `--acc-dar-col` (about #bd3000) and
     `--acs-dar-col` (about #126186); muted text is #646482, and
     `--tex-inm-col` (about #8181a1) is the muted text on the dark footer.
     Orange buttons carry dark ink text, with `--acc-hov-col` as their hover,
     and focus rings draw in the dark orange through `--foc-rin-col`. Roles
     this site adds beyond the shared set: `--acc-hov-col`, `--acc-dar-col`,
     `--acs-str-col` (the stronger blue the patterns and outlines draw in),
     `--acs-dar-col`, `--acs-tin-col`, and `--tex-inm-col`. The code window's
     three dots and its pale code text stay literal colors, since they draw a
     fixed editor look whatever the theme.
   - **Fonts**: `--fon-fam-mai` (Syne), `--fon-fam-sec` (DM Mono), and
     `--fon-fam-acc` (Lora, the italic accent words), a role this site adds.
   - **Type and spacing**: the root is 68.75% (1rem is 11px) and the body
     reads the base plus 1 size. Font sizes, the vertical rhythm, vertical and
     horizontal spacing, border widths, radii, and text widths copy
     the-bernie-bears' scales, and paragraphs cap at Syne's measured 68 and 51
     characters (`--tex-wid-bas`, `--tex-wid-sma`). The bar's height is its
     own token, `--nav-bar-hei` (the p06 rhythm step, about 78.8px), which
     the heroes and sticky sidebar offset by. Layout widths (`--max-width`,
     the grid columns, the section header's 640px) wait for step 10.
   - **Motion**: durations read the `--dur-tra-*` and `--dur-ani-*` scales on
     the 18th power, the endless loops rounded up as expressive motion; the
     ease-out curve folds into `--mot-dec-eas`, beside the other four easing
     tokens; and opacities within 10% of a reciprocal power read it.
   - **Shadows**: the five elevation tokens replace the three rgba ones. Their
     values are fitted to this site's lighter shadows rather than copied from
     the-bernie-bears', so the support and cards sites should copy these.
   - **Names**: every module class has a three-segment name ending in its
     tag (`herTitHea`, `butPriAnc`, `pagEntDiv`), variants are double-dash
     modifiers, and elements copied across pages share one name. The shared
     keyframes are `contentEnterFadeUp`, `shapeLoopSpin`, and
     `statusLoopPulse`, and Home's ticker plays `ticInnDivLoopScroll`.
   - **Verified** with the built CSS compared rule by rule wherever the
     output shouldn't change, and the rendering suite in all three engines,
     its baselines refreshed for each visible change. axe passes everywhere.
   - **Checkpoint**, for step 10: the Home hero heading still spills and
     scrolls the page sideways on phones, Work's filter row crowds its last
     pill, and WebKit's reflow check also scrolls sideways on Contact and the
     404 page at 320px. The 404 page's huge pale number failed axe's contrast
     check on phones once the type scale moved it clear of the hexagons; at
     the user's choice (2026-10-13) it reads a deeper beige, the border color
     darkened to about #8d8475, which reaches the 3:1 large-text minimum.
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
- **Flakes**: before step 8 the infinite animations kept moving while the
  suite captured, so a few states failed now and then. With every animation
  stopped under reduced motion they no longer run during a capture. A
  failure that two reruns don't reproduce still gets a rerun, not new
  baselines.

## Found for later
- **Work's filter row crowds a phone** (step 10): at 390px the label, the
  sideways-scrolling pills, and the count share one line, so a focused pill
  near the row's edge is clipped by the row and partly covered by the count,
  which the keyboard walk reports as "Node.js" covered.
- **The Hire Me buttons reload the whole site** (step 11): the bar's and the
  drawer's Hire Me are plain `<a href='/contact'>` links rather than router
  links, so they load the page from scratch instead of switching routes.

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
