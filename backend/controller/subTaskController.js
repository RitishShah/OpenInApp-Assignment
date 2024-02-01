const User = require('../models/userModel');
const Task = require("../models/taskModel");
const SubTask = require("../models/subTaskModel");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const utils = require('../utils/response');
const jwtTokenCookie = require('../utils/jwtTokenCookie');

exports.createSubTask = async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    console.log("s", task);
    const userId1 = req.user.id;
    const userId2 = task.user.toString().replace(/ObjectId\("(.*)"\)/, "$1"); // That method will remove new ObjectId text from Actual Id.

    console.log(userId1, userId2);

    if(userId1 !== userId2) {
        return utils.response(res,'fail','Provided Task Id is not valid to authorised user',null,400);
    }

    req.body.taskId = taskId;
    const subTask = await SubTask.create(req.body);
    task.subTasks.push(subTask);
    await task.save({ validateBeforeSave: false });
    utils.response(res,'success','SubTask Created',subTask,201);
};

exports.getAllUserSubTasks = async (req, res) => {
    const user = req.user;
    console.log(req.query);
    const taskId = req.query.taskId;

    const prevUserTask = await Task.findById(taskId);

    const userId1 = req.user.id;
    const userId2 = prevUserTask.user.toString().replace(/ObjectId\("(.*)"\)/, "$1"); // That method will remove new ObjectId text from Actual Id.

    console.log(userId1, userId2);

    if(userId1 !== userId2) {
        return utils.response(res,'fail','Provided Task Id is not valid to authorised user',null,400);
    }
    
    const userTask = await Task.findById(taskId);
    const allUserSubTasks = userTask.subTasks;

    utils.response(res,'success','All User Sub-Tasks Fetched Successfully',allUserSubTasks,200);
};

exports.updateSubTask = async (req, res) => {
    const subTaskId = req.params.subTaskId;
    const status = req.body.status;

    const subTask = await SubTask.findById(subTaskId);

    if(!subTask) {
        return utils.response(res,'fail','SubTask is not present in db.',null,404);
    }

    subTask.status = status;
    subTask.updatedAt = Date.now();

    const taskId = subTask.taskId;
    const task = await Task.findById(taskId);
    const subTasks = task.subTasks;

    subTasks.forEach(subTask => {
        if(subTask.id === subTaskId) {
            subTask.status = status;
            subTask.updatedAt = Date.now();
        }
    });

    await task.save({ validateBeforeSave : false });
    await subTask.save({ validateBeforeSave : false });

    utils.response(res,'success','All User Sub-Tasks Fetched Successfully',subTask,200);
};

exports.deleteSubTask = async (req, res) => {
    const subTaskId = req.params.subTaskId;
    const subTask = await SubTask.findById(subTaskId);
    
    if(!subTask) {
        return utils.response(res,'fail','SubTask is not present in db.',null,404);
    }

    subTask.deletedAt = Date.now();

    const taskId = subTask.taskId;
    const task = await Task.findById(taskId);
    const subTasks = task.subTasks;

    subTasks.forEach(subTask => {
        if(subTask.id === subTaskId) {
            subTask.deletedAt = Date.now();
        }
    });

    await subTask.save({ validateBeforeSave : false });
    await task.save({ validateBeforeSave : false });

    utils.response(res,'success','Sub Task is successfully deleted.',subTask,200);
}