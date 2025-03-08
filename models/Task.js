const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },  // Enforce uniqueness
    description: { type: String },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    dueDate: { type: Date },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    completed: { type: Boolean, default: false }
});


module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
