import express from 'express';
import { AuthController } from '../controllers/auth.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', validateRegister, authController.register.bind(authController));
router.post('/login', validateLogin, authController.login.bind(authController));
router.post('/logout', authController.logout.bind(authController));
router.get('/me', authController.getCurrentUser.bind(authController));

export const authRouter = router; 