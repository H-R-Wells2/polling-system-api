const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./config/mongoose');
const routes = require('./routes');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, 'config/.env') });

const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Setup routes
app.use('/', routes);

// Welcome message at the root route
app.get('/', (req, res) => {
    res.send('Welcome to the Polling System API');
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error("Error connecting to server:", err);
        process.exit(1);
    }
    console.log(`Server is running on port ${port}`);
});
