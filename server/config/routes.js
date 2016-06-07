  // This is our routes.js file located in server/config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  module.exports = function(app) {
  	// First, at the top of your routes.js file you'll have to require the controller
    var questions = require('./../controllers/questions.js');
    var scores = require('./../controllers/scores.js');

    // Topics
    app.get('/questions', function(req, res) {
      console.log('/questions is called');
      questions.getQuestions(req, res);
    });

    app.post('/answers', function(req, res) {
      questions.submitAnswers(req, res);
    });

    app.get('/scores', function(req, res) {
      scores.getScores(req, res);
    });    

    app.post('/newquestion', function(req, res) {
      questions.newQuestion(req, res);
    });      
};