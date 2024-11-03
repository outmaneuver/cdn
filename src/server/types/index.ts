import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Document } from 'mongoose';

export interface AuthRequest extends ExpressRequest {
  user?: {
    id: string;
    email: string;
  };
}

export interface CustomResponse extends ExpressResponse {
  // Add custom response properties here if needed
}

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content {
  id: string;
  title: string;
  body: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
} 