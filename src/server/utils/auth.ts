import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserDocument } from '../models/User';
import { JWTPayload } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export const signJWT = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyJWT = async (token: string): Promise<JWTPayload> => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};

export const getUserFromRequest = (req: Request): UserDocument | undefined => {
  return req.user as UserDocument;
}; 