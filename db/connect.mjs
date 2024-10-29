import config from '../config/default.mjs'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

export default async function () {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`)
  }
}
