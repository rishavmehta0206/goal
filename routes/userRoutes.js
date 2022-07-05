const express = require("express");
const {
  registerUser,
  getMe,
  loginUser,
} = require("../controller/userController");
const routes = express.Router();

const protect = require('../middleware/authMiddleware')

routes.post("/", registerUser);
routes.post("/login", loginUser);
routes.get("/me",protect, getMe);

module.exports = routes;