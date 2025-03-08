// @ts-nocheck
const mongoose = require('mongoose');
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, dueDate } = req.body;

        // Validate title
        if (!title || typeof title !== "string") {
            return res.status(400).json({ error: "Title is required and must be a string" });
        }

        // Validate dueDate format
        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: "Invalid due date format" });
        }

        // Check if task with the same title exists
        const existingTask = await Task.findOne({ title });
        if (existingTask) {
            return res.status(400).json({ error: "A task with this title already exists" });
        }

        // Create new task
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: 1 }).lean();  // Ensure consistent order
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
        console.log("Fetching Task with ID:", req.params.id);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid task ID format" });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            console.log("Task Not Found:", req.params.id);
            return res.status(404).json({ error: "Task not found" });
        }

        console.log("Task Found:", task);
        res.status(200).json(task);
    } catch (error) {
        console.error("Error in getTaskById:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid task ID format" });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(500).json({ error: "Task update failed" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid task ID format" });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.deleteAllTasks = async (req, res) => {
    try {
        await Task.deleteMany({});  // Clears all tasks
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting all tasks:", error);
        res.status(500).json({ error: error.message });
    }
};

