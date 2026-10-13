import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

const links = [
  { label: 'Home',     path: '/'          },
  { label: 'Work',     path: '/work'      },
  { label: 'Cards',    path: '/cards'     },
  { label: 'Support',  path: '/support'   },
  { label: 'About',    path: '/about'     },
  { label: 'Contact',  path: '/contact'   },
]

export const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo / wordmark */}
        <NavLink to="/" className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="var(--orange)" strokeWidth="2" fill="none"/>
            <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="var(--blue)" opacity="0.6"/>
            <circle cx="14" cy="14" r="3" fill="var(--orange)"/>
          </svg>
          <span className={styles.wordmark}>
            <span className={styles.first}>TechGeek</span>
            <span className={styles.last}>.support</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Primary navigation">
          {links.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <a href="/contact" className={styles.cta}>
          Hire Me
        </a>

        {/* Mobile menu toggle */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        {links.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${styles.drawerLink} ${isActive ? styles.active : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        <a href="/contact" className={styles.drawerCta}>Hire Me</a>
      </div>
    </header>
  )
}
