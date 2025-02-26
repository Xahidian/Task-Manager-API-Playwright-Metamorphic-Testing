const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById); // ✅ Added missing GET task by ID route
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
