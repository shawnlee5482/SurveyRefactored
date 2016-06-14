
var mongoose = require('mongoose');
var Questions = mongoose.model('Questions');

// Edit the show method as follows
module.exports = (function() {
	return {
		getQuestions: function(req, res) {
			Questions.find({})
			.populate('_user')
			.populate({path: '_answers', populate: {path: '_user'}})
			.exec(function(err, results) {
				if(err) {
					console.log('error getQuestions server controller: ', err);
					res.json(err);
				} else {
					console.log('questions server controller result=', results)
					res.json(results);
				}
			});
		},
		getQuestion: function(req, res) {
			Questions.findOne({_id:req.params.id})
			.populate('_user')
			.populate({path: '_answers', populate: {path: '_user'}})
			.exec(function(err, result) {
				if(err) {
					console.log('error getQuestions server controller: ', err);
					res.json(err);
				} else {
					console.log('question server controller result=', result)
					res.json(result);
				}
			});
		},		
		newQuestion: function(req, res) {
			console.log('server question controller newQuestion = ', req.body);
			// Questions.create creates a new document and save together at one time
			Questions.create(req.body, function(err, results) {
				if(err) 
					res.json(err);
				else 
					res.json(results);
			});
		}
	}
})();