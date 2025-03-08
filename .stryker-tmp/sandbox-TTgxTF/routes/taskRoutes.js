// @ts-nocheck
const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask,deleteAllTasks } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById); // ✅ Added missing GET task by ID route
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/tasks/all', deleteAllTasks);


module.exports = router;
