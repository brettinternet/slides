/* eslint-disable @typescript-eslint/no-unused-vars */
interface Window {
  dataLayer?: Record<string, unknown>[]
  app: {
    reveal: {
      notesHtml: string
      config: Record<string, unknown>
      highlightTheme: string
      theme: string
    }
    firebase: {
      config: Record<string, unknown>
    }
  }
}
