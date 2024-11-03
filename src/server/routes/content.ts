import express from 'express';
import { ContentController } from '../controllers/content.js';
import { authenticate } from '../middleware/auth.js';
import { validateContent } from '../middleware/validation.js';

const router = express.Router();
const contentController = new ContentController();

router.use(authenticate); // Protect all content routes

// Bind the controller methods to maintain 'this' context
router.get('/', contentController.getContent.bind(contentController));
router.get('/:id', contentController.getById.bind(contentController));
router.post('/', validateContent, contentController.create.bind(contentController));
router.put('/:id', validateContent, contentController.update.bind(contentController));
router.delete('/:id', contentController.delete.bind(contentController));

export const contentRouter = router; 