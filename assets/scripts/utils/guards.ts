export const isDefined = <T>(arg: T | undefined): arg is T =>
  typeof arg !== 'undefined'
