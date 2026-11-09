import { z } from 'zod'
import Order from '../models/Order.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { HttpError } from '../utils/httpError.js'
export const listKitchenOrders = asyncHandler(async (req, res) => {
  const allowed = ['pending', 'preparing', 'ready', 'completed', 'cancelled']
  const filter = {}
  if (req.query.status !== undefined) {
    if (!allowed.includes(req.query.status)) throw new HttpError(400, 'Invalid order status filter')
    filter.status = req.query.status
  }
  const orders = await Order.find(filter).sort({ createdAt: 1 }).lean()
  res.json({ success: true, data: { orders } })
})
const statusSchema = z.object({ status: z.enum(['preparing', 'ready', 'completed', 'cancelled']) }).strict()
const nextStatuses = { pending: ['preparing', 'cancelled'], preparing: ['ready', 'cancelled'], ready: ['completed', 'cancelled'], completed: [], cancelled: [] }
export const updateKitchenOrder = asyncHandler(async (req, res) => {
  const parsed = statusSchema.safeParse(req.body)
  if (!parsed.success) throw new HttpError(400, 'Request validation failed')
  const order = await Order.findById(req.params.id)
  if (!order) throw new HttpError(404, 'Order not found')
  if (!nextStatuses[order.status]?.includes(parsed.data.status)) throw new HttpError(409, 'Invalid order status transition')
  order.status = parsed.data.status
  await order.save()
  res.json({ success: true, data: { order } })
})
