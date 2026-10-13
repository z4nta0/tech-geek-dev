// ── Project types ──────────────────────────────────────────
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl: string
  featured?: boolean
  year: number
}

