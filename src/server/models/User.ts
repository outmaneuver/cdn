import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types';

export interface UserDocument extends Omit<User, 'id'>, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema); 