import express from 'express';
import Cake from '../models/Cake.js';

const router = express.Router();

// Set or create signature cake
router.post('/signature', async (req, res) => {
  try {
    // Remove signature flag from all cakes
    await Cake.updateMany({}, { isSignature: false });

    // Create new signature cake
    const cake = new Cake({
      ...req.body,
      isSignature: true,
    });
    const savedCake = await cake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update signature cake
router.put('/signature/:id', async (req, res) => {
  try {
    // Remove signature flag from all other cakes
    await Cake.updateMany({ _id: { $ne: req.params.id } }, { isSignature: false });

    const cake = await Cake.findByIdAndUpdate(
      req.params.id,
      { ...req.body, isSignature: true },
      { new: true }
    );
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new cake (kept for future expansion)
router.post('/cakes', async (req, res) => {
  try {
    const cake = new Cake(req.body);
    const savedCake = await cake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cake
router.put('/cakes/:id', async (req, res) => {
  try {
    const cake = await Cake.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete cake
router.delete('/cakes/:id', async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json({ message: 'Cake deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
