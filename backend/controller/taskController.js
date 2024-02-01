const User = require('../models/userModel');
const Task = require("../models/taskModel");
const SubTask = require("../models/subTaskModel");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const utils = require('../utils/response');
const jwtTokenCookie = require('../utils/jwtTokenCookie');

exports.createTask = async (req, res) => {
    req.body.user = req.user.id;
    const task = await Task.create(req.body);
    const user = req.user;
    user.tasks.push(task);
    await user.save({ validateBeforeSave: false });
    utils.response(res,'success','Task Created',task,201);
};

exports.getAllUserTasks = async (req, res) => {
    const user = req.user;
    console.log(user);
    let allTasks = user.tasks;
    const query = req.query;
    console.log(query);

    if(Object.keys(query).length > 0) {
        let filteredTasks = [];

        allTasks.forEach(task => {
            if(task.priority === Number(query.priority)) {
                filteredTasks.push(task);
            }
        })

        allTasks = filteredTasks;
    }

    utils.response(res,'success','All User Tasks Fetched Successfully',allTasks,200);
};

exports.updateTask = async (req, res) => {
    const bodyData = req.body;
    const dueDate = bodyData.dueDate;
    const status = bodyData.status;
    
    const taskId = req.params.taskId;

    // Update changes in task.
    const task = await Task.findById(taskId);
    task.dueDate = dueDate;
    task.status = status;
    task.updatedAt = Date.now();

    const userId1 = req.user.id;
    const userId2 = task.user.toString().replace(/ObjectId\("(.*)"\)/, "$1"); // That method will remove new ObjectId text from Actual Id.

    if(userId1 !== userId2) {
        return utils.response(res,'fail','Provided Task Id is not valid to authorised user',null,400);
    }

    const subTasks = task.subTasks;
    
    // Update changes in subTasks array of task.
    subTasks.forEach(subTask => {
        subTask.status = true;
        subTask.updatedAt = Date.now();
    });

    const user = req.user;
    const userTasks = user.tasks;

    // Find the required task from tasks array of user then update changes.
    userTasks.forEach(task => {
        if(task.id === taskId) {
            task.dueDate = dueDate;
            task.status = status;
            task.updatedAt = Date.now();
        }
    });

    await user.save({ validateBeforeSave : false });
    await task.save({ validateBeforeSave : false });

    // Update all SubTasks according to task updation.
    await SubTask.updateMany({taskId: taskId}, {$set : {status : true, updatedAt: Date.now() }});

    utils.response(res,'success','User tasks are updated successfully.',user,200);
};

exports.deleteTask = async (req, res) => {
    const taskId = req.params.taskId;
    const user = req.user;

    const task = await Task.findById(taskId);

    const userId1 = user.id;
    const userId2 = task.user.toString().replace(/ObjectId\("(.*)"\)/, "$1"); // That method will remove new ObjectId text from Actual Id.

    if(userId1 !== userId2) {
        return utils.response(res,'fail','Provided Task Id is not valid to authorised user',null,400);
    }

    task.deletedAt = Date.now();
    
    const allTasks = user.tasks;

    allTasks.forEach(currTask => {
        if(currTask.id === taskId) {
            currTask.deletedAt = Date.now();
        }
    });

    await task.save({ validateBeforeSave : false });
    await user.save({ validateBeforeSave : false });

    await SubTask.updateMany({taskId: taskId}, {$set : { deletedAt : Date.now() }});

    utils.response(res,'success','User task is deleted successfully.',user,200);
}