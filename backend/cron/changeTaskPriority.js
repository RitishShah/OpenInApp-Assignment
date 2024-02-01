const cron = require('node-cron');
const Task = require("../models/taskModel");

// Schedule cron job to run every one hour.
cron.schedule('0 * * * *', async () => {
  try {
    // Find tasks that are overdue and update their priority
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();
    console.log(formattedCurrentDate);
    await Task.updateMany({ dueDate: { $lte: formattedCurrentDate }, status: 'TODO' }, { $inc: { priority: -1 }});

    console.log('Task priorities updated successfully.');
  } catch (error) {
    console.error('Error updating task priorities:', error);
  }
});