const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    priority: {
        type: Number,
    },
    tasks: [
        {
            taskId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Task',
                required: true
            },
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
            status: {
                type: String
            },
            priority: {
                type: Number
            },
            createdAt: {
                type: Date
            },
            updatedAt: {
                type: Date
            },
            deletedAt: {
                type: Date
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('User', userSchema);