const express = require('express');
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controller/taskController');

// Routes
router.post('/', createTask);        // Create a new task
router.get('/', getTasks);           // Get all tasks
router.get('/:id', getTaskById);     // Get single task by ID
router.put('/:id', updateTask);      // Update a task by ID
router.delete('/:id', deleteTask);   // Delete a task by ID

module.exports = router;