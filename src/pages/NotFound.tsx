import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export const NotFound: React.FC = () => (
  <div className={`page-enter ${styles.wrap}`}>
    <div className={styles.inner}>
      <div className={styles.code} aria-hidden>404</div>
      <svg className={styles.geo} viewBox="0 0 200 200" fill="none" aria-hidden>
        <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="var(--blue)" strokeWidth="1.5" opacity="0.5"/>
        <polygon points="100,30 170,67.5 170,132.5 100,170 30,132.5 30,67.5" stroke="var(--orange)" strokeWidth="1" opacity="0.4"/>
        <circle cx="100" cy="100" r="20" fill="none" stroke="var(--orange)" strokeWidth="1.5" opacity="0.6"/>
      </svg>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.desc}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className={styles.btn}>Go Home</Link>
    </div>
  </div>
)
