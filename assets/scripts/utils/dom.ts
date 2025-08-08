/**
 * Disallow body to scroll
 */
export const disableBodyScroll = () => {
  document.body.classList.add('no-overflow')
}

/**
 * Allow body to scroll
 */
export const enableBodyScroll = () => {
  document.body.classList.remove('no-overflow')
}

/**
 * Check if body can scroll
 */
export const isBodyScrollEnabled = () =>
  window.getComputedStyle(document.body).overflow !== 'hidden'

/**
 * Stop event bubbling
 */
export const stopPropagation = (ev: Event) => {
  ev.stopPropagation()
}

/**
 * Fieldset has a disabled option which is useful for controlling for
 * JavaScript availability
 */
export const enableFormFieldset = (form: HTMLFormElement) => {
  const fieldset = form.querySelector('fieldset')
  fieldset?.removeAttribute('disabled')
}

/**
 * Determine if page is loaded in iFrame (such as notes window)
 * @source https://stackoverflow.com/a/326076/6817437
 */
export const inIframe = () => {
  try {
    return window.self !== window.top
  } catch (_e) {
    return true
  }
}
