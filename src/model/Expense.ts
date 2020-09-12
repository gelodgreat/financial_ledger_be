import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

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
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    autoCreate: true,
    autoIndex: true
  }
)

const Expense = mongoose.model('Expense', ExpenseSchema)

export default Expense
