import type { Project, GreetingCard, SupportArticle } from '../types';
import easeMyLifeImg from '../assets/ease-my-life-website.webp';
import hairDesignsImg from '../assets/hair-designs-website.webp';
import bernieBearsImg from '../assets/the-bernie-bears-website.webp';
import tonysToppersImg from '../assets/tonys-toppers-website.webp';
import sealAndShieldImg from '../assets/seal-and-shield-website.webp';
import reeseRoofingImg from '../assets/reese-roofing-website.webp';
import techGeekImg from '../assets/tech-geek-website.webp';
import mothersDayCardPreview from '../assets/mothers-day-card-preview-image.webp';
import fathersDayCardPreview from '../assets/fathers-day-card-preview-image.webp';
import happyBirthdayCardPreview from '../assets/happy-birthday-card-preview-image.webp';
import fourthOfJulyCardPreview from '../assets/fourth-of-july-card-preview-image.webp';
import happyHalloweenCardPreview from '../assets/happy-halloween-card-preview-image.webp';
import happyThanksgivingCardPreview from '../assets/happy-thanksgiving-card-preview-image.webp';

// ── Projects ───────────────────────────────────────────────
export const projects: Project[] = [
    {
    id: 'proj-01',
    title: 'Ease My Life',
    description: 'A progressive web app todo list application that decides what to do, so that you don\'t have to.',
    tags: ['React', 'TypeScript', 'Node.js', 'React Router', 'Vite'],
    liveUrl: 'https://easemylife.app/',
    githubUrl: 'https://github.com/z4nta0/ease-my-life',
    imageUrl: easeMyLifeImg,
    featured: true,
    year: 2026,
  },
  {
    id: 'proj-02',
    title: 'Hair Designs',
    description: 'A website for a local business of hair designers and licensed cosmetologists.',
    tags: ['React', 'TypeScript', 'Node.js', 'React Router', 'Vite'],
    liveUrl: 'https://hairdesigns.hair/',
    githubUrl: 'https://github.com/z4nta0/hair-designs',
    imageUrl: hairDesignsImg,
    featured: true,
    year: 2026,
  },
  {
    id: 'proj-03',
    title: 'The Bernie Bears',
    description: 'A website for a social media influencer about two abdorable Bernese Mountain dogs.',
    tags: ['React', 'TypeScript', 'Node.js', 'React Router', 'Vite'],
    liveUrl: 'https://theberniebears.dog/',
    githubUrl: 'https://github.com/z4nta0/the-bernie-bears',
    imageUrl: bernieBearsImg,
    featured: true,
    year: 2026,
  },
  {
    id: 'proj-04',
    title: 'Tony\'s Toppers',
    description: 'A website for a young man with down syndrome who sells hand made crafts.',
    tags: ['React', 'TypeScript', 'Node.js', 'React Router', 'Vite'],
    liveUrl: 'https://tonystoppers.com/',
    githubUrl: 'https://github.com/z4nta0/tonys-toppers',
    imageUrl: tonysToppersImg,
    featured: true,
    year: 2026,
  },
  {
    id: 'proj-05',
    title: 'Seal and Shield',
    description: 'A website for a local roofing businesses based in the Lawrence, Kansas area.',
    tags: ['React', 'TypeScript', 'Node.js', 'React Router', 'Vite'],
    liveUrl: 'https://sealandshieldroof.com/',
    githubUrl: 'https://github.com/z4nta0/seal-and-shield',
    imageUrl: sealAndShieldImg,
    featured: true,
    year: 2026,
  },
  {
    id: 'proj-06',
    title: 'Reese Roofing',
    description: 'A website for a local roofing businesses based in the Lawrence, Kansas area.',
    tags: ['React', 'TypeScript', 'Node.js', 'React Router', 'Vite'],
    liveUrl: 'https://reese-roofing.netlify.app/',
    githubUrl: 'https://github.com/z4nta0/reese-roofing',
    imageUrl: reeseRoofingImg,
    featured: true,
    year: 2026,
  },
  {
    id: 'proj-07',
    title: 'Tech Geek',
    description: 'A website for helping local businesses get online in order to reach larger audiences and grow their reach.',
    tags: ['React', 'TypeScript', 'Node.js', 'React Router', 'Vite'],
    liveUrl: 'https://techgeek.support/',
    githubUrl: 'https://github.com/z4nta0/techgeek',
    imageUrl: techGeekImg,
    featured: true,
    year: 2026,
  },
]

