import mongoose from 'mongoose'
import config from '../../config/default.mjs'

const { Schema } = mongoose

const carSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    minlength: [3, 'Brand must be at least 3 characters long'],
    maxlength: [50, 'Brand must be at most 50 characters long'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1990, 'The year should be no later than 1990'],
    max: [2024, 'The year should be no more than 2024'],
    toInt: true,
  },
  number: {
    type: String,
    required: [true, 'License plate is required'],
    match: [/^[А-ЯA-Z]{2} \d{4} [А-ЯA-Z]{2}$/, 'Must be in format [А-ЯA-Z]{2} \\d{4} [А-ЯA-Z]{2}'],
    unique: true,
    trim: true,
  },
  imgSrc: {
    type: String,
    required: [true, 'Car image is required'],
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
  },
})

carSchema.statics.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases()
  return databases.databases.some(db => db.name === config.dbName)
}

carSchema.statics.checkCollectionExists = async () => {
  if (await carSchema.statics.checkDatabaseExists()) {
    const collections = await mongoose.connection.db.listCollections({ name: 'cars' }).toArray()
    return collections.length > 0
  }
  return false
}

const Car = mongoose.model('Car', carSchema)
export default Car
