declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GEO_LOCATION_PORT: number;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_DIALECT: string;
    }
  }
}

export {}
