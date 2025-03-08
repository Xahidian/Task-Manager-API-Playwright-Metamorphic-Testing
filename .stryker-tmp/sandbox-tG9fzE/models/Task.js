// @ts-nocheck
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true },
    completed: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
