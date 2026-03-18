import jwt from 'jsonwebtoken';
import bcyptjs from 'bcryptjs';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

// Admin login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login request received:', { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcyptjs.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );

    console.log('Login successful for:', email);
    res.json({ 
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin registration
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Registration request received:', { email });

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Password will be hashed by Admin model's pre-save hook
    const admin = new Admin({ email, password });
    const savedAdmin = await admin.save();

    console.log('Admin registered successfully:', email);

    res.status(201).json({
      message: 'Admin registered successfully',
      admin: {
        id: savedAdmin._id,
        email: savedAdmin.email
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};


export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('User registration request received:', { email });

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    // Password will be hashed by User model's pre-save hook
    const user = new User({ email, password });
    const savedUser = await user.save();
    console.log('User registered successfully:', email);
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: savedUser._id,
            email: savedUser.email
        },
    });
  }
    catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

