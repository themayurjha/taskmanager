// createschemaandtables.js

const db = require('../config/db'); // Import your database connection

const createSchemaAndTables = async () => {
  try {
    // Create a database schema if it doesn't exist
    await db.query('CREATE DATABASE IF NOT EXISTS task_manager');
    
    // Use the created schema
    await db.query('USE task_manager');
    
    // Create a "tasks" table (you can define your table schema)
    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('To Do', 'In Progress', 'Done') NOT NULL,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Schema and tables created successfully');
    db.end()
    await new Promise(r => setTimeout(r, 60000));

  } catch (error) {
    console.log(error)
    console.error('Error creating schema and tables:', error);
    await new Promise(r => setTimeout(r, 60000));
  }
};

createSchemaAndTables();
