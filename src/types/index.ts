// ── Project types ──────────────────────────────────────────
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl: string
  featured?: boolean
  year: number
}

// ── Greeting Card types ────────────────────────────────────
export interface GreetingCard {
  id: string
  title: string
  occasion: string
  description: string
  previewUrl: string
  liveUrl?: string
  tags: string[]
  year: number
}

// ── Support / Tech Help types ──────────────────────────────
export interface SupportQuestion {
  id: string
  question: string
  askedBy: string
  email: string
  category: string
  status: 'pending' | 'in-progress' | 'resolved'
  createdAt: string
}

export interface SupportArticle {
  id: string
  title: string
  slug: string
  summary: string
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
  coverImage?: string
  content: ArticleBlock[]
}

export type ArticleBlock =
  | { type: 'text';    body: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'code';    language: string; code: string }
  | { type: 'image';   src: string; alt: string; caption?: string }
  | { type: 'video';   src: string; caption?: string }
  | { type: 'tip';     body: string }

// ── Nav ───────────────────────────────────────────────────
export interface NavLink {
  label: string
  path: string
}
