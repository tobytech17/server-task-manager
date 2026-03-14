const Task = require('../models/taskModel');

// Create Task
const createTask = async (req, res) => {
  console.log("userId:", req.userId);  // ← add here
  console.log("body:", req.body);      // ← add here
  try {
    const { title, description, tag } = req.body;
    const task = await Task.create({ title, description, tag, user: req.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Task
const getTaskById = async (req, res) => {
  try {
   const task = await Task.findOne({
  _id: req.params.id,
  user: req.userId
});
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate({
      _id: req.params.id,
      user: req.userId
    }, req.body, 
    {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};