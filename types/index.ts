export interface Post {
  body: string
  id: number
  title: string
}


export interface DocPage {
  id: string
  data?: {
    type?: 'widget' | 'module' | 'panel'
    title: string
    excerpt?: string
    contents?: string // AsciiDoc
  }
  subpages?: { title: string, path: string }[]
}