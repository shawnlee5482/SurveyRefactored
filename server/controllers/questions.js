
var mongoose = require('mongoose');
var Questions = mongoose.model('Questions');
var Scores = mongoose.model('Scores');
var async = require('async');

function getRandomShuffle(arr) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled;
}

function getRandomSubarray(arr, size) {
    return getRandomShuffle(arr).slice(0, size);  // take some at the beginning
}

// Edit the show method as follows
module.exports = (function() {
	return {
		getQuestions: function(req, res) {
			var numQuestionRequired = req.params.numQuestionRequired;
			console.log('checking numQuestionRequired ', numQuestionRequired);
			Questions.find({}, function(err, result) {
				if(err) {
					console.log('there is an error in Post.findOne - up');
				} else {
					// if we have not enough quesitons in DB, we fill as much as possible and then return them
					if(result.length < numQuestionRequired) {
						res.json(null); // just return null object						
					} else {
						// select three questions
						console.log('before getRandomSubarray ', numQuestionRequired);
						var questionSelected = getRandomSubarray(result, numQuestionRequired);
						console.log('after getRandomSubarray', questionSelected);
						for(var i = 0; i < questionSelected.length; i++) {
							questionSelected[i].answers = getRandomShuffle(questionSelected[i].answers);
						}
						console.log('getQuestions:', questionSelected);
						res.json(questionSelected);
					}
				}
			});
		},
		newQuestion: function(req, res) {
			var f = new Questions({question: req.body.question, answers: [req.body.correctAnswer, 
				req.body.fakeAnswer1, req.body.fakeAnswer2, req.body.fakeAnswer3]});
			console.log('f=', f);
			f.save(function(err) {
				if(err) {
					console.log('Error in saving');
				} else {
					console.log('Successfully saved', f); 
					res.json({res:'OK'});		
				}
			});
		},

		submitAnswers: function(req, res) {
			var questions = req.body.questions;
			// check if it matches

			console.log('submitAnswers questions=', questions);

			var numCorrect = 0;

			// collect right answer's first from database
			var correctAnswer = [];
			var funcList = [];

			async.each(questions, function (item, callback) {
				console.log('starting new callack for individual item');
				Questions.findOne({_id: item._id}, function(err, result) {
					if(err) {
						console.log('cant find the question');
						res.json(null); // error
					} else {
						correctAnswer = result.answers[0];
						console.log('correctAnswer = ', correctAnswer);
						var m = parseInt(item.answer)-1;
						console.log('m=', m);
						var yourAnswer = item.answers[m];
						console.log('correctAnswer= ', correctAnswer, 'yourAnswer', yourAnswer);
						if(correctAnswer == yourAnswer) numCorrect++;	
						callback(null, null);					
					}
				});				
			}, function done() {
				async.series(funcList, function() {
				 	console.log('finished!');
				 	resp = {correct:numCorrect, total:questions.length, percentage: Math.floor(numCorrect / questions.length * 100)};
				 	resp.percentage += '%';
				 	var s = new Scores({name: req.body.name, score: resp.correct, 
				 	percentage: resp.percentage});
				 	console.log('s=', s);
				 	s.save(function(err) {
				 	 	if(err) {
				 	 		console.log('Error in saving');
				 	 	} else {
				 	 		console.log('Successfully saved', s); 
							res.json(resp);		
				 	 	}
				 	});	
				});
			});						
		}
	}

})();