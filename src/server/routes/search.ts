import express from 'express';
import { SearchController } from '../controllers/search.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const searchController = new SearchController();

router.use(authenticate);

router.get('/', searchController.search.bind(searchController));
router.get('/suggestions', searchController.searchSuggestions.bind(searchController));

export const searchRouter = router; 