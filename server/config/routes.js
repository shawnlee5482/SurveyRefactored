  // This is our routes.js file located in server/config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  module.exports = function(app) {
  	// First, at the top of your routes.js file you'll have to require the controller
    var Surveys = require('./../controllers/surveys.js');
    var Users = require('./../controllers/users.js');
    // Topics

    app.post('/user', function(req, res) {
      console.log('app.post: /user ', req.body);
      Users.newUser(req, res);
    });      

    app.get('/survey/:id', function(req, res) {
      console.log('app.get: /survey/:id is called', req.params.id);
      Surveys.getSurvey(req, res);
    });

    app.get('/delete/:id', function(req, res) {
      console.log('app.get: /delete/:id is called', req.params.id);
      Surveys.delete(req, res);
    });

    app.get('/surveylist', function(req, res) {
      console.log('app.get: /surveylist is called');
      Surveys.getSurveyList(req, res);
    });

    app.post('/newsurvey', function(req, res) {
      console.log('app.post: /newsurvey ', req.body);
      Surveys.newSurvey(req, res);
    });

    app.post('/mark', function(req, res) {
      console.log('routes.js, app.post, /mark ', req.body);
      Surveys.mark(req, res);
    });
};
