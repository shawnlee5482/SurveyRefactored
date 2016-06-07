
var mongoose = require('mongoose');
var Questions = mongoose.model('Questions');
var Scores = mongoose.model('Scores');

// Edit the show method as follows
module.exports = (function() {
	return {
		getQuestions: function(req, res) {
			Questions.find({}, function(err, result) {
				if(err) {
					console.log('there is an error in Post.findOne - up');
				} else {
					// randomly select three quesitons and then return them
					if(result.length < 3) {
						var three = [];
						three.push(result[0]);
						three.push(result[0]);
						three.push(result[0]);
						res.json(three);						
					} else {
						// select three questions
						while(1) {
							a = Math.floor(Math.random() * (result.length));
							b = Math.floor(Math.random() * (result.length));
							c = Math.floor(Math.random() * (result.length));
							if(a != b && a != c && b != c) break;
						}

						var three = [];
						three.push(result[a]);
						three.push(result[b]);
						three.push(result[c]);

						res.json(three);
					}
				}
			});
		},
		newQuestion: function(req, res) {
			var f = new Questions({question: req.body.question, correctAnswer: req.body.correctAnswer, 
				fakeAnswer1: req.body.fakeAnswer1, fakeAnswer2: req.body.fakeAnswer2, fakeAnswer3: req.body.fakeAnswer3});
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
			var ans = req.body.answers; // array [1,2,1,2,...]
			var questions = req.body.questions; //correct answer is 1 always <- temporary solution
			// check if it matches

			var numCorrect = 0;
			for(index in ans) {
				if(ans[index] == 1) numCorrect++;
			}
			resp = {correct:numCorrect, total:ans.length, percentage: Math.floor(numCorrect / ans.length * 100)};
			resp.percentage += '%';
			var s = new Scores({name: req.body.name, score: resp.correct, 
				percentage: resp.percentage});
			console.log('s=', s);
			s.save(function(err) {
				if(err) {
					console.log('Error in saving');
				} else {
					console.log('Successfully saved', s); 
					res.json({res:'OK'});		
				}
			});

			return res.json(resp);
			// store the result in the score database

		}
	}

})();