import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/authRoutes.js'
import menuRouter from './routes/menuRoutes.js'
import { orderRouter } from './routes/orderRoutes.js'
import { kitchenRouter } from './routes/kitchenRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(value => value.trim()).filter(Boolean)
app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin)) return callback(null, true); return callback(new Error('Origin is not allowed by CORS')) }, credentials: true, methods: ['GET', 'POST', 'PATCH', 'OPTIONS'], allowedHeaders: ['Content-Type'] }))
app.use(express.json({ limit: '20kb' }))
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/menu', menuRouter)
app.use('/api/orders', orderRouter)
app.use('/api/kitchen', kitchenRouter)
app.get('/api/health', (_req, res) => res.json({ success: true, data: { status: 'ok', service: 'QuickBite API', timestamp: new Date().toISOString() } }))
app.use(notFound)
app.use(errorHandler)
export default app
