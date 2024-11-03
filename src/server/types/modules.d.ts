declare module 'express' {
  const express: any;
  export interface Request extends Express.Request {}
  export interface Response extends Express.Response {
    sendFile(path: string): void;
    json(body: any): void;
    status(code: number): Response;
  }
  export type NextFunction = (err?: any) => void;
  export default express;
}

declare module 'cors' {
  const middleware: any;
  export default middleware;
}

declare module 'mongoose';