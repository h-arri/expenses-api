import express from "express";
import { json, urlencoded } from "body-parser";
import { expensesRouter } from "./routes/expense";

const db = require("./models");

const app = express();
const port = process.env.PORT || 3000;
const DB_NAME = "expenses";

app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/api/expenses/", expensesRouter);

db.mongoose
  .connect(db.url, { dbName: DB_NAME })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err: Error) => {
    console.log("Error connecting to the database!");
    process.exit;
  });

app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
