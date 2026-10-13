import React, { useState } from 'react'
//import emailjs from '@emailjs/browser'
import { Link } from 'react-router-dom'
import { SectionHeader } from '../components/SectionHeader'
import { Tag } from '../components/Tag'
import { GeoBg } from '../components/GeoBg'
//import { EMAILJS_CONFIG } from '../lib/emailjs'
import { supportArticles, supportCategories } from '../data'
import styles from './Support.module.css'

export const Support: React.FC = () => {
  const [category, setCategory] = useState('All')
  const [formData, setFormData] = useState({
    name: '', email: '', category: '', question: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtered = category === 'All'
    ? supportArticles
    : supportArticles.filter(a => a.category === category)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
 
    try {
        await fetch('../../.netlify/functions/send-email', {
            method: 'POST',
            body: JSON.stringify({
                templateType: 'support',
                from_name:  formData.name,
                from_email: formData.email,
                category:   formData.category,
                question:   formData.question,
                to_email:   'contact@techgeek.support',
            })
        });/*
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.SUPPORT_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          category:   formData.category,
          question:   formData.question,
          to_email:   'contact@techgeek.support',
        },
      )*/
      setSubmitted(true)
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
        <GeoBg variant="grid" opacity={0.14} />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.heroLabel}>
            <span className={styles.heroLine} />
            Tech Support
          </span>
          <h1 className={styles.heroTitle}>
            Got a Tech<br />
            <span className={styles.accent}>Problem?</span>
          </h1>
          <p className={styles.heroSub}>
            Submit your question and I'll create a detailed article complete with
            videos, screenshots, and a simple explanatory fix with absolutely no jargon included.
          </p>
          <div className={styles.heroStats}>
            {[
              { v: supportArticles.length.toString(), l: 'Articles Published' },
              { v: '24h',  l: 'Average Response' },
              { v: '100%', l: 'Free Forever' },
            ].map(({ v, l }) => (
              <div key={l} className={styles.heroStat}>
                <span className={styles.heroStatVal}>{v}</span>
                <span className={styles.heroStatLabel}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ask Question Form ── */}
      <section className={`section ${styles.formSection}`}>
        <div className={`container ${styles.formContainer}`}>

          <div className={styles.formCard}>
            <div className={styles.formCardHeader}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <h2 className={styles.formTitle}>Submit Your Question</h2>
            </div>

            {submitted ? (
              <div className={styles.successState}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--blue-dark)" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>Question Received!</h3>
                <p>I'll review your question and publish a detailed article within 48 hours. Check back soon!</p>
                <button className={styles.resetBtn} onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', category: '', question: '' }) }}>
                  Ask Another Question
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.input}
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={styles.input}
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="category" className={styles.label}>Category</label>
                  <select
                    id="category"
                    name="category"
                    className={styles.select}
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category…</option>
                    {supportCategories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="question" className={styles.label}>
                    Your Question
                    <span className={styles.labelHint}>Be as specific as possible — include error messages, stack traces, and what you've already tried.</span>
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    className={styles.textarea}
                    rows={6}
                    placeholder="I'm trying to… but when I… I get the error: …"
                    value={formData.question}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && (
                  <p className={styles.errorMsg}>{error}</p>
                )}

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? 'Submitting…' : 'Submit Question'}
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

          {/* Sidebar note */}
          <aside className={styles.formSidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>How it works</h3>
              <ol className={styles.sidebarSteps}>
                {[
                  'Submit your question using the form.',
                  'I review and research the problem.',
                  'An article is published with step-by-step fixes, code examples, videos, and screenshots.',
                  'You get notified by email when it\'s live.',
                ].map((step, i) => (
                  <li key={i} className={styles.sidebarStep}>
                    <span className={styles.sidebarNum}>{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Good questions include</h3>
              <ul className={styles.sidebarList}>
                {[
                  'Exact error messages',
                  'Your OS and runtime versions',
                  'What you\'ve already tried',
                  'A minimal reproducible example',
                  'Screenshots of the issue',
                ].map(item => (
                  <li key={item} className={styles.sidebarListItem}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className={`section ${styles.articlesSection}`}>
        <GeoBg variant="dots" opacity={0.18} />
        <div className={`container ${styles.articlesInner}`}>
          <SectionHeader
            label="Knowledge Base"
            title="Published Articles"
            subtitle="Browse all resolved questions, each one a detailed walkthrough with examples."
          />

          {/* Category filter */}
          <div className={styles.categoryFilter}>
            {supportCategories.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${category === cat ? styles.catActive : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.articlesList}>
            {filtered.length > 0 ? filtered.map(article => (
              <Link key={article.id} to={`/support/${article.slug}`} className={styles.articleCard}>
                <div className={styles.articleMeta}>
                  <Tag label={article.category} variant="blue" />
                  <span className={styles.articleDate}>
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span className={styles.articleRead}>{article.readingTime} min read</span>
                </div>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleSummary}>{article.summary}</p>
                <div className={styles.articleTags}>
                  {article.tags.map(t => <Tag key={t} label={t} variant="neutral" />)}
                </div>
                <span className={styles.articleArrow}>
                  Read article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </Link>
            )) : (
              <div className={styles.emptyArticles}>
                <p>No articles in this category yet. Submit a question to get things started!</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
