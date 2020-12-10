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
export const filterEvent = (ev: Event) => {
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
