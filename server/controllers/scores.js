
var mongoose = require('mongoose');
var Scores = mongoose.model('Scores');

module.exports = (function() {
	return {
		getScores: function(req, res) {
			Scores.find({}, function(err, result) {   // find only one document
				if(err) {
				 	console.log(err);
				} else {
					// calculate the number of topic, post, comment here
					res.json(result);
				}
			})
		}		
	}
})();