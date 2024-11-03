import jwt from 'jsonwebtoken';
import { config } from '../../config.js';

interface JWTPayload {
  userId: string;
}

export const signJWT = (payload: JWTPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token as string);
      }
    );
  });
};

export const verifyJWT = (token: string): Promise<JWTPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded as JWTPayload);
    });
  });
}; 