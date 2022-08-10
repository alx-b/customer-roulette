import mongoose from 'mongoose'

const { Schema } = mongoose

const customerSchema = Schema({
  name: {
    type: String,
    allowNull: false,
    required: true,
    minlength: [2, 'Name must be at least 2 characters.'],
    maxlength: [30, 'Name must be max 30 characters.']
  },
  lastname: {
    type: String,
    allowNull: false,
    required: true,
    minlength: [2, 'Last Name must be at least 2 characters.'],
    maxlength: [30, 'Last Name must be max 30 characters.']
  },
  email: {
    type: String,
    allowNull: true,
    required: false,
    minlength: [5, 'Email must be at least 5 characters.'],
    maxlength: [50, 'Email must be max 50 characters.']
  }
})

const CustomerModel = mongoose.model('customer', customerSchema)
export default CustomerModel
