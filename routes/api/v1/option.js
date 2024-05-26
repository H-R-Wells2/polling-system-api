const express = require('express');
const router = express.Router();
const optionsController = require('../../../controllers/optionsController');

// POST request to add a vote to an option
router.post('/:optionId/add_vote', optionsController.addVote);

// GET request to delete an option
router.get('/:optionId/delete', optionsController.delete);

module.exports = router;
