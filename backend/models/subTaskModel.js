const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    taskId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Task',
        required: true
    },
    status: {
        type: Boolean,
        default: false   // False -> incomplete, True-> complete
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('SubTask', subTaskSchema);