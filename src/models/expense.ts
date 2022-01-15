import mongoose from 'mongoose'

interface IExpense {
    name: string
    description?: string
    when: number
    paymentType: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD'
}

interface ExpenseDocument extends mongoose.Document {
    name: string
    description?: string
    when: number
    paymentType: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD'
}

interface ExpenseModelInterface extends mongoose.Model<ExpenseDocument> {
    build(attr: IExpense): ExpenseDocument
}

const ExpenseSchema = new mongoose.Schema(
    {
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        when: {
            type: Number,
            required: true,
        },
        paymentType: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

ExpenseSchema.statics.build = (attr: IExpense) => {
    return new Expense(attr)
}

ExpenseSchema.methods.toJSON = function () {
    const expense = this
    const { __v, _id, ...object } = expense.toObject()
    object.id = _id
    return object
}

const Expense = mongoose.model<ExpenseDocument, ExpenseModelInterface>(
    'Expense',
    ExpenseSchema
)

module.exports = Expense
