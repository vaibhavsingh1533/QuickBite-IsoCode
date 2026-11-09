export function notFound(req, res, next) {
  const error = new Error('Route not found')
  error.status = 404
  next(error)
}
export function errorHandler(error, req, res, _next) {
  const status = error.status || error.statusCode || 500
  if (status >= 500) console.error('Request failed:', error.name || 'Error')
  const message = status >= 500 ? 'Internal server error' : error.name === 'SyntaxError' ? 'Invalid JSON body' : error.message || 'Request failed'
  res.status(status).json({ success: false, error: { message } })
}
