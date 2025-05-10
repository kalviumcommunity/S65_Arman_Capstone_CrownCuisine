import express from 'express';
import { 
  createMenuCategory,
  getMenuCategories,
  updateMenuCategory,
  deleteMenuCategory,
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
  getPopularItems,
  getCompleteMenu
} from '../controllers/menuController.js';
import { protect, manager } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/categories/:restaurantId', getMenuCategories);
router.get('/items/:categoryId', getMenuItems);
router.get('/popular/:restaurantId', getPopularItems);
router.get('/complete/:restaurantId', getCompleteMenu);

// Protected routes for managers
router.post('/categories', protect, manager, createMenuCategory);
router.put('/categories/:id', protect, manager, updateMenuCategory);
router.delete('/categories/:id', protect, manager, deleteMenuCategory);

router.post('/items', protect, manager, createMenuItem);
router.put('/items/:id', protect, manager, updateMenuItem);
router.delete('/items/:id', protect, manager, deleteMenuItem);

export default router; 