export enum ToastType {
  Info = 0,
  Warn = 1,
  Error = 2,
}

const getTypeClass = (type: ToastType) => {
  switch (type) {
    case ToastType.Error:
      return 'text-blue-500'
    case ToastType.Warn:
      return 'text-yellow-500'
    default:
      return 'text-blue-500'
  }
}

/**
 * App-wide toast
 */
export const toast = (message: string, type: ToastType = ToastType.Info) => {
  const p = document.createElement('P')
  p.setAttribute('role', 'alert')
  p.classList.add(getTypeClass(type), 'text-center', 'p-4')
  const text = document.createTextNode(message)
  p.appendChild(text)
  document.body.prepend(p)
}
