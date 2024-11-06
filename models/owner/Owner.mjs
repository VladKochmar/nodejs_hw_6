import mongoose from 'mongoose'
const { Schema } = mongoose

const ownerSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    minlength: [5, 'Full name must be at least 3 characters long'],
    maxlength: [50, 'Full name must be at most 50 characters long'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [5, 'Address must be at least 3 characters long'],
    maxlength: [50, 'Address must be at most 50 characters long'],
    trim: true,
  },
})

const Owner = mongoose.model('Owner', ownerSchema)
export default Owner
