export enum ToastType {
  Info = 0,
  Warn = 1,
  Error = 2,
}

const typeClasses: Record<ToastType, string> = {
  [ToastType.Info]: 'toast-info',
  [ToastType.Warn]: 'toast-warn',
  [ToastType.Error]: 'toast-error',
}

/**
 * App-wide toast
 */
export const toast = (message: string, type: ToastType = ToastType.Info) => {
  const p = document.createElement('P')
  p.setAttribute('role', 'alert')
  p.classList.add('toast', typeClasses[type])
  const text = document.createTextNode(message)
  p.appendChild(text)
  document.body.prepend(p)
}
