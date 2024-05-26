const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Path `question` is required.'],
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Options',
    },
  ],
});

const Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;
