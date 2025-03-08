const express = require('express');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    deleteAllTasks
} = require('../controllers/taskController');

const router = express.Router();

// ✅ Create a new task
router.post('/', createTask);

// ✅ Get all tasks
router.get('/', getTasks);

// ✅ Fix: Ensure '/all' is matched before '/:id' 
router.delete('/all', deleteAllTasks);  

// ✅ Get a specific task by ID
router.get('/:id', getTaskById);

// ✅ Update a specific task by ID
router.put('/:id', updateTask);

// ✅ Delete a specific task by ID
router.delete('/:id', deleteTask);

module.exports = router;
