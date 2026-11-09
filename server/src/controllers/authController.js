import { login, register, publicUser, cookieOptions, clearCookieOptions } from '../services/authService.js'
import { asyncHandler } from '../utils/asyncHandler.js'
export const registerController = asyncHandler(async (req, res) => {
  const user = await register(req.validatedBody)
  const result = await login({ email: user.email, password: req.validatedBody.password })
  res.cookie('qb_auth', result.token, cookieOptions()).status(201).json({ success: true, data: { user: publicUser(user) } })
})
export const loginController = asyncHandler(async (req, res) => {
  const { token, user } = await login(req.validatedBody)
  res.cookie('qb_auth', token, cookieOptions()).json({ success: true, data: { user: publicUser(user) } })
})
export function logoutController(_req, res) { res.clearCookie('qb_auth', clearCookieOptions()).json({ success: true, data: { message: 'Signed out' } }) }
export function meController(req, res) { res.json({ success: true, data: { user: publicUser(req.user) } }) }
