// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    HOST_URL: string
    STRIPE_WEBHOOK_SECRET_KEY: string
    NEXT_PUBLIC_STRIPE_KEY: string
    STRIPE_SECRET_KEY: string
  }
}
