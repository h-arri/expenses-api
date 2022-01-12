const Expense = require('../models/expense')

const dbConfig = require('../config/db.config')

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    expense: Expense,
}

module.exports = db
