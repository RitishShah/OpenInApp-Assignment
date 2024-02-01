const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const { createSubTaskValidation, getAllUserSubTasksValidation, updateSubTaskValidation, deleteSubTaskValidation } = require('../validator/subTaskValidation');
const { createSubTask, getAllUserSubTasks, updateSubTask, deleteSubTask } = require('../controller/subTaskController');

router.post('/create-subTask/:taskId', checkAuth, createSubTaskValidation, createSubTask);
router.get('/getAllUserSubTasks', checkAuth, getAllUserSubTasksValidation, getAllUserSubTasks);
router.patch('/updateSubTask/:subTaskId', checkAuth, updateSubTaskValidation, updateSubTask);
router.delete('/deleteSubTask/:subTaskId', checkAuth, deleteSubTaskValidation, deleteSubTask);

module.exports = router;