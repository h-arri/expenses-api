import express from 'express'
import mongoose from 'mongoose'
import { json, urlencoded } from 'body-parser'
import { expensesRouter } from './routes/expense'

const app = express()
const port = process.env.PORT || 3000
const URI = 'mongodb://127.0.0.1:27017'
const DB_NAME = 'expenses'

app.use(json())
app.use(urlencoded({extended:false}))
app.use(expensesRouter)

mongoose.connect(URI, { dbName: DB_NAME }, () => {
    console.log('Connected to database')
})

app.listen(port, () => {
    console.log('server is listening on port ', port)
})
