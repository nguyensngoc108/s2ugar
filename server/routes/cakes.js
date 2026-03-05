import express from 'express';
import Cake from '../models/Cake.js';

const router = express.Router();

// Get signature cake
router.get('/signature', async (req, res) => {
  try {
    const signatureCake = await Cake.findOne({ isSignature: true });
    if (!signatureCake) {
      return res.status(404).json({ message: 'No signature cake set' });
    }
    res.json(signatureCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all cakes
router.get('/', async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single cake
router.get('/:id', async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
