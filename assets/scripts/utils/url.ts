const getHostnameWithPath = () => `${window.location.hostname}/${window.location.pathname.split('/')[1]}`

/**
 * Ensure the URL is a new domain or a different path than /slides
 * so we know it's not a slide link.
 */
export const isNotALinkToSlide = (href: string) =>
  href?.includes('http') && (!href.includes(window.location.hostname) || !href.includes(getHostnameWithPath()));

export const getSlug = (): string => {
  const trailingSlashRemoved = window.location.pathname.replace(/\/$/, '')
  return trailingSlashRemoved.substring(
    trailingSlashRemoved.lastIndexOf('/') + 1,
  )
}