// ── Greeting Cards ─────────────────────────────────────────
export const greetingCards: GreetingCard[] = [
    {
    id: 'card-01',
    title: 'Happy Birthday',
    occasion: 'Birthday',
    description: 'An animated Happy Birthday card with confetti, ballons and a message.',
    previewUrl: happyBirthdayCardPreview,
    liveUrl: '/happybirthdaycard',
    tags: ['Animation', 'Canvas', 'SVG', 'JavaScript', 'Typescript', 'GSAP', 'React', 'Birthday'],
    year: 2026,
  },
    {
    id: 'card-02',
    title: 'Mother\'s Day',
    occasion: 'Holiday',
    description: 'A card that celebrates mothers with a heartfelt message and beautiful animations.',
    previewUrl: mothersDayCardPreview,
    liveUrl: '/mothersdaycard',
    tags: ['Animation', 'SVG', 'JavaScript', 'Typescript', 'GSAP', 'React', 'Mother\'s Day'],
    year: 2026,
  },
  {
    id: 'card-03',
    title: 'Father\'s Day',
    occasion: 'Holiday',
    description: 'A card that celebrates fathers with a heartfelt message and beautiful animations.',
    previewUrl: fathersDayCardPreview,
    liveUrl: '/fathersdaycard',
    tags: ['Animation', 'SVG', 'JavaScript', 'Typescript', 'GSAP', 'React', 'Father\'s Day'],
    year: 2026,
  },
  {
    id: 'card-04',
    title: 'Fourth of July',
    occasion: 'Holiday',
    description: 'Independence Day celebration with fireworks and patriotic animations.',
    previewUrl: fourthOfJulyCardPreview,
    liveUrl: '/fourthofjulycard',
    tags: ['Animation', 'SVG', 'Javascript', 'Typescript', 'GSAP', 'React', 'Fourth of July'],
    year: 2026,
  },
  {
    id: 'card-05',
    title: 'Happy Halloween',
    occasion: "Halloween",
    description: 'An animated Happy Halloween card with spooky animations and effects.',
    previewUrl: happyHalloweenCardPreview,
    liveUrl: '/happyhalloweencard',
    tags: ['Animation', 'SVG', 'Javascript', 'Typescript', 'GSAP', 'React', 'Halloween'],
    year: 2026,
  },
  {
    id: 'card-06',
    title: 'Happy Thanksgiving',
    occasion: 'Thanksgiving',
    description: 'An animated Happy Thanksgiving card with festive animations and effects.',
    previewUrl: happyThanksgivingCardPreview,
    liveUrl: '/happythanksgivingcard',
    tags: ['Animation', 'SVG', 'Javascript', 'Typescript', 'GSAP', 'React', 'Thanksgiving'],
    year: 2026,
  },
]

// ── Support Articles ───────────────────────────────────────
export const supportArticles: SupportArticle[] = [
  {
    id: 'art-01',
    title: 'How to Take a Screenshot on Windows',
    slug: 'how-to-take-screenshot-windows',
    summary: 'A complete walkthrough of how to take a screenshot in Microsoft\'s Windows OS.',
    category: 'Windows',
    tags: ['Microsoft', 'Windows', 'Screenshot'],
    publishedAt: '2024-11-15',
    readingTime: 8,
    coverImage: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=800&q=80',
    content: [
      { type: 'text', body: 'Module resolution errors are among the most frustrating issues in Node.js development. This guide covers the five most common root causes.' },
      { type: 'heading', level: 2, text: '1. Check your package is actually installed' },
      { type: 'code', language: 'bash', code: 'npm install\nnpm ls <package-name>' },
      { type: 'tip', body: 'Always commit your package-lock.json. This prevents version mismatches across environments.' },
    ],
  },
  {
    id: 'art-02',
    title: 'How to Change iPhone Wallpaper',
    slug: 'how-to-change-iphone-wallpaper',
    summary: 'Step-by-step guide to change the wallpaper on an Apple iPhone.',
    category: 'iPhone',
    tags: ['Apple', 'iPhone', 'Smnartphone'],
    publishedAt: '2025-10-02',
    readingTime: 12,
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    content: [
      { type: 'text', body: 'A consistent code style prevents entire categories of arguments and bugs. Here\'s how to set it up from scratch.' },
    ],
  },
  {
    id: 'art-03',
    title: 'How to Do a Factory Reset on Android',
    slug: 'how-to-factory-reset-android',
    summary: 'Step-by-step guide to perform a factory reset on an Android device.',
    category: 'Android',
    tags: ['Android', 'Factory Reset', 'Smartphone'],
    publishedAt: '2023-08-20',
    readingTime: 10,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    content: [
      { type: 'text', body: 'useEffect is one of the most powerful — and most misused — hooks in React. Let\'s fix that.' },
    ],
  },
]

export const supportCategories = ['Windows', 'Mac', 'Android', 'iPhone', 'iPad', 'Linux', 'AI', 'Javascript', 'HTML', 'CSS']
