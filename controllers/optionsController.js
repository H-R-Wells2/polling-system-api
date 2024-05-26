const Options = require("../models/Options");
const Questions = require("../models/Questions");
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../config/.env') });

// Define your API base URL here
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

// Create a new option and associate it with a question
module.exports.create = (req, res) => {
  const questionId = req.params.questionId;

  Options.create({ text: req.body.option })
    .then((option) => {
      if (option) {
        console.log("Successfully created option.");

        option.link_to_vote = `${API_BASE_URL}/api/v1/options/${option._id}/add_vote`;
        option.save();

        Questions.findById(questionId)
          .then((question) => {
            if (!question) {
              return res.status(404).json({ message: "Question not found" });
            }

            question.options.push(option._id);
            question.save();

            res.status(200).json({ message: "Successfully created option!", question });
          })
          .catch((err) => {
            console.error("Error finding question:", err);
            res.status(500).json({ message: "Internal Server Error" });
          });
      }
    })
    .catch((err) => {
      console.error("Error creating option:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// Add a vote to an option
module.exports.addVote = (req, res) => {
  const optionId = req.params.optionId;

  Options.findById(optionId)
    .then((option) => {
      if (option) {
        option.votes += 1;
        option.save();
        res.status(200).json({ message: "Successfully added vote!" });
      }
    })
    .catch((err) => {
      console.error("Error adding vote:", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};


// Delete an option only if it has no votes
module.exports.delete = (req, res) => {
  const optionId = req.params.optionId;

  Options.findById(optionId)
    .then((option) => {
      if (option) {
        if (option.votes === 0) {
          option.deleteOne().then(() => {
            return res.status(200).json({ message: "Successfully deleted option!" });
          });
        } else {
          return res.status(400).json({ message: "Cannot delete option having votes" });
        }
      } else {
        return res.status(404).json({ message: "Option not found!" });
      }
    })
    .catch((err) => {
      console.error("Error deleting option:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
};
