import { Request } from 'express';
import { User } from './index.js';

export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    role: 'admin' | 'user';
    lastActive: Date;
    username?: string;
    displayName?: string;
    avatarUrl?: string;
    profileViews: number;
}

export interface AuthRequest extends Request {
    user?: User;  // Using the User type from index.ts
}

export interface JWTPayload {
    userId: string;
    iat?: number;
    exp?: number;
} 