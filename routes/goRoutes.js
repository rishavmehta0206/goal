const express = require("express");
const {
  getData,
  getOneData,
  editData,
  deleteData,
  addData,
} = require("../controller/goController");

const routes = express.Router();

routes.get("/", getData);
routes.post("/", addData);
routes.put("/:id", editData);
routes.delete("/:id", deleteData);
routes.get("/:id", getOneData);

module.exports = routes;
