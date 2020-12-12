type Meta = {
  slug: string
  content: string
  frontmatter: Record<string, unknown>
}

declare const templates: () => Meta[]

export = templates
