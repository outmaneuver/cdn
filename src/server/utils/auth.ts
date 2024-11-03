import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { UserDocument } from '../models/User';

export const generateToken = (user: UserDocument): string => {
  return jwt.sign(
    { id: user._id, email: user.email },
    config.jwtSecret,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
}; 