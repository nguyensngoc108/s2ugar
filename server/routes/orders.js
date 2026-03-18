import express from 'express';
import { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrder, 
  deleteOrder 
} from '../controllers/ordersController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders (public)
router.post('/', createOrder);

// GET /api/orders (Admin only)
router.get('/', verifyAdmin, getAllOrders);

// GET /api/orders/:id (Admin only)
router.get('/:id', verifyAdmin, getOrderById);

// PUT /api/orders/:id (Admin only)
router.put('/:id', verifyAdmin, updateOrder);

// DELETE /api/orders/:id (Admin only)
router.delete('/:id', verifyAdmin, deleteOrder);

export default router;
