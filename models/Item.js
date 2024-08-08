import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  warrantyPeriod: { type: String, required: true }
});

export default mongoose.model('Item', itemSchema);
