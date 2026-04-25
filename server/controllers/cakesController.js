import Cake from '../models/Cake.js';

// Get signature cake
export const getSignatureCake = async (req, res) => {
  try {
    const signatureCake = await Cake.findOne({ isSignature: true });
    if (!signatureCake) {
      return res.status(404).json({ message: 'No signature cake set' });
    }
    res.json(signatureCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cakes
export const getAllCakes = async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single cake
export const getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create cake (Admin only)
export const createCake = async (req, res) => {
  try {
    console.log('Creating cake:', req.body);
    const cake = new Cake(req.body);
    const savedCake = await cake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update cake (Admin only)
export const updateCake = async (req, res) => {
  try {
    console.log('Updating cake:', req.params.id);
    const cake = await Cake.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json(cake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete cake (Admin only)
export const deleteCake = async (req, res) => {
  try {
    console.log('Deleting cake:', req.params.id);
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json({ message: 'Cake deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
