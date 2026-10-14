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
converted first, so its design becomes the shared base the other two use,
through the shared design package (step 14). TechGeek.cards is converted
next and TechGeek.support last (decided by the user 2026-10-13), since the
support site's content can only be cut out of it once it's live elsewhere.

## Kind of site
Decided 2026-10-12. z4nta0's real portfolio, so the site is indexed and gets
normal SEO, not local SEO (no storefront, hours, or service area), and never
the demo treatment.
- **Structured data**: a `WebSite` for this domain and a `Person` named
  z4nta0, never a business.
- **Name**: z4nta0 wherever the owner's name appears (the author meta, the
  structured data, copy), and https://github.com/z4nta0 as the GitHub link.
- **Contact email**: contact@techgeek.dev (set up by the user 2026-10-13). The
  contact form sends through Netlify Forms (decided by the user 2026-10-13,
  as in ease-my-life, replacing a Netlify function that called EmailJS): a
  hidden copy of the form in `index.html` registers its fields, the page
  posts them form-encoded to `/` as form `contact` with a `bot-field`
  honeypot, and Netlify emails each submission to the address set in its
  dashboard, with the visitor's email as the reply-to.

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
- **Home's featured projects** (decided 2026-10-13): four featured projects
  picked at random on each visit (`ranPicFun`, once per page load), set two by
  two on desktops and tablets and one column on phones. Four keeps every row
  even; the pick changes from visit to visit.
- **Services** (decided 2026-10-13): Local SEO Optimized, Frontend
  Development, Backend Development, and Hosting & Maintenance, the fourth
  added after the greeting cards service was cut, so the four-column grid
  keeps even rows and the section covers a site from build to upkeep.
- **Closing banner** (decided 2026-10-13): Home's "Let's Work Together"
  banner is a rounded orange card on the ivory, with ink text and an ink
  button, so it reads apart from the dark footer below it. Focus rings
  inside it draw in ink, since the dark orange ring would vanish against the
  card.

