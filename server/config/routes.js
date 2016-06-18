  // This is our routes.js file located in server/config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  module.exports = function(app) {
  	// First, at the top of your routes.js file you'll have to require the controller
    var Surveys = require('./../controllers/surveys.js');
    var Users = require('./../controllers/users.js');
    
//////////////////////// user ////////////////////
    app.get('/user', function(req, res) {
      console.log('app.get: /user ', req.params.id);
      Users.getUsers(req, res);
    });  

    app.post('/user', function(req, res) {
      console.log('app.post: /user ', req.body);
      Users.newUser(req, res);
    });   

    app.get('/user/:id', function(req, res) {
      console.log('app.get: /user/:id ', req.params.id);
      Users.getUser(req, res);
    }); 

    app.put('/user/:id', function(req, res) {
      console.log('app.get: /user/:id ', req.params.id);
      Users.updateUser(req, res);
    }); 

    app.delete('/user/:id', function(req, res) {
      console.log('app.delete: /user/:id is called', req.params.id);
      Users.deleteUser(req, res);
    });
//////////////////////////survey //////////////////////
    // get all entries
    app.get('/survey', function(req, res) {
      console.log('app.get: /surveylist is called');
      Surveys.getSurveys(req, res);
    });

    // new entry
    app.post('/survey', function(req, res) {
      console.log('app.post: /newsurvey ', req.body);
      Surveys.newSurvey(req, res);
    });

    // get single entry
    app.get('/survey/:id', function(req, res) {
      console.log('app.get: /survey/:id is called', req.params.id);
      Surveys.getSurvey(req, res);
    });

    app.put('/survey/:id', function(req, res) {
      console.log('app.put: survey is called', req.params.id);
      Surveys.updateSurvey(req, res);
    });

    app.delete('/survey/:id', function(req, res) {
      console.log('app.delete: /delete/:id is called', req.params.id);
      Surveys.deleteSurvey(req, res);
    });
};
