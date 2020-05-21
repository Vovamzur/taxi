declare global {
  namespace NodeJS {
    interface ProcessEnv {
      WEB_SOCKET_PORT: number;
      KAFKA_URL: string;
    }
  }
}

export {}