## Card Grids exception
Decided 2026-10-13 by the user, for this project only. Work's project grid
is exempt from the user-level Card Grids rule: its cards change with the
filter and grow as projects are added, so even rows can't be kept. Its rule
here is to keep the rows as even as possible, with an unequal last row
allowed; it steps through three, two, and one columns at 1,024px and 640px,
and a short last row sits centered (decided 2026-10-13), the cards laid out
as a centered wrapping row whose widths match those columns, so it holds for
any number of projects.
Every other card grid on the site keeps even rows.

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
`design/` (the
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
     `styles/fonts.css`; Syne (400 to 800) is variable, while Lora's italic
     and the DM Mono faces are single weights. The rendering suite matched
     apart from the WebKit flake (see "## Test suites"). The close-out removed
     the faces nothing used (DM Mono's light weight and its italic, and Lora's
     upright face), leaving DM Mono at 400 and 500.
   - **Email function**: `netlify/functions/send-email.mts`, written to the
     formatting rules and type checked through `tsconfig.node.json`, with
     `@netlify/functions` now a dev dependency for its types. Checked with a
     stubbed fetch on every path. It also fixes a bug: a send EmailJS refused
     read the reply twice, so the page always got a generic 500 rather than
     EmailJS's own status and explanation. Replaced by Netlify Forms on
     2026-10-13 (see "## Kind of site").
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
    user-level rules (the siblings chose the fluid horizontal rhythm). Done
    2026-10-13, followed the same day by a page-by-page review with the user.
   - **The horizontal rhythm** (the user's choice, matching every sibling
     but ease-my-life): applied in one commit (`7d027eb`), so `git revert`
     restores the fixed layout if it doesn't suit this site. The-bernie-bears'
     `--hor-rhy-*` steps join the tokens. `--con-max-wid` replaces
     `--max-width`, first at 1,920px over the second power (about 1,094px),
     then raised one step to the first power (about 1,449px, as in
     seal-and-shield, reese-roofing, and tonys-toppers), since the user found
     the content too narrow on large screens. `--gut-sid-pad` (step 016
     between spacing p01 and p04, about 19.3px to 44.9px) pads every centered
     column, the bar, the phone menu, the footer, and the 404 page. Column
     gaps and the larger card paddings clamp a horizontal step between
     spacing steps, the picture and sidebar columns clamp one between rhythm
     steps, and the section header caps at its subtitle's measure (about
     564px). Everything inside a component stays on fixed rem steps, and the
     breakpoints stay `@media` queries, as in the-bernie-bears.
   - **Overflow fixes**: Home's hero heading ("Experiences" is about 10em)
     and its stat figures size themselves by their own column or item
     through container units (`cqi`), the `h1` and the 404 number let their
     floors follow the screen below about 450px and 386px, and the wordmark
     eases smaller below about 364px with a snug phone gap beside the menu
     toggle.
   - **Hero gap**: every page's hero sits the same distance below the bar,
     `--her-gap-pad` (10vw between spacing p05 and p08, about 59px to 138px),
     and follows its content rather than the window's height, which had left
     about 421px of gap on an iPad Pro and none on a short phone.
   - **Home** (reviewed with the user): a fourth service, Hosting &
     Maintenance; the closing banner as an orange card on the ivory (see
     "## Content"); and the code window kept below desktop widths in its own
     revertible commit (`df46c7c`), beside the pitch at its natural width
     from 769px to 1,024px and centered under it on phones, its code at the
     base size and its badge's overhang following the room beside it.
   - **Work** (reviewed with the user): the process steps share one height
     in a row, form a two-by-two grid on tablets, and stack full width with
     down arrows on phones; the filter row takes its own line on phones and
     fades whichever edge still hides buttons, through ease-my-life's
     edge-fade helper (`pages/work/edge-fade.ts`); and a short last row of
     projects sits centered (see "## Card Grids exception").
   - **About** (reviewed with the user): the timeline alternates its
     milestones either side of a center line above 768px, interlocking by
     the p03 step, and centers its single column below that, under a centered
     heading; the portrait sits beside the paragraphs from 769px to 1,024px,
     the text column's children joining the hero's grid through
     `display : contents`, and stacks centered and wider on phones.
   - **Contact**: reviewed by the user and left as it was.
   - **Card grids**: Home shows four random featured projects two by two (see
     "## Content"), Work's grid is the user's exception (see "## Card Grids
     exception"), and every other grid keeps even rows.
   - **Verified**: the responsive and accessibility suites pass in all three
     engines after every change, and the rendering baselines are refreshed
     for each intended change. Contact's faint circuit pattern now and then
     fails its screenshot in WebKit and Chromium, with nothing on the page
     changed; it passes on rerun.
11. **New features**: the 404 page brought in line, pages opening at the top,
    security headers (the form posts to the site itself), image
    optimization and the favicon set, the SEO pass and social preview card
    per "## Kind of site", interaction feedback, and the phone menu's scrim
    and inert page. Done 2026-10-13 on `site-features`:
    - **404 page**: its own title and noindex, and Get In Touch beside Go
      Home.
    - **Pages open at the top**: the-bernie-bears' `useScrTopFun`
      (`ui/scroll-top.ts`), with the interaction suite's navigation spec.
    - **Hire Me** in the bar and the menu became router links.
    - **Security headers**: `public/_headers` with a strict
      Content-Security-Policy (only the site's own files, data images for the
      select arrow, and form posts to itself), HSTS, and the rest of the
      siblings' set.
    - **Images**: `npm run screenshots` captures each project's live site
      (`design/images/capture.mts`, its originals git-ignored) and encodes
      them, the portrait was rebuilt from its 1,374 by 2,048 original, and
      `npm run icons` draws the favicon set from `favicon.svg`.
    - **SEO**: every page's own title, description, and canonical link,
      `robots.txt`, the sitemap, the Person and WebSite structured data, and
      the Open Graph and Twitter tags, checked by the SEO suite.
    - **Social preview card**: `npm run og-image` renders
      `public/og-image.png` (52 KB) from `design/og-image/card.html`, the
      wordmark at the p05 size, since Syne is too wide to fit the center
      square any larger.
    - **Interaction feedback**: every control grows its focus ring in, presses
      in or dims, and has a hover; the footer and the project cards' overlay
      draw their rings in the bright orange, and the overlay also shows while a
      link in it has focus.
    - **Phone menu**: a scrim with the page inert, the four ways to close it,
      and the extras the user approved, arriving one after another: Home's
      availability pill, the links in a labelled nav, Hire Me, the profile
      tiles (from `ui/profile-links.ts`, which the footer shares), the email,
      and the tagline.
    - **Phone menu extras** (asked for by the user 2026-10-13, after the
      sibling sites' menus, which they found too plain until dressed up):
      modeled on the-bernie-bears', done together with the scrim and the inert
      page since they change the same component, with the extras the user
      approved.
    - **Project screenshots by script** (decided by the user 2026-10-13):
      a script in `design/` takes a fresh screenshot of each project's live
      site and writes the optimized WebP into `src/assets/images/`, rerun
      whenever a site changes, as part of the image optimization. Screenshots
      were chosen over the sites' social preview images, which repeat each
      project's name, and the images stay local rather than loaded from the
      live sites, which would break when a site renames its image, weigh up
      to about 270 KB each, depend on six other sites staying up, and need
      every domain allowed in the security headers.
12. **Deferred items** below, as the user decides them.
13. **Close-out**: the README, the design scripts type checked, rule audit
    rounds until clean, and the version bump.
14. **Shared design package** (decided by the user 2026-10-13): the last step
    of this project, after the close-out. The package is built from this
    site's code (see the shared design package under "## Deferred items" for
    what it holds) and this site switches to it, since TechGeek.cards is
    converted next and needs it from its first day. TechGeek.support is
    converted last, because its content has to be cut out only once it's live
    elsewhere.

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
- `npm run test:interaction`: how moving between pages and using controls
  behaves. `navigation.spec.ts` (from the-bernie-bears, added in step 11)
  checks that a footer link clicked at the bottom of each page opens the next
  page at its top, the current page's own bar link and a phone menu link do
  the same, back returns near the earlier position, and the bar's Hire Me
  switches to Contact without reloading the site.
  `feedback.spec.ts` (from the-bernie-bears) checks the interaction feedback
  rule on every state: each reachable link and button looks different
  hovered than at rest and pressed than hovered, lists its focus ring's
  outline in its transition, the first Tab stop grows its ring to full width,
  and under reduced motion every control still changes but transitions
  nothing. Real clicks are blocked while it probes.
  `menu.spec.ts` (from the-bernie-bears) opens the phone menu on About and
  checks it lists the page links, both profiles, and the email over a scrim
  with the page inert, and that tapping the scrim, Escape (which returns focus
  to the toggle), tapping the brand, and widening the screen each close it.
- `npm run test:rendering`: compares a full-page screenshot of every state
  with its baseline in `tests/rendering/baselines/`, with zero tolerance,
  under reduced motion, with the page's clock fixed to one date, since the
  footer's year comes from it, and with `Math.random` fixed, since Home picks
  its featured projects at random. Chromium and WebKit capture with
  `tests/rendering/hide-patterns.css`, which hides the faint background
  patterns (found by their `geoBacDiv` hook): those engines tile the SVG
  pattern fills a few color levels differently from run to run, which had
  spread from Contact to most pages. Firefox draws them the same every time
  and still checks them. Baselines are captured on Linux. After an
  intended visual change, refresh with `npm run test:rendering --
  --update-snapshots` and commit the baselines with it.
- `npm run test:responsive`: measures every route, the 404 page, and the
  open menu at 14 widths from 320 to 1,920px (the 640px, 768px, and 1,024px
  breakpoints and the pixel past each included), failing on sideways
  scrolling, an unclipped element past either edge, text spilling its box,
  or two reachable controls overlapping. `measure.spec.ts` (added in the close-out)
  walks every visible paragraph one character at a time at the same widths
  and fails a rendered line past 75 characters, or 60 for text below the body
  size, the upper limits of the text measure rule. Its first run found the
  project, service, value, and Response Time descriptions running up to 103
  characters, now capped at `--tex-wid-bas`.
- `npm run test:seo`: checks each page's head as the-bernie-bears' suite
  does (`head.spec.ts`): every page's own title, description, and canonical
  link, the 404 page's noindex, the tags swapping as a visitor moves between
  pages, the raw page carrying the home title and description for crawlers
  that run no script, the Person and WebSite structured data against the
  footer's profiles and Contact's email, `robots.txt`, the sitemap, the
  social preview tags and card, and every icon the head links to.
- `npm test` runs every suite.
- **Flakes**: before step 8 the infinite animations kept moving while the
  suite captured, so a few states failed now and then. With every animation
  stopped under reduced motion they no longer run during a capture. A
  failure that two reruns don't reproduce still gets a rerun, not new
  baselines. One remains (2026-10-13): Chromium's contact-desktop fails
  about one run in five on two corner pixels of the sidebar's Response Time
  card, with nothing on the page changed.

## Found for later
Raised by the close-out's audit (2026-10-14) and left for the user to decide,
since each changes how the site looks or is a judgment call the rules don't
settle.
- **Version number**: the bump at the end of the close-out (1.13.0 now), and
  whether to mark the finished portfolio with 2.0.0.
- **Footer copyright size**: `.fooCopSpa` sets `0.875em` (about 12.8px), a
  free-standing number rather than a type step. The nearest steps are the base
  (11px, as the tagline and links use) and the base plus 1 (about 14.6px).
- **h1 line height**: `styles.css` sets the h1's `line-height` to a literal
  1.15 rather than a rhythm step; the nearest is the m01 step, exactly 1,
  which tightens multi-line headings.
- **Project card hover color**: the cards lift and deepen their shadow on
  hover but shift no color, which the hover baseline asks for. A border
  shifting to the blue would add one.
- **SVG opacity literals**: a few `opacity` attributes on SVG shapes (0.6,
  0.7, 0.8) and the background patterns' strengths (0.18, 0.25) sit within 10%
  of a reciprocal power of the core design number. The transparency rule is
  written for alphas read through relative color syntax, so whether it reaches
  these is undecided.

## Deferred items
Decided 2026-10-12 to leave these until the cleanup plan is finished, and
decided by the user on 2026-10-13 (step 12, on the `deferred-items` branch).
- **Linking the three sites** (decided 2026-10-13): the footer links to
  TechGeek.support and TechGeek.cards under its tagline, in the same tab,
  ahead of those sites' own conversions, which follow this project directly.
  Only the footer for now.
- **Tech Geek project entry** (Work and Home, decided 2026-10-13): stays live
  with its current screenshot until `../tech-geek-support` is finished (under
  a week), then its screenshot, description, and GitHub link are updated and
  a TechGeek.cards entry is added.
- **Business card SVGs** (`design/business-cards/`, decided 2026-10-13): no
  redesign, only the details changed to techgeek.dev and the text enlarged,
  since the printed cards' text was too small (the 11-unit text printed at
  about 4.3pt on the 3.5 by 2 inch card). The back's QR code was decorative
  squares that encoded nothing, so it's replaced with a real code for
  https://techgeek.dev/. Done 2026-10-13 with the user's pick of two options:
  the small text two type steps larger (about 7.5pt printed) and the name
  and wordmarks one step, the front's overlapping name and wordmark fixed,
  and the back set as the brand on the left beside a QR code about 2.4cm
  across, made with the qrcode-generator package outside the project and
  checked by decoding it. The text is set in Syne and DM Mono, so printing
  needs those fonts installed, and a test print should be scanned before an
  order.
