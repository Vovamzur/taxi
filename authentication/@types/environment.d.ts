declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_PORT: number;
      SECRET_KEY: string;
    }
  }
}

export {}
