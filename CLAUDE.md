# TechGeek.dev

z4nta0's developer portfolio, a real (indexed) site rather than a demo.
Live URL: https://techgeek.dev/ (not launched yet). Contact email:
contact@techgeek.dev (mailbox not set up yet). Use z4nta0 wherever the
owner's name appears.

It was split from `../tech-geek-support` (live at https://techgeek.support/)
on 2026-10-12: the Support and Cards pages were cut out, and they become
their own projects, `../tech-geek-support` and `../tech-geek-cards`
(https://techgeek.cards/). All three share one design so they read as a
family.

## Order of work

1. Cut the Support and Cards content out (done 2026-10-12).
2. Bring the project fully in line with the user-level rules, the same way
   ease-my-life, reese-roofing, seal-and-shield, tonys-toppers,
   the-bernie-bears, and hair-designs were.
3. Work through the deferred items below.

## Deferred items

Decided 2026-10-12 to leave these until the compliance pass is finished.

- **Home services grid**: removing the greeting cards service left 3 cards
  in a grid built for 4 columns (2 below 1024px), so desktop has an empty
  slot and tablet a short last row, which the Card Grids rule forbids. The
  user will decide whether to add a service or remove the section.
- **Linking the three sites**: .dev should link out to .support and .cards,
  but where and how isn't decided. The Home call to action's "Need Tech
  Help?" link to `/support` was removed until then.
- **Tech Geek project entry** (Work and Home): it stays, but its screenshot
  (and possibly its description and GitHub link) needs updating once
  `../tech-geek-support` is finished.
- **Business card SVGs** (`src/assets/business-card-*.svg`): kept as the
  starting point for new cards based on this site. Update their URL and
  email to techgeek.dev once everything else is done.
- **Contact email setup**: create the contact@techgeek.dev mailbox and point
  the EmailJS contact template and the Netlify environment variables at it.
  The support template variable (`EMAILJS_SUPPORT_TEMPLATE_ID`) isn't used
  here any more.
