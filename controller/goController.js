const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");

const getData = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const addData = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please include body for POST operations");
  }
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  res.json(goal);
});

const editData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById({ _id: id });
  if (!goal) {
    return res.json("goal not found");
  }
  const user = await User.find(req.user.id);
  if (!user) {
    req.status(401);
    throw new Error("User not found");
  }
  // make sure the logged inuser matched the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    {
      new: true,
    }
  );
  res.json(updatedGoal);
});

const deleteData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json("id not available");
  }
  const goal = await Goal.findOneAndDelete({ _id: id });
  res.json({ message: "deleted one request" });
});

const getOneData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json("id not available");
  }
  const goal = await Goal.findById({ _id: id });
  res.json(goal);
});

module.exports = {
  getData,
  addData,
  editData,
  deleteData,
  getOneData,
};
