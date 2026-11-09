export function getHealth(_req, res) {
  res.status(200).json({ success: true, data: { status: 'ok', service: 'QuickBite API', timestamp: new Date().toISOString() } })
}
