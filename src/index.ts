import express from 'express'
import mongoose from 'mongoose'
import { json } from 'body-parser'
import { expensesRouter } from './routes/expense'

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(expensesRouter)

mongoose.connect('mongodb://localhost:27017/expenses', () => {
    console.log('Connected to database')
})

app.listen(port, () => {
    console.log('server is listening on port ', port)
})
