import express from 'express';
import { UserController } from '../controllers/user.js';
import { authenticate } from '../middleware/auth.js';
import { validateUsername } from '../middleware/validation.js';

const router = express.Router();
const userController = new UserController();

router.use(authenticate);

router.get('/stats', userController.getStats.bind(userController));
router.put('/username', validateUsername, userController.updateUsername.bind(userController));
router.get('/profile', userController.getProfile.bind(userController));

export const userRouter = router; 