import { User } from './index.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      protocol?: string;
      headers: {
        authorization?: string;
        [key: string]: string | undefined;
      };
      body: any;
      query: {
        [key: string]: string | undefined;
      };
      params: {
        [key: string]: string;
      };
      get(name: string): string | undefined;
    }
    interface Response {
      json(body: any): void;
      status(code: number): Response;
      send(): void;
    }
  }
}

export {}; 