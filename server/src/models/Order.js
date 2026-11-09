import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true, trim: true, index: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  items: [{ menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }, name: { type: String, required: true, trim: true }, price: { type: Number, required: true, min: 0 }, quantity: { type: Number, required: true, min: 1, max: 99 } }],
  subtotal: { type: Number, required: true, min: 0 }, total: { type: Number, required: true, min: 0 },
  deliveryDetails: { name: { type: String, trim: true, maxlength: 80 }, phone: { type: String, trim: true, maxlength: 20 }, address: { type: String, trim: true, maxlength: 500 }, notes: { type: String, trim: true, maxlength: 500 } },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'], default: 'pending', index: true },
  paymentMethod: { type: String, enum: ['cash', 'online'], default: 'cash' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
}, { timestamps: true, versionKey: false })
orderSchema.index({ customer: 1, createdAt: -1 })
export default mongoose.models.Order || mongoose.model('Order', orderSchema)
