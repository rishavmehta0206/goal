const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/userRoutes");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Please already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  // create user
  const response = await User.create({ ...req.body, password: hashPassword });
  if (response) {
    res.status(201).json({
      _id: response.id,
      name: response.name,
      email: response.email,
      token: generateToken(response._id),
    });
  } else {
    res.status(400);
    throw new Error("something went wrong");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user.email === email);
  console.log(await bcrypt.compare(password, user.password));
  if (user.email === email && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid login data");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const response = await User.findById({ _id: id });
  res.json({
    id: response._id,
    name: response.name,
    email: response.email,
  });
});

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };
