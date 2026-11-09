import { z } from 'zod'
const email = z.string().trim().email().max(254).transform(value => value.toLowerCase())
export const registerSchema = z.object({ name: z.string().trim().min(2).max(80), email, password: z.string().min(10).max(72).regex(/[a-z]/, 'Password must contain a lowercase letter').regex(/[A-Z]/, 'Password must contain an uppercase letter').regex(/[0-9]/, 'Password must contain a number').refine(value => Buffer.byteLength(value, 'utf8') <= 72, 'Password must be 72 bytes or fewer') }).strict()
export const loginSchema = z.object({ email, password: z.string().min(1).max(72).refine(value => Buffer.byteLength(value, 'utf8') <= 72, 'Password must be 72 bytes or fewer') }).strict()
