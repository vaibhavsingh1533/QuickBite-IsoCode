import mongoose from 'mongoose'
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 600 },
  category: { type: String, required: true, trim: true, maxlength: 60, index: true },
  price: { type: Number, required: true, min: 1, max: 100000 },
  image: { type: String, trim: true, maxlength: 1000, default: '' },
  isAvailable: { type: Boolean, default: true, index: true },
  preparationTime: { type: Number, required: true, min: 1, max: 240 },
}, { timestamps: true, versionKey: false })
menuItemSchema.index({ isAvailable: 1, category: 1 })
export default mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema)
