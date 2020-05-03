declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROFILE_PORT: number;
      PROFILE_DB_URL: string;
    }
  }
}

export {}
