  // This is our routes.js file located in server/config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  module.exports = function(app) {
  	// First, at the top of your routes.js file you'll have to require the controller
    var BucketList = require('./../controllers/bucketlist.js');
    var Users = require('./../controllers/users.js');
    // Topics

    app.get('/bucketlist/:id', function(req, res) {
      console.log('app.get: /bucketlist/:id is called', req.params.id);
      BucketList.getBucketList(req, res);
    });

    app.post('/newbucketlist', function(req, res) {
      console.log('app.post: /newbucketlist ', req.body);
      BucketList.newBucketList(req, res);
    });

    app.post('/user', function(req, res) {
      console.log('app.post: /user ', req.body);
      Users.newUser(req, res);
    });      
    app.get('/user', function(req, res) {
      console.log('app.get: /user ');
      Users.userList(req, res);
    });  

    app.get('/mark/:id', function(req, res) {
      console.log('app.get: /mark ', req.params.id);
      BucketList.mark(req, res);
    });
};