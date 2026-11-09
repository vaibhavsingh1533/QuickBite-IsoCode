import mongoose from 'mongoose'
import { before, after, beforeEach } from 'node:test'
import User from '../models/User.js'
import MenuItem from '../models/MenuItem.js'
import Order from '../models/Order.js'

export const testDbUri = process.env.MONGO_TEST_URI
const parsedTestUri = testDbUri ? new URL(testDbUri) : null
const testDatabaseName = parsedTestUri?.pathname.replace(/^\//, '') || ''
const localTestHost = parsedTestUri && ['localhost', '127.0.0.1', '[::1]', '::1'].includes(parsedTestUri.hostname)
export const integrationEnabled = Boolean(testDbUri && localTestHost && /test/i.test(testDatabaseName))
if (testDbUri && !integrationEnabled) throw new Error('MONGO_TEST_URI must use a loopback host and a database name containing "test". Refusing unsafe test database.')
export function useTestDatabase() {
  before(async () => { if (!integrationEnabled) return; await mongoose.connect(testDbUri); await Promise.all([User.init(), MenuItem.init(), Order.init()]) })
  beforeEach(async () => { if (integrationEnabled) await Promise.all([User.deleteMany({}), MenuItem.deleteMany({}), Order.deleteMany({})]) })
  after(async () => { if (integrationEnabled) await mongoose.disconnect() })
}
export async function makeUser({ name='Test User', email='person@example.test', role='customer', isActive=true, passwordHash }={}) {
  return User.create({ name, email, role, isActive, passwordHash: passwordHash || '$2a$12$w2zqQe5flC3vcn4uG2x2pO8CgGBx0Kxx9P2ulDxUVDPZlZdC1Dc/K' })
}
