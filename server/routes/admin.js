import express from 'express';
import { 
  createSignatureCake, 
  updateSignatureCake, 
  createAdminCake, 
  updateAdminCake, 
  deleteAdminCake 
} from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/admin/signature (Admin only)
router.post('/signature', verifyAdmin, createSignatureCake);

// PUT /api/admin/signature/:id (Admin only)
router.put('/signature/:id', verifyAdmin, updateSignatureCake);

// POST /api/admin/cakes (Admin only)
router.post('/cakes', verifyAdmin, createAdminCake);

// PUT /api/admin/cakes/:id (Admin only)
router.put('/cakes/:id', verifyAdmin, updateAdminCake);

// DELETE /api/admin/cakes/:id (Admin only)
router.delete('/cakes/:id', verifyAdmin, deleteAdminCake);

export default router;
