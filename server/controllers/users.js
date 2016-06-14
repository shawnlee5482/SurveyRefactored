
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

// Edit the show method as follows
module.exports = (function() {
	return {
		newUser: function(req, res) {
			Users.create(req.body, function(err, result) {
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