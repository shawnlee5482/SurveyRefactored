
var mongoose = require('mongoose');
var Topics = mongoose.model('Topics');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var Users = mongoose.model('Users');

module.exports = (function() {
	return {
		create: function(req, res) {
			var f = new Users({name: req.body.name, numTopic: 0, numPost: 0, numComment: 0});
			console.log('f=', f);
			f.save(function(err) {
				if(err) {
					console.log('Error in saving');
				} else {
					console.log('Successfully saved', f); 		
				}
			});
			res.json(f);
		},
		get: function(req, res) {
			console.log('users controller req.params.userName', req.params.userName);
			Users.findOne({name:req.params.userName}, function(err, result) {   // find only one document
				if(err) {
				 	console.log(err);
				} else {
					// calculate the number of topic, post, comment here
					Topics.find({userName:req.params.userName}, function(err, results) {   // find all documents
						if(err) {
						 console.log(err);
						} else {
							result.numTopic = results.length;   // return it as json format
							Post.find({user:req.params.userName}, function(err, results) {   // find all documents
								if(err) {
								 console.log(err);
								} else {
									result.numPost = results.length;   // return it as json format
									Comment.find({user:req.params.userName}, function(err, results) {   // find all documents
										if(err) {
										 console.log(err);
										} else {
											result.numComment = results.length;   // return it as json format
											console.log('users controller result=', result);
											res.json(result);   // return it as json format											
										}
									});									
								}
							});
						}
					});



				}
			})
		}		
	}
})();