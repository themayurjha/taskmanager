const db = require('../../config/db'); // Import your database connection

class Task {
  // Create a new task
  static create(newTask) {
    return db.query('INSERT INTO tasks SET ?', newTask);
  }

  // Get all tasks
  static getAll(pageSize, offset) {
    return db.query('SELECT * FROM tasks LIMIT ? OFFSET ?', [pageSize, offset]);
  }

  // Get a task by ID
  static getById(taskId) {
    return db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
  }

  // Update a task by ID
  static updateById(taskId, updatedTask) {
    return db.query('UPDATE tasks SET ? WHERE id = ?', [updatedTask, taskId]);
  }

  // Delete a task by ID
  static deleteById(taskId) {
    return db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
  }

  static async calculateTaskMetrics () {
    // Calculate current counts based on status
    const statusQuery = 'SELECT ' +
      'SUM(CASE WHEN status = "To Do" THEN 1 ELSE 0 END) AS open_tasks, ' +
      'SUM(CASE WHEN status = "In Progress" THEN 1 ELSE 0 END) AS inprogress_tasks, ' +
      'SUM(CASE WHEN status = "Done" THEN 1 ELSE 0 END) AS completed_tasks ' +
      'FROM tasks';
  
    const statusResult = await db.query(statusQuery);
  
    // Calculate historical metrics (e.g., by month)
    const historicalQuery = 'SELECT ' +
      'DATE_FORMAT(created_at, "%M %Y") AS date, ' +
      'SUM(CASE WHEN status = "To Do" THEN 1 ELSE 0 END) AS open_tasks, ' +
      'SUM(CASE WHEN status = "In Progress" THEN 1 ELSE 0 END) AS inprogress_tasks, ' +
      'SUM(CASE WHEN status = "Done" THEN 1 ELSE 0 END) AS completed_tasks ' +
      'FROM tasks ' +
      'GROUP BY date';
  
    const historicalResults = await db.query(historicalQuery);
  
    return {
      currentMetrics: statusResult[0],
      historicalMetrics: historicalResults[0],
    };
  }
}


module.exports = Task;
