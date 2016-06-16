
var mongoose = require('mongoose');
var BucketList = mongoose.model('BucketList');

// Edit the show method as follows
module.exports = (function() {
	return {
		getBucketList: function(req, res) {
			console.log('bucket list controller getBucketList is called', req.params.id);
			BucketList.find({_user: req.params.id})
			.populate('_user')
			.populate('_partner')			
			.exec(function(err, results) {
				if(err) {
					console.log('error getBucketList server controller: ', err);
					res.json(err);
				} else {
					console.log('getBucketList server controller result: ', results)
					res.json(results);
				}
			});
		},		
		newBucketList: function(req, res) {
			console.log('server controller newBucketList = ', req.body);
			// Questions.create creates a new document and save together at one time
			BucketList.create(req.body, function(err, results) {
				if(err) {
					res.json(err);
					return;
				} else { 
					if(req.body._partner == null) {
						res.json(results);
						return;
					}
				}
			});
			// if there is a partner
			if(req.body._partner) {
				// swap user and partner
				var temp = req.body._partner;
				req.body._partner = req.body._user;
				req.body._user = temp;
				BucketList.create(req.body, function(err, results) {
					if(err) 
						res.json(err);
					else 
						res.json(results);
				});	
			}		
		},
		mark: function(req, res) {
			console.log('server controller mark = ', req.params.id);
			// Questions.create creates a new document and save together at one time
			BucketList.findOne({_id:req.params.id}, function(err, result) {
				if(err) {
					console.log('server mark error', err);
					res.json(err);
				} else {
					if(result.done) result.done = false;
					else result.done = true;
					result.save(function(err,result) {
						if(err) {

						} else {
							console.log('mark server done', result)
							res.json(result);							
						}
					});

				}
			});
		}		
	}
})();