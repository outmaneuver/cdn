import { Router } from 'express';
import { IndexController } from '../controllers/index';

const router = Router();
const indexController = new IndexController();

export const setRoutes = () => {
    router.get('/', indexController.getIndex.bind(indexController));
    return router;
};