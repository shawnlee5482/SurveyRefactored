
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

// Edit the show method as follows
module.exports = (function() {
	return {
		newUser: function(req, res) {
			Users.findOne({name: req.body.name}, function(err, result) {
				if(err) {
					res.json(err);
				} else {
					if(result == null) {
						// if there is no user, create and return
						Users.create(req.body, function(err, result) {
							if(err) 
								res.json(err);
							else {
								console.log('Users sever controller ', result)
								res.json(result);				
							} 
						});
					} else {				
						// if it is existing user, return found one
						res.json(result);
					}
				}
			});
		}, 
		userList: function(req, res) {
			Users.find({}, function(err, result) {
				if(err) 
					res.json(err);
				else {
					console.log('Users sever controller ', result)
					res.json(result);				
				} 
			});
		}		
	}
})();