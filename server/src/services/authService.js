import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { HttpError } from '../utils/httpError.js'
const HASH_ROUNDS = 12
const tokenConfig = { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRES_IN || '2h', issuer: 'quickbite-api', audience: 'quickbite-client' }
function getSecret() { if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new HttpError(503, 'Authentication is not configured'); return process.env.JWT_SECRET }
export function cookieOptions() { return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 2 * 60 * 60 * 1000 } }
export function clearCookieOptions() { const { maxAge, ...options } = cookieOptions(); return options }
export function publicUser(user) { return { id: user._id.toString(), name: user.name, email: user.email, role: user.role } }
export async function register({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  if (await User.exists({ email: normalizedEmail })) throw new HttpError(409, 'An account with this email already exists')
  const passwordHash = await bcrypt.hash(password, HASH_ROUNDS)
  try { return await User.create({ name: name.trim(), email: normalizedEmail, passwordHash, role: 'customer' }) }
  catch (error) { if (error?.code === 11000) throw new HttpError(409, 'An account with this email already exists'); throw error }
}
export async function login({ email, password }) {
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash')
  if (!user || !await bcrypt.compare(password, user.passwordHash) || !user.isActive) throw new HttpError(401, 'Email or password is incorrect')
  const token = jwt.sign({ sub: user._id.toString() }, getSecret(), tokenConfig)
  return { token, user }
}
export function createToken(user) { return jwt.sign({ sub: user._id.toString() }, getSecret(), tokenConfig) }
