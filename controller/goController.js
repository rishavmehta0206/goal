const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const getData = asyncHandler(async (req, res) => {
  const goals = await Goal.find({});
  res.status(200).json(goals);
});

const addData = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please include body for POST operations");
  }
  const goal = await Goal.create({ ...req.body });
  res.json(goal);
});

const editData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json("id not available");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(
    { _id: id },
    { ...req.body }
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
