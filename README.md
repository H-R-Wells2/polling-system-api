# Polling System API

This is a Node.js-based API for a polling system where users can create questions with options, vote on options, and view detailed information about questions and their options.

## Features

- Create a question
- Add options to a question
- Add a vote to an option of a question
- Delete a question (optional: if no votes are given to any of its options)
- Delete an option (optional: if no votes are given to it)
- View a question with its options and votes

## Project Structure

The project is structured into models, controllers, routes, and configuration files for a scalable and organized application.

### Folder Structure

- **config**: Contains configuration files, such as database connection.
- **controllers**: Implements the application's business logic.
- **models**: Defines the data models for MongoDB.
- **routes**: Specifies the API endpoints.
- **index.js**: Entry point for starting the server.

### Prerequisites

- Node.js (version >= 12.x)
- MongoDB
  on

1. **Clone the repository:**

   ```sh
   git clone https://github.com/h-r-wells2/pooling-system-api.git
   cd pooling-system-api
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/polling-api
   API_BASE_URL=http://localhost:8000
   ```

4. **Start the application:**

   ```sh
   npm start
   ```

5. **Access the application:**

   Open your browser and go to `http://localhost:8000`.

## Usage

1. **Create a Question**: Use the `/questions/create` endpoint to create a new question.
2. **Add Options**: Use the `/questions/:id/options/create` endpoint to add options to a specific question.
3. **Add a Vote**: Use the `/options/:id/add_vote` endpoint to increment the count of votes for a specific option.
4. **Delete a Question**: Use the `/questions/:id/delete` endpoint to delete a question (if no votes are given to any options).
5. **Delete an Option**: Use the `/options/:id/delete` endpoint to delete an option (if no votes are given to it).
6. **View a Question**: Use the `/questions/:id` endpoint to view a question with its options and votes.

## Video Walkthrough

[Watch the video walkthrough](https://drive.google.com/file/d/1L2QLTEuVKj42jztnVs-ykBKUDbCNi1ju/view?usp=sharing) explaining the folder structure and project setup.
