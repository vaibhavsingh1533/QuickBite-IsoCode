import { HttpError } from './httpError.js'
export const validate = schema => (req, _res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) return next(new HttpError(400, 'Request validation failed'))
  req.validatedBody = result.data
  next()
}
