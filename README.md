# TechGeek.dev

The developer portfolio of z4nta0, live at https://techgeek.dev/ (not yet
launched). It shows the websites and apps I've built, who I am, and how to
reach me.

It's one of three sites that share a design so they read as one family:

- **techgeek.dev**: this portfolio.
- **techgeek.support**: tech support help and articles.
- **techgeek.cards**: interactive digital greeting cards.

## Tech Stack

React, TypeScript, React Router, and Vite, with CSS Modules for styling,
hosted on Netlify. The contact form sends through a Netlify Function that
calls EmailJS.

## Getting Started

```bash
npm install
npm run dev
```

`npm run build` type checks and builds into `dist/`, and `npm run images`
rebuilds the optimized images from the originals in `design/images/originals/`,
which are kept out of git.

## Pages

| Route      | Page     | What it shows                                   |
|------------|----------|-------------------------------------------------|
| `/`        | Home     | Hero, stats, featured work, services            |
| `/work`    | Work     | Every project, filterable, plus my process      |
| `/about`   | About    | Bio, skills, timeline, values                   |
| `/contact` | Contact  | Contact form and details                        |
| `*`        | 404      | The not found page                              |
