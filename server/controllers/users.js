
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
		getUsers: function(req, res) {
			Users.find({}, function(err, result) {
				if(err) 
					res.json(err);
				else {
					console.log('Users sever controller ', result)
					res.json(result);				
				} 
			});
		},
		getUser: function(req, res) {
			console.log('Survey controller getSurvey is called', req.params.id);
			Users.findOne({_id:req.params.id})		
			.exec(function(err, result) {
				if(err) {
					console.log('error in user server controller: ', err);
					res.json(err);
				} else {
					console.log('user server controller result: ', result)
					res.json(result);
				}
			});
		},
		deleteUser: function(req, res) {
			console.log('server controller delete = ', req.params._id);
			// Questions.create creates a new document and save together at one time
			Users.remove({_id: req.params.id}, function(err, results) {
				if(err) {
					res.json(err);
					return;
				} else { 
					res.json(results);
					return;
				}
			});		
		},		
		updateUser: function(req, res) {
			console.log('server controller update req.body: ', req.body);
			Users.update({_id:req.body.id}, req.body.update, req.body.options, function(err, result) {
				if(err) {
					console.log('server controller update error: ', err);
					res.json(err);
				} else {
					console.log('server controller update success: ', result);
					res.json(result);
				}
			});
		}							
	}
})();