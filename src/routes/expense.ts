import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/api/expenses', (req: Request, res: Response) => {
    return res.send('Expenses!')
})

router.post('/api/expenses/create', (req: Request, res: Response) => {
    return res.send('Created!')
})

export { router as expensesRouter }
