const express = require('express');

const router = express.Router();

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../src/controllers/taskController.js');

// GET all tasks
router.get('/', getAllTasks);

// POST new task
router.post('/', addTask);

// PUT update task
router.put('/:id', updateTask);

// DELETE task
router.delete('/:id', deleteTask);

module.exports = router;