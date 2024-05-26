const Questions = require('../models/Questions');
const Options = require('../models/Options');

// View a specific question by ID, including its options
module.exports.question = (req, res) => {
  const questionId = req.params.questionId;

  Questions.findById(questionId)
    .populate("options")
    .then(question => {
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ message: "Question not found!" });
      }
    })
    .catch(err => {
      console.error("Error finding question:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Create a new question
module.exports.create = (req, res) => {
  console.log(req.body);
  console.log("Create Question!");

  Questions.create({ question: req.body.question })
    .then(question => {
      if (question) {
        console.log("Successfully created question.");
        res.status(200).json({ message: "Successfully created question!", question });
      } else {
        console.error("Error creating question.");
        res.status(404).json({ message: "Couldn't create question!" });
      }
    })
    .catch(err => {
      console.error("Internal Server Error:", err);
      res.status(500).json({ message: "Internal Server Error!" });
    });
};

// Delete a question only if none of its options have votes
module.exports.delete = (req, res) => {
  const questionId = req.params.questionId;

  Questions.findById(questionId)
    .then(question => {
      if (question) {
        const hasVotes = question.options.some(option => option.votes > 0);
        if (hasVotes) {
          return res.status(400).json({ message: 'Cannot delete question with options having votes' });
        }
        // Delete associated options
        return Options.deleteMany({ _id: { $in: question.options } });
      } else {
        return res.status(404).json({ message: 'Question not found!' });
      }
    })
    .then(() => {
      // Delete the question
      return Questions.deleteOne({ _id: questionId });
    })
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted question!' });
    })
    .catch(err => {
      console.error('Error deleting question:', err);
      res.status(500).json({ message: 'Error deleting question' });
    });
};
