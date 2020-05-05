declare global {
  namespace NodeJS {
    interface Global {
      variable: string 
    }
    interface ProcessEnv {
      PROFILE_PORT: number;
      PROFILE_DB_URL: string;
      AUTH_API_URL: string;
    }
  }
}

export {}
