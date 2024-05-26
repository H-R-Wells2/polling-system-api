const express = require('express');
const router = express.Router();

const questionController = require('../../../controllers/questionsController');
const optionsController = require('../../../controllers/optionsController');

// POST request to create a question
router.post('/create', questionController.create);

// GET request to view a question
router.get('/:questionId', questionController.question);

// GET request to delete a question
router.get('/:questionId/delete', questionController.delete);

// POST request to create an option for a question
router.post('/:questionId/options/create', optionsController.create);

module.exports = router;
