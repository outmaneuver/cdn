declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      CLIENT_URL: string;
      VITE_API_URL: string;
    }
  }
}

export {}; 