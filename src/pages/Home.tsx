import React from 'react'
import { Link } from 'react-router-dom'
import { GeoBg } from '../components/GeoBg'
import { SectionHeader } from '../components/SectionHeader'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data'
import styles from './Home.module.css'

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '8+', label: 'Projects Shipped' },
  { value: '5+', label: 'Happy Clients' },
  { value: '100%', label: 'Client Satisfaction' },
]

const skills = [
  'TypeScript', 'React', 'Node.js', 'PostgreSQL',
  'Docker', 'GraphQL', 'Next.js', 'AWS',
  'Redis', 'Vite', 'Prisma', 'Tailwind',
]

export const Home: React.FC = () => {
  const featured = projects.filter(p => p.featured).slice(0, 3)

  return (
    <div className="page-enter">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className={styles.hero}>
        <GeoBg variant="circuit" opacity={0.18} />

        {/* Floating geometric shapes */}
        <div className={styles.shapes} aria-hidden>
          <div className={`${styles.shape} ${styles.shapeHex}`} />
          <div className={`${styles.shape} ${styles.shapeCircle}`} />
          <div className={`${styles.shape} ${styles.shapeSquare}`} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroLabel}>
              <span className={styles.pulse} aria-hidden />
              <span className="mono">Available for freelance work</span>
            </div>

            <h1 className={styles.heroTitle}>
              I Build <span className={styles.accent}>Digital</span>
              <br />
              Experiences
              <span className={styles.dot}>.</span>
            </h1>

            <p className={styles.heroSub}>
              Full-stack web developer specialising in performant, accessible, and
              beautifully crafted websites for local businesses — from backend architecture to
              pixel-perfect frontends.
            </p>

            <div className={styles.heroCtas}>
              <Link to="/work" className={styles.ctaPrimary}>
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/contact" className={styles.ctaSecondary}>
                Get In Touch
              </Link>
            </div>

            {/* Tech ticker */}
            <div className={styles.ticker}>
                <div className={ styles.tickerInner }>
                    {[...skills, ...skills].map((s, i) => (
                        <span key={i} className={styles.tickerItem}>{s}</span>
                    ))}
                </div>
            </div>
          </div>

          {/* Hero visual — geometric code window */}
          <div className={styles.heroVisual} aria-hidden>
            <div className={styles.codeWindow}>
              <div className={styles.windowBar}>
                <span className={styles.dot1} />
                <span className={styles.dot2} />
                <span className={styles.dot3} />
                <span className={styles.windowTitle}>techgeek.support.ts</span>
              </div>
              <pre className={styles.code}>
                <code>{`const developer = {
  name: "Tech Geek",
  role: "Full Stack Dev",
  stack: [
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
  ],
  available: true,
  passion: "Building things
            that matter.",
}`}
                </code>
              </pre>

              {/* Geometric overlay nodes */}
              <svg className={styles.nodeOverlay} viewBox="0 0 320 240">
                <circle cx="280" cy="20" r="4" fill="var(--orange)" opacity="0.8"/>
                <circle cx="300" cy="60" r="2.5" fill="var(--blue)" opacity="0.7"/>
                <circle cx="260" cy="200" r="4" fill="var(--orange)" opacity="0.6"/>
                <line x1="280" y1="20" x2="300" y2="60" stroke="var(--blue-light)" strokeWidth="1" opacity="0.5"/>
                <line x1="300" y1="60" x2="260" y2="200" stroke="var(--blue-light)" strokeWidth="1" opacity="0.5"/>
              </svg>
            </div>

            {/* Floating badge */}
            <div className={styles.floatingBadge}>
              <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="var(--orange)" strokeWidth="1.5" fill="none"/>
                <circle cx="14" cy="14" r="4" fill="var(--blue)"/>
              </svg>
              <div>
                <div className={styles.badgeValue}>100%</div>
                <div className={styles.badgeLabel}>Open Source</div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal divider */}
        <div className={styles.heroDivider} />
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map(({ value, label }) => (
              <div key={label} className={styles.statItem}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Work ───────────────────────────────────── */}
      <section className={`section ${styles.featuredWork}`}>
        <div className="container">
          <div className={styles.featuredHeader}>
            <SectionHeader
              label="Selected Work"
              title="Projects I'm Proud Of"
              subtitle="A curated selection of full-stack projects — from idea to deployed product."
            />
            <Link to="/work" className={styles.viewAllLink}>
              View all projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className={styles.projectsGrid}>
            {featured.map(project => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ── Services / What I Do ────────────────────────────── */}
      <section className={`section ${styles.services}`}>
        <GeoBg variant="dots" opacity={0.25} />
        <div className={`container ${styles.servicesInner}`}>
          <SectionHeader
            label="What I Do"
            title="End-to-End Development"
            subtitle="From backend architecture to frontend UI — I handle the full picture."
            align="center"
          />

          <div className={styles.serviceGrid}>
            {[
                {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="7"/>
                    <line x1="16.5" y1="16.5" x2="21" y2="21"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                    <line x1="8" y1="8" x2="11" y2="8"/>
                    <line x1="8" y1="14" x2="13" y2="14"/>
                  </svg>
                ),
                title: 'Local SEO Optimized',
                desc: 'Optimized for local search visibility, helping businesses attract nearby customers.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                  </svg>
                ),
                title: 'Frontend Development',
                desc: 'Pixel-perfect UIs built with React, TypeScript, and modern CSS. Performant, accessible, and a joy to use.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
                    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
                  </svg>
                ),
                title: 'Backend Development',
                desc: 'Scalable Node.js services, Next.js and React Router APIs, with dependable database design.',
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                ),
                title: 'Digital Greeting Cards',
                desc: 'Custom interactive greeting cards with animation, shaders, and audio — coded with love.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{icon}</div>
                <h3 className={styles.serviceTitle}>{title}</h3>
                <p className={styles.serviceDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <span className={styles.ctaBannerLabel}>Ready to build something?</span>
            <h2 className={styles.ctaBannerTitle}>Let's Work Together</h2>
          </div>
          <div className={styles.ctaBannerActions}>
            <Link to="/contact" className={styles.ctaBannerBtn}>
              Start a Project
            </Link>
            <Link to="/support" className={styles.ctaBannerSecondary}>
              Need Tech Help?
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
