import mongoose, { Schema, Document } from 'mongoose';
import { Content } from '../types';

export interface ContentDocument extends Omit<Content, 'id'>, Document {
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export const ContentModel = mongoose.model<ContentDocument>('Content', contentSchema); 