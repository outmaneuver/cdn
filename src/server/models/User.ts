import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
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

const userSchema = new mongoose.Schema<UserDocument>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  name: {
    type: String,
    required: false,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  displayName: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  profileViews: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema); 