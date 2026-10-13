import React, { useState } from 'react'
import { GeoBg } from '../components/GeoBg'
//import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'
//import { EMAILJS_CONFIG } from '../lib/emailjs'

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', budget: '', message: '' })
  const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
 
    try {
        await fetch('../../.netlify/functions/send-email', {
            method: 'POST',
            body: JSON.stringify({
                templateType: 'contact',
                from_name:  form.name,
                    from_email: form.email,
                    subject:    form.subject,
                    budget:     form.budget || 'Not specified',
                    message:    form.message,
                    to_email:   'contact@techgeek.support',
            })
        });/*
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          budget:     form.budget || 'Not specified',
          message:    form.message,
          to_email:   'contact@techgeek.support',
        },
      )*/
      setSent(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Something went wrong. Please try again or email contact@techgeek.support directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <GeoBg variant="circuit" opacity={0.14} />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.heroLabel}>
            <span className={styles.heroLine} />
            Get In Touch
          </span>
          <h1 className={styles.heroTitle}>
            Let's Build<br />
            <span className={styles.accent}>Something</span> Together
          </h1>
          <p className={styles.heroSub}>
            Have a project in mind? I'd love to hear about it. Send me a message
            and I'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Contact layout ── */}
      <section className={`section ${styles.contactSection}`}>
        <div className={`container ${styles.contactGrid}`}>

          {/* ── Form ── */}
          <div className={styles.formWrap}>
            {sent ? (
              <div className={styles.successState}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h2>Message Sent!</h2>
                <p>Thanks for reaching out. I'll be in touch within 24 hours.</p>
                <button className={styles.resetBtn} onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', budget: '', message: '' }) }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <h2 className={styles.formTitle}>Send a Message</h2>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="c-name" className={styles.label}>Full Name</label>
                    <input id="c-name" name="name" type="text" className={styles.input} placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="c-email" className={styles.label}>Email</label>
                    <input id="c-email" name="email" type="email" className={styles.input} placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="c-subject" className={styles.label}>Subject</label>
                    <select id="c-subject" name="subject" className={styles.select} value={form.subject} onChange={handleChange} required>
                      <option value="">Select a subject…</option>
                      <option>New Project</option>
                      <option>Freelance Work</option>
                      <option>Custom Greeting Card</option>
                      <option>Tech Support</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="c-budget" className={styles.label}>Project Budget</label>
                    <select id="c-budget" name="budget" className={styles.select} value={form.budget} onChange={handleChange}>
                      <option value="">Select a range…</option>
                      <option>Under $100</option>
                      <option>$100 – $250</option>
                      <option>$250 – $500</option>
                      <option>$500 – $1,000</option>
                      <option>$1,000+</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <p className={styles.errorMsg}>{error}</p>
                )}

                <div className={styles.field}>
                  <label htmlFor="c-message" className={styles.label}>Message</label>
                  <textarea id="c-message" name="message" className={styles.textarea} rows={6} placeholder="Tell me about your project…" value={form.message} onChange={handleChange} required />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Sending…' : 'Send Message'}
                  {!loading && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Sidebar info ── */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Contact Details</h3>
              <div className={styles.contactItems}>
                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    label: 'Email',
                    value: 'contact@techgeek.support',
                    href: 'mailto:contact@techgeek.support',
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    ),
                    label: 'GitHub',
                    value: 'github.com/techgeeksupport',
                    href: 'https://github.com/z4nta0',
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    ),
                    label: 'LinkedIn',
                    value: 'linkedin.com/in/techgeeksupport',
                    href: 'https://www.linkedin.com/in/gary-s-walton-654739400/',
                  },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={styles.contactItem}>
                    <span className={styles.contactIcon}>{icon}</span>
                    <div>
                      <span className={styles.contactLabel}>{label}</span>
                      <span className={styles.contactValue}>{value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Availability</h3>
              <div className={styles.availabilityRow}>
                <span className={styles.statusDot} />
                <div>
                  <span className={styles.statusText}>Available for new projects</span>
                  <span className={styles.statusSub}>Earliest start: Anytime</span>
                </div>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Response Time</h3>
              <p className={styles.responseText}>
                I respond to all enquiries within <strong>24 hours</strong> on business days.
                For urgent matters, reach out on LinkedIn.
              </p>
            </div>
          </aside>

        </div>
      </section>

    </div>
  )
}
