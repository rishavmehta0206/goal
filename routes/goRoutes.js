const express = require("express");
const {
  getData,
  getOneData,
  editData,
  deleteData,
  addData,
} = require("../controller/goController");

const routes = express.Router();

const protect = require('../middleware/authMiddleware')


routes.get("/",protect, getData);
routes.post("/",protect, addData);
routes.put("/:id",protect, editData);
routes.delete("/:id",protect, deleteData);
routes.get("/:id",protect, getOneData);

module.exports = routes;
