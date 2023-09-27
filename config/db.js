const mysql = require('mysql2/promise');

const dbConfig = {
  host: "YOUR_HOST_URL",      
  user: "YOUR_MYSQL_USERNAME",   
  password: "YOUR_MYSQL_PASSWORD", 
  database: "task_manager",
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;