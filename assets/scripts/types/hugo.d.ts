declare module '@params' {
  export const NODE_ENV: 'development' | 'production'
  export const isProd: boolean
  export const firebaseApiKey: string
  export const firebaseAuthDomain: string
  export const firebaseDatabaseUrl: string
  export const firebaseAppId: string
  export const firebaseProjectId: string
  export const firebaseMeasurementId: string
  export const presenterUids: string
}
