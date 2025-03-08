const mongoose = require('mongoose');
const Task = require('../models/Task');
const moment = require('moment'); // ✅ Stronger date validation

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, dueDate, priority } = req.body;

        // ✅ STRONG Title validation (prevents bypass)
        if (!title || typeof title !== "string" || title.trim().length === 0) {
            return res.status(400).json({ error: "Title is required and must be a non-empty string." });
        }

        // ✅ Ensure title is case-insensitive but stored as provided
        const existingTask = await Task.findOne({ title: new RegExp(`^${title.trim()}$`, 'i') });
        if (existingTask) {
            return res.status(400).json({ error: "A task with this title already exists." });
        }

        // ✅ Strong Due Date validation using moment.js (ensures correct format)
        if (dueDate && !moment(dueDate, moment.ISO_8601, true).isValid()) {
            console.log("❌ Invalid dueDate rejected:", dueDate);  // Debugging
            return res.status(400).json({ error: "Invalid due date format. Must be in ISO 8601 format." });
        }
        

        // ✅ Hardened Priority validation
        const allowedPriorities = new Set(["Low", "Medium", "High"]);
        if (priority && !allowedPriorities.has(priority)) {
            return res.status(400).json({ error: "Invalid priority value. Must be 'Low', 'Medium', or 'High'." });
        }

        // ✅ Create task while preserving title case
        const task = await Task.create({ ...req.body, title: title.trim() });
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error.message || error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: 1 }).lean();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error.message || error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
    try {
        console.log("Fetching Task with ID:", req.params.id);

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log("🚨 Received Invalid ID:", req.params.id);

            return res.status(400).json({ error: "Invalid task ID format." });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            console.log("Task Not Found:", req.params.id);
            return res.status(404).json({ error: "Task not found." });
        }

        console.log("Task Found:", task);
        res.status(200).json(task);
    } catch (error) {
        console.error("Error in getTaskById:", error.message || error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log("🚨 Received Invalid ID:", req.params.id);

            return res.status(400).json({ error: "Invalid task ID format." });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        const { priority, dueDate } = req.body;
        const allowedPriorities = new Set(["Low", "Medium", "High"]);

        if (priority && !allowedPriorities.has(priority)) {
            return res.status(400).json({ error: "Invalid priority value. Must be 'Low', 'Medium', or 'High'." });
        }

        if (dueDate && !moment(dueDate, moment.ISO_8601, true).isValid()) {
            return res.status(400).json({ error: "Invalid due date format. Must be in ISO 8601 format." });
        }

        if (req.body.title) {
            req.body.title = req.body.title.trim();
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(500).json({ error: "Task update failed." });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error updating task:", error.message || error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log("🚨 Received Invalid ID:", req.params.id);

            return res.status(400).json({ error: "Invalid task ID format." });
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting task:", error.message || error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
    try {
        console.log("Deleting all tasks...");
        await Task.deleteMany({});
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting all tasks:", error.message || error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
