import express, { Request, Response } from "express";

const Expense = require("../models/expense");

const ExpenseController = require("../controllers/expense");

const router = express.Router();

router.post("/create", ExpenseController.create);

router.get("/", ExpenseController.findAll);

router.get("/:id", ExpenseController.findOne);

router.put("/:id", ExpenseController.update);

router.delete("/:id", ExpenseController.delete);

export { router as expensesRouter };
