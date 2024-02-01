const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: "TODO"
    },
    priority: {
        type: Number,
    },
    subTasks: [
        {
            subTaskId: {
                type: mongoose.Schema.ObjectId,
                ref: 'SubTask',
                required: true
            },
            title: {
                type: String
            },
            description: {
                type: String
            },
            status: {
                type: Boolean
            },
            createdAt: {
                type: Date,
            },
            updatedAt: {
                type: Date,
            },
            deletedAt: {
                type: Date,
            }
        }
    ],
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
    }
});

module.exports = mongoose.model('Task', taskSchema);