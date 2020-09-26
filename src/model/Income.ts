import mongoose, { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId
const IncomeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    income: {
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
    uid: {
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

const Income = mongoose.model('Income', IncomeSchema)

export default Income
