# Task Manager Application

A simple Node.js application for managing tasks with a MySQL database. This README provides instructions on setting up the project and details about the available APIs.

## Prerequisites

- Node.js installed (v14 or later)
- MySQL database (You can install MySQL locally or use a cloud-based MySQL service)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager

2. npm install

3. node scripts/create_schema.js

4. npm start

The server will be running at http://localhost:3000.

API Endpoints
    Create a Task
        Endpoint: POST /api/tasks
        Request Body:
        title (string, required): Task title.
        description (string): Task description.
        status (enum, required): Task status ('To Do', 'In Progress', 'Done').
        due_date (date): Due date of the task (optional).
        Response: The created task.
    Update a Task
        Endpoint: PUT /api/tasks/:id
        Request Body:
        title (string): Updated task title.
        description (string): Updated task description.
        status (enum): Updated task status ('To Do', 'In Progress', 'Done').
        due_date (date): Updated due date of the task.
        Response: The updated task.
    Get All Tasks (with Pagination)
        Endpoint: GET /api/tasks
        Query Parameters:
        page (number): Page number (default: 1).
        pageSize (number): Number of tasks per page (default: 10).
        Response: List of tasks with pagination information.
    Get Task Metrics
        Endpoint: GET /api/tasks/metrics
        Response:
        Current task metrics (counts based on status).
        Historical task metrics (counts based on status and timeline).

Error Handling
The application handles errors gracefully and provides appropriate error messages and status codes in case of any issues.

Credits
This project was created by [Mayur Kumar Jha].

License
This project is licensed under the MIT License. See the LICENSE file for details.


