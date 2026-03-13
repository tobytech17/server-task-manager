const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controller/taskController');

// Routes
router.post('/', auth, createTask);        // Create a new task
router.get('/', auth, getTasks);           // Get all tasks
router.get('/:id', auth, getTaskById);     // Get single task by ID
router.put('/:id', auth, updateTask);      // Update a task by ID
router.delete('/:id', auth, deleteTask);   // Delete a task by ID

module.exports = router;