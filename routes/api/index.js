const express = require('express');

const router = express.Router();

// Route all requests to the /v1 endpoint to the v1 router
router.use('/v1', require('./v1'))

module.exports = router;