const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({
    path: "backend/config/.env"
});

const dbURL = process.env.DB_URL;

const connectDatabase = () => {
    mongoose.connect(dbURL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then((response) => {
        console.log("database connected");
    });
};

module.exports = connectDatabase;