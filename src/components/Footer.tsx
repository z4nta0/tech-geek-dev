import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        <div className={styles.brand}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden>
            <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="var(--orange)" strokeWidth="2" fill="none"/>
            <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="var(--blue)" opacity="0.5"/>
            <circle cx="14" cy="14" r="3" fill="var(--orange)"/>
          </svg>
          <span className={styles.tagline}>
            Building the web, one commit at a time.
          </span>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {[
            ['Home', '/'],
            ['Work', '/work'],
            ['Cards', '/cards'],
            ['Support', '/support'],
            ['About', '/about'],
            ['Contact', '/contact'],
          ].map(([label, path]) => (
            <Link key={path} to={path} className={styles.link}>{label}</Link>
          ))}
        </nav>

        <div className={styles.copy}>
          <span className="mono text-muted">
            © {year} TechGeek.support. All rights reserved.
          </span>
          <div className={styles.social}>
            {/* GitHub */}
            <a href="https://github.com/z4nta0" target="_blank" rel="noreferrer" aria-label="GitHub" className={styles.icon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/gary-s-walton-654739400/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.icon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
