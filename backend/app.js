const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require("./cron/changeTaskPriority");
require("./cron/voiceCall");

app.use(cookieParser());
app.use(express.json({limit : '50mb'}));

// Import Routes
const user = require("./routes/userRoutes");
const task = require("./routes/taskRoutes");
const subTask = require("./routes/subTaskRoutes");

app.use('/api/v2', user);
app.use('/api/v2', task);
app.use('/api/v2', subTask);

module.exports = app;