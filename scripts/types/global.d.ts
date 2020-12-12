/* eslint-disable @typescript-eslint/no-unused-vars */
interface Window {
  dataLayer?: Record<string, unknown>[]
  app: {
    slug?: string
    reveal: {
      notesHtml: string
      config: Record<string, unknown>
      theme?: string
      highlightTheme?: string
    }
    firebase: {
      config: Record<string, unknown>
      presenterUids: string[]
    }
  }
  Reveal?: RevealStatic
}
