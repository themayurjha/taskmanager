// src/routes/tasks.js

const express = require('express');
const router = express.Router();

// Import the task controller
const taskController = require('../controllers/taskController');

// Define routes for tasks
router.get('/', taskController.getAllTasks);
router.get('/:taskId', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);
router.post('/metrics', taskController.getTaskMetrics);
router.get('/healthcheck', taskController.healthCheck);

module.exports = router;