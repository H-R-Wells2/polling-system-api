const express = require('express');

const router = express.Router();

// Route all requests to the /v1 endpoint to their respective routers
router.use('/questions', require('./question'))
router.use('/options', require('./option'))

module.exports = router;