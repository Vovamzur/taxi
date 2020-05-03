declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_PORT: number;
      SECRET_KEY: string;
      AUTH_DB_URL: string;
    }
  }
}

export {}
