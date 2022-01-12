import { Request, Response } from 'express'
import { Error } from 'mongoose'

export {}

const db = require('../models')

const Expense = db.expense

exports.create = (req: Request, res: Response) => {
    const { name, description, when, paymentType } = req.body
    const expense = db.expense.build({ name, description, when, paymentType })

    expense
        .save()
        .then((data: any) => res.status(201).send(data))
        .catch((err: Error) =>
            res.status(500).send({
                message: err.message || 'Error occured while creating an Expense!',
            })
        )
}

exports.findAll = (req: Request, res: Response) => {
    const { name } = req.body
    const condition = name ? { name: { $regex: new RegExp(name), $options: 'i' } } : {}

    Expense.find(condition)
        .then((data: any) => res.status(200).send(data))
        .catch((err: Error) =>
            res.status(500).send({
                message: err.message || 'Error occured while retrieving Expenses!',
            })
        )
}

exports.findOne = (req: Request, res: Response) => {
    const { id } = req.params

    Expense.findOne(id)
        .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Expense with id ${id} does not exist!`,
                })
            } else {
                res.status(200).send(data)
            }
        })
        .catch((err: Error) =>
            res.status(500).send({
                message: err.message || `Error retrieving Expense with id  ${id}`,
            })
        )
}

exports.update = (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Expense data to update cannot be empty!',
        })
    }

    const { id } = req.params
    const { name, description, when, paymentType } = req.body

    const expense = Expense.build({ name, description, when, paymentType })

    Expense.findByIdAndUpdate(id, expense, { useFindAndUpdate: false })
        .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Expense with id ${id}. It may not exist!`,
                })
            } else {
                res.status(200).send({
                    message: `Expense with id ${id} was updated successfully!`,
                })
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message: `Error updating Expense with id ${id}`,
            })
        })
}

exports.delete = (req: Request, res: Response) => {
    const { id } = req.params

    Expense.findByIdAndRemove(id)
        .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Expense with id ${id}. It may not exist!`,
                })
            } else {
                res.send({
                    message: 'Expense was deleted successfully!',
                })
            }
        })
        .catch((err: Error) => {
            res.status(500).send({
                message: `Error deleting Expense with id ${id}`,
            })
        })
}
