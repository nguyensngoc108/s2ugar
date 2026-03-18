import Cake from '../models/Cake.js';




// Set or create signature cake (Admin only)
export const createSignatureCake = async (req, res) => {
  try {
    console.log('Creating signature cake:', req.body);
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
};

// Update signature cake (Admin only)
export const updateSignatureCake = async (req, res) => {
  try {
    console.log('Updating signature cake:', req.params.id);
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
};

// Create cake (Admin only)
export const createAdminCake = async (req, res) => {
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
export const updateAdminCake = async (req, res) => {
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
export const deleteAdminCake = async (req, res) => {
  try {
    console.log('Deleting cake:', req.params.id);
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ message: 'Cake not found' });
    res.json({ message: 'Cake deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
