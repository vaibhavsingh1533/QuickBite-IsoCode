import mongoose from 'mongoose'
export async function connectDatabase(uri = process.env.MONGO_URI) {
  if (!uri) { console.warn('MONGO_URI is not configured; starting without a database connection.'); return false }
  await mongoose.connect(uri)
  console.info('MongoDB connected.')
  return true
}
