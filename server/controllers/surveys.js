
var mongoose = require('mongoose');
var Surveys = mongoose.model('Surveys');


// Edit the show method as follows
module.exports = (function() {
	return {
		getSurveys: function(req, res) {
			console.log('Surveys controller getSurveyList is called', req.params.id);
			Surveys.find({})
			.populate('_creator')		
			.exec(function(err, results) {
				if(err) {
					console.log('error in Survey server controller: ', err);
					res.json(err);
				} else {
					console.log('getSurveyList server controller result: ', results)
					res.json(results);
				}
			});
		},	
		getSurvey: function(req, res) {
			console.log('Survey controller getSurvey is called', req.params.id);
			Surveys.findOne({_id:req.params.id})
			.populate('_creator')		
			.exec(function(err, results) {
				if(err) {
					console.log('error in Survey server controller: ', err);
					res.json(err);
				} else {
					console.log('getSurveyList server controller result: ', results)
					res.json(results);
				}
			});
		},			
		newSurvey: function(req, res) {
			console.log('server controller newSurveyList = ', req.body);
			// Questions.create creates a new document and save together at one time
			Surveys.create(req.body, function(err, results) {
				if(err) {
					res.json(err);
					return;
				} else { 
					res.json(results);
					return;
				}
			});		
		},
		deleteSurvey: function(req, res) {
			console.log('server controller delete = ', req.params._id);
			// Questions.create creates a new document and save together at one time
			Surveys.remove({_id: req.params.id}, function(err, results) {
				if(err) {
					res.json(err);
					return;
				} else { 
					res.json(results);
					return;
				}
			});		
		},		
		updateSurvey: function(req, res) {
			console.log('server controller update req.body: ', req.body);
			// Questions.create creates a new document and save together at one time
			// Surveys.findOne({_id:req.body.id}, function(err, result) {
			// 	if(err) {
			// 		console.log('server mark error', err);
			// 		res.json(err);
			// 	} else {
			// 		var option = req.body.option;
			// 		console.assert(0 <= option && option <= 3);
			// 		console.log('result', JSON.stringify(result));
			// 		result.votes[option]++;

			// 		Surveys.update({_id: req.body.id}, {$set: {votes: result.votes}}, function(err,result) {
			// 			if(err) {

			// 			} else {
			// 				console.log('mark server done', result)
			// 				res.json(result);							
			// 			}
			// 		});
			// 	}
			// });
			Surveys.update({_id:req.body._id}, {$set: {votes: req.body.votes}}, function(err, result) {
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