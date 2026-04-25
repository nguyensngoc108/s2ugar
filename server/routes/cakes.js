import express from 'express';
import { 
  getSignatureCake, 
  getAllCakes, 
  getCakeById, 
  createCake, 
  updateCake, 
  deleteCake 
} from '../controllers/cakesController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/cakes/signature
router.get('/signature', getSignatureCake);

// GET /api/cakes
router.get('/', getAllCakes);

// GET /api/cakes/:id
router.get('/:id', getCakeById);

// POST /api/cakes (Admin only)
router.post('/', verifyAdmin, createCake);

// PUT /api/cakes/:id (Admin only)
router.put('/:id', verifyAdmin, updateCake);

// DELETE /api/cakes/:id (Admin only)
router.delete('/:id', verifyAdmin, deleteCake);

export default router;
