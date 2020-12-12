export const isNewDomain = (href: string) =>
  href && href.includes('http') && !href.includes(window.location.hostname)
