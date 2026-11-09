import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { registerController, loginController, logoutController, meController } from '../controllers/authController.js'
import { authenticate } from '../middleware/authenticate.js'
import { validate } from '../utils/validation.js'
import { registerSchema, loginSchema } from '../validation/authSchemas.js'
const authRouter = Router()
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false, message: { success: false, error: { message: 'Too many authentication attempts. Please try again later.' } } })
authRouter.post('/register', authLimiter, validate(registerSchema), registerController)
authRouter.post('/login', authLimiter, validate(loginSchema), loginController)
authRouter.post('/logout', logoutController)
authRouter.get('/me', authenticate, meController)
export { authRouter }
