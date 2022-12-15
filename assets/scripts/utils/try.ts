/**
 * Try/catch helper with optional conditional
 */
export const tc =
  <T extends (...args: Parameters<T>) => ReturnType<T>>(
    cb: T,
    condition = true
  ): ((...args: Parameters<T>) => ReturnType<T> | undefined) =>
  (...args: Parameters<T>) => {
    if (condition) {
      try {
        return cb(...args)
      } catch (error) {
        console.error(error)
      }
    }
    return
  }
