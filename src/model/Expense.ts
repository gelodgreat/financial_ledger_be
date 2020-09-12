import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    expense: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    autoCreate: true,
    autoIndex: true
  }
)

const Expense = mongoose.model('Expense', ExpenseSchema)

export default Expense
