const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const File = require('../models/File');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  const { fileLength, uploadPassword } = req.body;

  try {
    const file = new File({
      fileName: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      userId: req.userId,
      fileLength,
      uploadPassword,
    });

    await file.save();
    res.status(201).json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/files', authenticate, async (req, res) => {
  try {
    const files = await File.find({ userId: req.userId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/files/:id', authenticate, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    if (file.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await file.remove();
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/statistics', authenticate, async (req, res) => {
  try {
    const files = await File.find({ userId: req.userId });
    const totalFiles = files.length;
    const totalDataUsed = files.reduce((acc, file) => acc + file.fileLength, 0);

    res.json({ totalFiles, totalDataUsed });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/sharex-config', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const config = {
      Name: 'CDN',
      DestinationType: 'ImageUploader, FileUploader',
      RequestType: 'POST',
      RequestURL: 'http://localhost:3000/files/upload',
      FileFormName: 'file',
      Headers: {
        Authorization: `Bearer ${req.header('Authorization').replace('Bearer ', '')}`,
      },
      Arguments: {
        fileLength: user.uploadSettings.fileLength,
        uploadPassword: user.uploadSettings.uploadPassword,
      },
    };

    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
