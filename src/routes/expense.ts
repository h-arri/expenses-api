import express, { Request, Response } from 'express'
import { Expense } from '../models/expense'

const router = express.Router()

router.get('/api/expenses', async (req: Request, res: Response) => {
    const expenses = await Expense.find({})

    return res.status(200).send(expenses)
})

router.post('/api/expenses/create', async (req: Request, res: Response) => {
    console.log('req ', req.body)
    const { name, description, when, paymentType } = req.body

    const expense = Expense.build({ name, description, when, paymentType })
    await expense.save()

    return res.status(201).send(expense)
})

export { router as expensesRouter }
