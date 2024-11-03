import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import AppError from '../utils/AppError.js';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

export class UploadController {
  async uploadFile(_req: Request, res: Response) {
    try {
      if (!_req.file) {
        throw new AppError('No file uploaded', 400);
      }

      const baseUrl = `${_req.protocol}://${_req.get('host')}`;
      const fileUrl = `${baseUrl}/uploads/${_req.file.filename}`;

      res.json({
        url: fileUrl,
        filename: _req.file.filename,
        mimetype: _req.file.mimetype,
        size: _req.file.size,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to upload file' });
      }
    }
  }

  async deleteFile(_req: Request, res: Response) {
    try {
      const { filename } = _req.params;
      const filepath = path.join(__dirname, '../../../uploads', filename);
      
      await fs.unlink(filepath);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete file' });
    }
  }
} 