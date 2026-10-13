import React from 'react'
import { Link } from 'react-router-dom'
import { GeoBg } from '../components/GeoBg'
import { Tag } from '../components/Tag'
import { SectionHeader } from '../components/SectionHeader'
import styles from './About.module.css'
import selfPortrait from '../assets/self-portrait.webp'

const skills = {
  'Frontend': ['React', 'TypeScript', 'Next.js', 'Vite', 'CSS / Sass', 'Tailwind', 'Greensocks', 'React Router'],
  'Backend':  ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'PHP'],
  'Data':     ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'MySQL', 'Elasticsearch'],
  'DevOps':   ['Apache', 'AWS', 'Netlify', 'GitHub Actions', 'Nginx'],
}

const timeline = [
  { year: '2026', title: 'Web Veteran', org: 'Freelance', desc: 'With the rise of AI it is no longer a constraint to design websites and I can focus on just coding, rapidly increasing the rate at which I could deliver solutions.' },
  { year: '2018', title: 'Web App Developer', org: 'Self', desc: 'A personal web app that creates a todo list using randomly generated tasks with a Node.js, Express.js and MongoDB backend.' },
  { year: '2015', title: 'Full Stack Developer', org: 'Freelance', desc: 'My first real website, it was for a local church with some simple social features that taught me all about backend architecture using Apache, PHP and MySql.' },
  { year: '2014', title: 'Tech Veteran', org: 'Self', desc: 'My first fully custom built computer, allowing me to explore advanced hardware configurations and performance optimizations.' },
  { year: '2013', title: 'Web Newbie', org: 'Self', desc: 'My first foray into coding, starting with developing websites using simple HTML and CSS.' },
  { year: '2007', title: 'Tech Tinkerer', org: 'Self', desc: 'My first experiments with changing and upgrading my computer hardware, setting the stage for building my own custom computers.' },
  { year: '2004', title: 'Tech Newbie', org: 'Self', desc: 'I purchased my first personally owned computer, sparking my passion for technology.' },
]

export const About: React.FC = () => (
  <div className="page-enter">

    {/* ── Hero ── */}
    <section className={styles.hero}>
      <GeoBg variant="dots" opacity={0.2} />
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroText}>
          <span className={styles.heroLabel}>
            <span className={styles.heroLine} />
            About Me
          </span>
          <h1 className={styles.heroTitle}>
            Dev. Creator.<br />
            <span className={styles.accent}>Problem Solver.</span>
          </h1>
          <p className={styles.lead}>
            I'm a full-stack web developer with a passion for building things that
            are fast, accessible, and beautiful. I live at the intersection of
            engineering discipline and creative curiosity.
          </p>
          <p className={styles.body}>
            Based in the American Midwest, I've spent the last ten plus years turning
            my coding curiosity into a deep understanding of web development. Whether
            that's a side project for myself, fun websites for friends and family, or
            websites for local businesses — I bring the same level of care to all of it.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/contact" className={styles.ctaPrimary}>Work With Me</Link>
            <a href="/cv.pdf" className={styles.ctaSecondary} download>
              Download CV
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Photo / geometric portrait */}
        <div className={styles.heroVisual}>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitFrame} aria-hidden>
              <svg className={styles.frameSvg} viewBox="0 0 320 360" fill="none">
                <polygon points="160,10 310,90 310,270 160,350 10,270 10,90" stroke="var(--orange)" strokeWidth="2" opacity="0.5"/>
                <polygon points="160,30 290,100 290,260 160,330 30,260 30,100" stroke="var(--blue)" strokeWidth="1" opacity="0.35"/>
              </svg>
            </div>
            <img
              src={selfPortrait}
              alt="Developer portrait"
              className={styles.portrait}
            />
          </div>

          {/* Floating facts */}
          <div className={`${styles.floatCard} ${styles.floatTop}`}>
            <span className={styles.floatNum}>10+</span>
            <span className={styles.floatLabel}>Years coding</span>
          </div>
          <div className={`${styles.floatCard} ${styles.floatBottom}`}>
            <span className={styles.floatNum}>8+</span>
            <span className={styles.floatLabel}>Projects shipped</span>
          </div>
        </div>
      </div>
    </section>

    {/* ── Skills ── */}
    <section className={`section ${styles.skillsSection}`}>
      <div className="container">
        <SectionHeader
          label="Technical Skills"
          title="What I Work With"
          subtitle="The tools and technologies I reach for — and know deeply enough to teach."
        />
        <div className={styles.skillsGrid}>
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className={styles.skillGroup}>
              <div className={styles.skillGroupHeader}>
                <span className={styles.skillGroupDot} />
                <h3 className={styles.skillGroupTitle}>{category}</h3>
              </div>
              <div className={styles.skillTags}>
                {items.map(skill => (
                  <Tag key={skill} label={skill} variant="blue" size="md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Timeline ── */}
    <section className={`section ${styles.timelineSection}`}>
      <GeoBg variant="grid" opacity={0.12} />
      <div className={`container ${styles.timelineInner}`}>
        <SectionHeader
          label="Experience"
          title="My Journey"
        />
        <div className={styles.timeline}>
          {timeline.map(({ year, title, org, desc }, i) => (
            <div key={i} className={styles.timelineItem}>
              <div className={styles.timelineLeft}>
                <span className={styles.timelineYear}>{year}</span>
              </div>
              <div className={styles.timelineConnector}>
                <div className={styles.timelineDot} />
                {i < timeline.length - 1 && <div className={styles.timelineLine} />}
              </div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>{title}</h3>
                <span className={styles.timelineOrg}>{org}</span>
                <p className={styles.timelineDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Values ── */}
    <section className={`section ${styles.valuesSection}`}>
      <div className="container">
        <SectionHeader
          label="How I Think"
          title="My Values"
          align="center"
        />
        <div className={styles.valuesGrid}>
          {[
            { icon: '⬡', title: 'Craft Over Speed', desc: 'I take time to do it right. Technical debt has compounding interest.' },
            { icon: '◎', title: 'Accessibility First', desc: 'The web is for everyone. I build with WCAG compliance as a baseline, not an afterthought.' },
            { icon: '△', title: 'Honest Communication', desc: 'I\'d rather tell you something takes three weeks than promise one and deliver late.' },
            { icon: '◇', title: 'Continuous Learning', desc: 'The best developers I know are the most curious. I read, I experiment, I teach.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className={styles.valueCard}>
              <span className={styles.valueIcon}>{icon}</span>
              <h3 className={styles.valueTitle}>{title}</h3>
              <p className={styles.valueDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  </div>
)
