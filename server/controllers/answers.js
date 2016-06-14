
var mongoose = require('mongoose');
var Answers = mongoose.model('Answers');
var Questions = mongoose.model('Questions');

// Edit the show method as follows
module.exports = (function() {
	return {
		getAnswers: function(req, res) {
			Answers.find({_question: req.params.questionID})
			.populate('_user')
			.exec(function(err, results) {   // find all documents
				if(err) {
					console.log('error getAnswers server controller: ', err);
					res.json(err);
				} else {
					res.json(result);
				}
			});
		},
		newAnswer: function(req, res) {
			console.log('answer server controller ', req.body)
			// first create answer
			Answers.create(req.body, function(err, results) {
				if(err) 
					res.json(err);
				else {
					// update question record
					console.log('created answers = ', results);
					Questions.update({_id: req.body._question}, { $addToSet : { _answers : results._id }}, function(err, results){
						if(err){
							console.log('error in storing answers in server questions handler ', err);
							res.json(err);
						} else {
							console.log('successfully saved answers in server questions handler ', results);
							res.json(results);
						}
					});					
				} 
			});
		},
		like: function(req, res) {
			Answers.findOne({_id: req.body._id})  //req.body is answer object
			.populate('user')  // populate for ui
			.exec(function(err, answer) {   // find all documents
				if(err) {
					console.log('error like in server controller: ', err);
					res.json(err);
				} else {
					answer.like++;
					answer.save(function(err, result) {
						if(err) {
							console.log('error in like answer save', err);
							res.json(err);
						} else {
							console.log('successfully saved in like answer save', result);
							res.json(result);
						}
					});
				}
			});								
		}
	}
})();