- **Cloudflare** (asked for by the user 2026-10-13): after the close-out and
  the shared design package, the user puts techgeek.dev behind Cloudflare the
  way ease-my-life is, guided step by step, which the user's own sites use and
  the client sites don't. ease-my-life's repository records only that its www
  address redirects to HTTPS through Cloudflare, so its Cloudflare and Netlify
  settings are checked first and copied. If Google Search Console was
  verified with a DNS TXT record, that record moves to Cloudflare with the
  rest of the DNS, or verification lapses.
- **Shared design package** (suggested 2026-10-12, shape decided by the user
  2026-10-13): a repository the three sites share as a GitHub dependency
  (`github:z4nta0/<repo>#<tag>`), holding the tokens, the self-hosted fonts
  and base element styles, the logo and favicon artwork, and the bar and
  footer. Each site keeps its own theme (this site's geometric, tech motif
  stays here) and its own layout widths and caps, on the same horizontal and
  vertical scales. Its tokens come in layers: the scales (core design
  numbers, rhythm, type, spacing, durations, easing, radii, borders, and
  shadows) shared and never overridden; the color and font roles shared as
  defaults a site may override; and the layout values (the content cap, side
  padding, and hero gap) as defaults each site overrides. The bar and footer
  take props for what differs (the wordmark ending, page links, tagline, menu
  extras, and sister-site links). It ships source, not a build, which each
  site's Vite compiles. Breakpoints can't be custom properties, so the package
  lists them as commented-out tokens in a region of their own, each with its
  value and what it switches (decided by the user 2026-10-13), and every site
  keeps the same ones, since the bar and footer switch at 768px.
