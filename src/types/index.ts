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

// ── Nav ───────────────────────────────────────────────────
export interface NavLink {
  label: string
  path: string
}
