import type { Project } from '../types';
import easeMyLifeImg from '../assets/ease-my-life-website.webp';
import hairDesignsImg from '../assets/hair-designs-website.webp';
import bernieBearsImg from '../assets/the-bernie-bears-website.webp';
import tonysToppersImg from '../assets/tonys-toppers-website.webp';
import sealAndShieldImg from '../assets/seal-and-shield-website.webp';
import reeseRoofingImg from '../assets/reese-roofing-website.webp';
import techGeekImg from '../assets/tech-geek-website.webp';

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
