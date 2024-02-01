const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const utils = require('../utils/response');

exports.createSubTaskValidation = (req, res, next) => {
    const bodyData = req.body;
    const taskId = req.params.taskId;
    const title = bodyData.title;
    const description = bodyData.description;

    let errorMsg = [];

    if(!title) {
        errorMsg.push("Title is required");
    }

    if(!description) {
        errorMsg.push("Description is required");
    }

    if(!ObjectId.isValid(taskId)) {
        errorMsg.push(`${taskId} is not valid Mongoose Id`);
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    }

    next();
};

exports.getAllUserSubTasksValidation = (req, res, next) => {
    next();
};

exports.updateSubTaskValidation = (req, res, next) => {
    next();
};

exports.deleteSubTaskValidation = (req, res, next) => {
    next();
};