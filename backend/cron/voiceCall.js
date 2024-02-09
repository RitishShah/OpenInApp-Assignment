const cron = require('node-cron');
const twilio = require('twilio');
const dotenv = require('dotenv');
const Task = require("../models/taskModel");
const User = require("../models/userModel");

dotenv.config({
    path: "backend/config/.env"
});

const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const client = twilio(accountSid, authToken);

const VoiceResponse = twilio.twiml.VoiceResponse;

// Schedule cron job to run every hour
cron.schedule('0 * * * *', async () => {
  try {
    // Find overdue tasks with the highest priority
    const currentDate = new Date();
    const overdueTasks = await Task.find({ dueDate: { $lt: currentDate }, status: 'TODO' }).sort({ priority: 1 }).populate('User');

    // Iterate over the tasks and make calls
    for (const task of overdueTasks) {
      const userId = task.user;
      const user = await User.findById(userId);
      const priority = user.priority;

      // Check if the user has the same or less priority.
      if (priority <= task.priority) {

        const twiml = new VoiceResponse();
        twiml.say('Hello, this is a voice call from Twilio.');

        // Make a Twilio voice call
        await client.calls.create({
          to: user.phoneNumber,
          from: process.env.TWILIO_PHONENUMBER,
          url: twiml.toString(),
        });

        console.log(`Voice call made to ${user.email} at ${user.phoneNumber}`);
        break; // Break the loop after making the call
      }
    }
  } catch (error) {
    console.error('Error making voice calls:', error);
  }
});
