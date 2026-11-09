import express from 'express'
import cors from 'cors'
import healthRoutes from './routes/healthRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
const app = express()
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(origin => origin.trim())
app.use(cors({ origin: (origin, callback) => !origin || allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('Origin is not allowed by CORS')) }))
app.use(express.json({ limit: '1mb' }))
app.use('/api/health', healthRoutes)
app.use(notFound)
app.use(errorHandler)
export default app
