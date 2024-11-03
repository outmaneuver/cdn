import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { authenticate } from '../middleware/auth.js';
import { SettingsModel } from '../models/Settings.js';
import { promises as fs } from 'fs';
import { config } from '../../config.js';
import { User } from '../types/index.js';
import { UserSettings } from '../types/settings.js';

const router = express.Router();

// Extend Request to include user
interface AuthenticatedRequest extends Request {
  user?: User;
}

// Configure multer
const storage = multer.diskStorage({
  destination: config.uploadDir,
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

// File filter function
const fileFilter = async (req: AuthenticatedRequest, file: Express.Multer.File, cb: FileFilterCallback) => {
  try {
    if (!req.user) {
      cb(new Error('Authentication required'));
      return;
    }

    const settings = await SettingsModel.findOne({ userId: req.user.id })
      .lean()
      .exec() as UserSettings | null;
    
    // Use default or settings-defined allowed types
    const allowedTypes = settings?.allowedFileTypes || DEFAULT_ALLOWED_TYPES;
    const isAllowedType = allowedTypes.includes(file.mimetype);
    
    if (!isAllowedType) {
      cb(new Error('File type not allowed'));
      return;
    }

    cb(null, true);
  } catch (error) {
    cb(error as Error);
  }
};

// Configure upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: DEFAULT_MAX_SIZE // Using a static value since multer doesn't support async limits
  }
});

// Routes
router.use(authenticate);

router.post('/', upload.single('file'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Check file size against user settings after upload
    const settings = await SettingsModel.findOne({ userId: req.user!.id })
      .lean()
      .exec() as UserSettings | null;
    const maxFileSize = settings?.maxFileSize || DEFAULT_MAX_SIZE;
    
    if (req.file.size > maxFileSize) {
      await fs.unlink(req.file.path); // Delete the uploaded file
      throw new Error('File size exceeds limit');
    }

    const baseUrl = settings?.customDomain || `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({
      url: fileUrl,
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

router.delete('/:filename', async (req: Request, res: Response) => {
  try {
    const filepath = `${config.uploadDir}/${req.params.filename}`;
    await fs.unlink(filepath);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete file' });
  }
});

export default router; 