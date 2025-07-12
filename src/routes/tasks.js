const express = require('express');

const router = express.Router();

const taskController = require('../controllers/taskController');

// API routes for tasks
router.get('/', taskController.getTasks);       // GET /tasks

router.post('/', taskController.createTask);    // POST /tasks

router.put('/:id', taskController.updateTask);  // PUT /tasks/:id

router.delete('/:id', taskController.deleteTask); // DELETE /tasks/:id

module.exports = router;

module.exports = router;