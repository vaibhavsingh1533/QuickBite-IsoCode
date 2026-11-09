import { HttpError } from '../utils/httpError.js'
export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new HttpError(401, 'Authentication required'))
  if (!roles.includes(req.user.role)) return next(new HttpError(403, 'You do not have permission to access this resource'))
  next()
}
