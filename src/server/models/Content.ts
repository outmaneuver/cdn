import mongoose from 'mongoose';
import type { Content } from '../types/index.js';

const contentSchema = new mongoose.Schema<Content>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  category: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

export const ContentModel = mongoose.model<Content>('Content', contentSchema); 