const express = require('express');
const router = express.Router();

// Route all API requests to the /api endpoint to the api router
router.use('/api', require('./api'));

module.exports = router;
