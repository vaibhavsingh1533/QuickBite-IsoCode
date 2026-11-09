import MenuItem from '../models/MenuItem.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const listMenu = asyncHandler(async (req, res) => {
  const filter = { isAvailable: true }
  if (typeof req.query.category === 'string' && req.query.category.length <= 60) filter.category = req.query.category
  if (typeof req.query.search === 'string' && req.query.search.trim().length <= 80) filter.name = { $regex: req.query.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' }
  const items = await MenuItem.find(filter).select('name description category price image isAvailable preparationTime').sort({ category: 1, name: 1 }).lean()
  res.json({ success: true, data: { items } })
})
