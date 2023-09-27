// src/controllers/taskController.js

// Import the task model
const Task = require('../models/data'); // Assuming you have a Task model

// Controller functions for handling task routes
exports.getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;       // Get the requested page
    const pageSize = parseInt(req.query.pageSize) || 10; // Get the page size

    // Calculate the number of items to skip based on page and page size
    const offset = (page - 1) * pageSize;

    // Query the database to retrieve tasks with pagination
    const tasks = await Task.getAll(pageSize, offset)

    res.json(tasks[0]);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.getById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const savedTask = await Task.create(req.body);
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedTask = await Task.updateById(taskId, req.body);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask[0]);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.deleteById(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTaskMetrics = async (req, res) => {
  try {
      const metrics = await Task.calculateTaskMetrics();
      res.json(metrics)
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.healthCheck = async (req, res) => {
    try {
        res.status(200).json({"message": "success"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  
