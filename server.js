const express = require("express");
require("dotenv").config();
const router = require("./routes/goRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const port = process.env.PORT || 3100;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", router);

app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
        console.log("connected to database")
    });
  })
  .catch((err) => {
    console.log(err);
  });
