import { Document, Types } from 'mongoose';

export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name?: string;
  role: 'admin' | 'user';
  lastActive: Date;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  profileViews: number;
  createdAt: Date;
  updatedAt: Date;
} 