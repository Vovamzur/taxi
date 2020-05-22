declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SOCKET_GEO_LOCATION_URL: string;
      SOCKET_WEB_NOTIFICATION_URL: string;
    }
  }
}

export {}
