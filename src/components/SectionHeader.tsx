import React from 'react'
import styles from './SectionHeader.module.css'

interface Props {
  label?: string   // mono uppercase label above the heading
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export const SectionHeader: React.FC<Props> = ({
  label,
  title,
  subtitle,
  align = 'left',
}) => (
  <div className={`${styles.wrap} ${align === 'center' ? styles.center : ''}`}>
    {label && (
      <span className={styles.label}>
        <span className={styles.line} aria-hidden />
        {label}
      </span>
    )}
    <h2 className={styles.title}>{title}</h2>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
)
