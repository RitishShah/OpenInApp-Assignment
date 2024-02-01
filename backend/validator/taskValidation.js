const mongoose = require('mongoose');
const utils = require('../utils/response');

exports.createTaskValidation = (req, res, next) => {
    const bodyData = req.body;
    const title = bodyData.title;
    const description = bodyData.description;
    const dueDate = bodyData.dueDate;
    const priority = bodyData.priority;

    console.log(bodyData);

    let errorMsg = [];

    if(!title) {
        errorMsg.push("Title is required");
    }

    if(!description) {
        errorMsg.push("Description is required");
    }

    if(!dueDate) {
        errorMsg.push("Due Date is required");
    }

    if(!priority) {
        errorMsg.push("Priority is required");
    }

    if(errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    }

    next();
};

exports.getAllUserTasksValidation = (req, res, next) => {
    next();
}

exports.updateTaskValidation = (req, res, next) => {
    const bodyData = req.body;
    const dueDate = bodyData.dueDate;
    const status = bodyData.status;

    let errorMsg = [];

    if(!dueDate) {
        errorMsg.push("Due dute is required to update");
    }

    if(errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    }
    next();
}

exports.deleteTaskValidation = (req, res, next) => {
    next();
};