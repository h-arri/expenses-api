import mongoose from "mongoose";

interface IExpense {
  name: string;
  description?: string;
  when: number;
  paymentType: "CASH" | "CREDIT_CARD" | "DEBIT_CARD";
}

interface ExpenseDocument extends mongoose.Document {
  name: string;
  description?: string;
  when: number;
  paymentType: "CASH" | "CREDIT_CARD" | "DEBIT_CARD";
}

interface ExpenseModelInterface extends mongoose.Model<ExpenseDocument> {
  build(attr: IExpense): ExpenseDocument;
}

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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
);

expenseSchema.statics.build = (attr: IExpense) => {
  return new Expense(attr);
};

const Expense = mongoose.model<ExpenseDocument, ExpenseModelInterface>(
  "Expense",
  expenseSchema
);

module.exports = Expense;
