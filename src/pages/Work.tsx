import React, { useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { ProjectCard } from '../components/ProjectCard'
import { GeoBg } from '../components/GeoBg'
import { projects } from '../data'
import styles from './Work.module.css'

const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags))).sort()]

export const Work: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag))

  return (
    <div className="page-enter">

      {/* ── Page hero ── */}
      <section className={styles.pageHero}>
        <GeoBg variant="grid" opacity={0.15} />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.heroLabel}>
            <span className={styles.heroLine} />
            My Work
          </span>
          <h1 className={styles.heroTitle}>
            Projects &<br />
            <span className={styles.accent}>Case Studies</span>
          </h1>
          <p className={styles.heroSub}>
            A full catalogue of web applications, APIs, and tools I've designed,
            architected, and shipped — from solo side projects to client builds.
          </p>
        </div>
        {/* geometric accent corner */}
        <svg className={styles.cornerAccent} width="200" height="200" viewBox="0 0 200 200" aria-hidden>
          <polygon points="200,0 200,200 0,200" fill="none" stroke="var(--orange)" strokeWidth="2" opacity="0.25"/>
          <polygon points="200,40 200,200 40,200" fill="none" stroke="var(--blue)" strokeWidth="1" opacity="0.2"/>
        </svg>
      </section>

      {/* ── Filter bar ── */}
      <section className={styles.filterBar}>
        <div className={`container ${styles.filterInner}`}>
          <span className={styles.filterLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            Filter by tech
          </span>
          <div className={styles.filterScroll}>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`${styles.filterBtn} ${activeTag === tag ? styles.active : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <span className={styles.filterCount}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className={`section ${styles.projectsSection}`}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} featured={project.featured} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>No projects match that filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Process section ── */}
      <section className={`section ${styles.process}`}>
        <GeoBg variant="dots" opacity={0.2} />
        <div className={`container ${styles.processInner}`}>
          <SectionHeader
            label="How I Work"
            title="My Process"
            subtitle="Every project follows the same disciplined approach — from first conversation to final deployment."
            align="center"
          />
          <div className={styles.steps}>
            {[
              { num: '01', title: 'Discover', desc: 'Deep-dive into your goals, users, and constraints. No assumptions.' },
              { num: '02', title: 'Design', desc: 'Architecture diagrams, wireframes, and API contracts before a line of code.' },
              { num: '03', title: 'Build', desc: 'Iterative development with regular demos. Fully tested and documented.' },
              { num: '04', title: 'Ship', desc: 'CI/CD deployment, monitoring, and handover documentation included.' },
            ].map(({ num, title, desc }, i, arr) => (
              <React.Fragment key={num}>
                <div className={styles.step}>
                  <div className={styles.stepNum}>{num}</div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className={styles.stepArrow} aria-hidden>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
