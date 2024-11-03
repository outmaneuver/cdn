import { Request, Response } from 'express';
import { ContentModel } from '../models/Content.js';
import AppError from '../utils/AppError.js';

export class ContentController {
  async getContent(_req: Request, res: Response) {
    try {
      const contents = await ContentModel.find()
        .sort({ createdAt: -1 })
        .populate('authorId', 'name email');
      res.json(contents);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch content' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const content = await ContentModel.findById(req.params.id)
        .populate('authorId', 'name email');
      
      if (!content) {
        throw new AppError('Content not found', 404);
      }
      
      res.json(content);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to fetch content' });
      }
    }
  }

  async create(req: Request, res: Response) {
    try {
      const content = await ContentModel.create({
        ...req.body,
        authorId: req.user!.id,
      });
      res.status(201).json(content);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create content' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const content = await ContentModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      
      if (!content) {
        throw new AppError('Content not found', 404);
      }
      
      res.json(content);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to update content' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const content = await ContentModel.findByIdAndDelete(req.params.id);
      
      if (!content) {
        throw new AppError('Content not found', 404);
      }
      
      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to delete content' });
      }
    }
  }
} 