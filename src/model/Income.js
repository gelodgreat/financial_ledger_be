const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    income: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}, {
    autoCreate: true,
    autoIndex: true
})

const Income = mongoose.model('Income', IncomeSchema);

module.exports = Income