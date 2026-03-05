import mongoose from 'mongoose';

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Chocolate', 'Vanilla', 'Fruit', 'Special'],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  ingredients: [String],
  servings: Number,
  isSignature: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Cake', cakeSchema);
