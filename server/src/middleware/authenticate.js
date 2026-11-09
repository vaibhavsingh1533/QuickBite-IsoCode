import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { HttpError } from '../utils/httpError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const authenticate = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.qb_auth
  if (!token) throw new HttpError(401, 'Authentication required')
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new HttpError(503, 'Authentication is not configured')
  let payload
  try { payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'], issuer: 'quickbite-api', audience: 'quickbite-client' }) }
  catch { throw new HttpError(401, 'Invalid or expired session') }
  const user = await User.findById(payload.sub).select('_id name email role isActive')
  if (!user || !user.isActive) throw new HttpError(401, 'Invalid or inactive account')
  req.user = user
  next()
})
