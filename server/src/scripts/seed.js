import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { connectDatabase } from '../config/db.js'
import User from '../models/User.js'
import MenuItem from '../models/MenuItem.js'

if (process.env.NODE_ENV === 'production') throw new Error('Seed script is disabled in production.')
const demoUsers = [
  { name: 'Demo Customer', email: 'customer@quickbite.local', role: 'customer', password: 'QuickBiteDemo123' },
  { name: 'Demo Kitchen Staff', email: 'kitchen@quickbite.local', role: 'kitchen_staff', password: 'QuickBiteKitchen123' },
]
const menu = [
  { name: 'Charred paneer tikka', description: 'Smoky tandoor paneer, mint chutney and pickled onions.', category: 'Fan favourites', price: 360, image: 'photo-1567188040759-fb8a883dc6d8', preparationTime: 18 },
  { name: 'Wild mushroom tagliatelle', description: 'Silky ribbons, forest mushrooms, parmesan and a hint of truffle.', category: 'Mains', price: 540, image: 'photo-1473093295043-cdd812d0e601', preparationTime: 22 },
  { name: 'Hot honey margherita', description: 'Slow tomato, fior di latte, garden basil and chilli honey.', category: 'Pizza', price: 480, image: 'photo-1574071318508-1cdbab80d002', preparationTime: 20 },
  { name: 'Green goddess bowl', description: 'Avocado, crisp greens, herbed grains and lemon tahini.', category: 'Small plates', price: 390, image: 'photo-1512621776951-a57141f2eefd', preparationTime: 14 },
  { name: 'Dark chocolate fondant', description: 'Warm cocoa centre, vanilla bean cream and flaky salt.', category: 'Desserts', price: 280, image: 'photo-1606313564200-e75d5e30476c', preparationTime: 16 },
]
try {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required.')
  await connectDatabase()
  for (const entry of demoUsers) {
    if (!await User.exists({ email: entry.email })) {
      const passwordHash = await bcrypt.hash(entry.password, 12)
      await User.create({ name: entry.name, email: entry.email, role: entry.role, passwordHash })
    }
  }
  for (const item of menu) if (!await MenuItem.exists({ name: item.name })) await MenuItem.create(item)
  console.info('Development seed complete. Existing matching users and menu items were left unchanged.')
} finally { await mongoose.disconnect() }
