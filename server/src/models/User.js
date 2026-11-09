import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['customer', 'kitchen_staff'], default: 'customer', immutable: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false })
export default mongoose.models.User || mongoose.model('User', userSchema)
