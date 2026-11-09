import Order from '../models/Order.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const listMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 }).lean()
  res.json({ success: true, data: { orders } })
})
export const getMyOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, customer: req.user._id }).lean()
  if (!order) return res.status(404).json({ success: false, error: { message: 'Order not found' } })
  res.json({ success: true, data: { order } })
})
