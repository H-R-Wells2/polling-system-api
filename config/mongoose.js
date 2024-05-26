const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Disable strict query mode
mongoose.set("strictQuery", false);

// Connect to MongoDB using the URI from the environment variables or a default local URI
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/polling-api", {});

const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

// Log successful connection
db.once('open', function () {
    console.log('Connected to MongoDB successfully');
});

module.exports = db;
