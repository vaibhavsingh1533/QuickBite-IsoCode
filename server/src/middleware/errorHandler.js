export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`)
  res.status(404)
  next(error)
}
export function errorHandler(error, req, res, _next) {
  const status = error.statusCode || res.statusCode !== 200 && res.statusCode || 500
  res.status(status).json({ success: false, error: { message: error.message || 'Internal server error' } })
}
