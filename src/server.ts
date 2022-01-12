import express, { Request, Response } from 'express'
import { json, urlencoded } from 'body-parser'
import { expensesRouter } from './routes/expense'
import cors from 'cors'

const db = require('./models')

const app = express()
const port = process.env.PORT || 3000
const DB_NAME = 'expenses'
const corsOptions = {
    origin: 'http://localhost:4000',
}

app.use(cors(corsOptions))
app.use(json())
app.use(urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Success!' })
})

app.use('/api/expenses/', expensesRouter)

db.mongoose
    .connect(db.url, { dbName: DB_NAME })
    .then(() => {
        console.log('Connected to database!')
    })
    .catch((err: Error) => {
        console.log('Error connecting to the database!')
        process.exit
    })

app.listen(port, () => {
    console.log('Server is listening on port ', port)
})
