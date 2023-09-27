const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// API Routes
const tasksRoutes = require('./routes/tasks'); // Import your task routes
app.use('/api/tasks', tasksRoutes); // Use the task routes

// Handle unhandled routes and errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
