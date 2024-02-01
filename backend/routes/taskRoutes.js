const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const { createTaskValidation, getAllUserTasksValidation, updateTaskValidation, deleteTaskValidation } = require('../validator/taskValidation');
const { createTask, getAllUserTasks, updateTask, deleteTask } = require('../controller/taskController');

router.post('/create-task', checkAuth, createTaskValidation, createTask);
router.get('/getAllUserTasks', checkAuth, getAllUserTasksValidation, getAllUserTasks);
router.patch('/updateTask/:taskId', checkAuth, updateTaskValidation, updateTask);
router.delete('/deleteTask/:taskId', checkAuth, deleteTaskValidation, deleteTask);

module.exports = router;