export const isNewDomain = (href: string) =>
  href && href.includes('http') && !href.includes(window.location.hostname)

export const getSlug = (): string => {
  const trailingSlashRemoved = window.location.pathname.replace(/\/$/, '')
  return trailingSlashRemoved.substring(
    trailingSlashRemoved.lastIndexOf('/') + 1,
  )
}
