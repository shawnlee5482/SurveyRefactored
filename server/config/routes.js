  // This is our routes.js file located in server/config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  module.exports = function(app) {
  	// First, at the top of your routes.js file you'll have to require the controller
    var questions = require('./../controllers/questions.js');
    var answers = require('./../controllers/answers.js');
    var users = require('./../controllers/users.js');
    // Topics

    app.get('/question/:id', function(req, res) {
      console.log('app.get /question is called', req.params.id);
      questions.getQuestion(req, res);
    });

    app.get('/questions', function(req, res) {
      console.log('app.get /questions is called');
      questions.getQuestions(req, res);
    });

    app.get('/answers', function(req, res) {
      questions.submitAnswers(req, res);
    }); 

    app.post('/answer/like', function(req, res) {
      answers.like(req, res);
    }); 

    app.post('/newquestion', function(req, res) {
      questions.newQuestion(req, res);
    });

    app.post('/user', function(req, res) {
      console.log('app.post /user ', req.body);
      users.newUser(req, res);
    });      

    app.post('/newanswer', function(req, res) {
      answers.newAnswer(req, res);
    });  

};