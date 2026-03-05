import express from 'express';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    // To be implemented
    res.json({ message: 'Login endpoint' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
