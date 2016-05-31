
var mongoose = require('mongoose');
var Topics = mongoose.model('Topics');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// Edit the show method as follows
module.exports = (function() {
	return {
		index: function(req, res) {
			Topics.find({})
			.populate('posts')
			.exec(function(err, results) {   // find all documents
				if(err) {
				 console.log(err);
				} else {
					res.json(results);   // return it as json format
				}
			});
		},

		detailInfo: function(req, res) {
			Topics.find({})
			.populate('posts')
			.exec(function(err, results) {   // find all documents and get document by index
				if(err) {
				 console.log(err);
				} else {
					Post.find({_topic:results[req.params.topicIndex]._id})
					.populate('comments')
					.exec(function(err, posts) {
						// for  
						results[req.params.topicIndex].posts = posts;
						console.log('topic controller:', req.params.topicIndex);
						console.log('topic controller:', results[req.params.topicIndex]);
						res.json(results[req.params.topicIndex]);			
					});					
					
				}
			});
		},
		addPost: function(req, res) {
			var topicIndex = req.params.topicIndex;
			Topics.find({})
			.populate('posts')
			.exec(function(err, results) {   // find all documents and get document by index
				if(err) {
				 console.log(err);
				} else {
					console.log('topic controller:', req.params.topicIndex);
					console.log('topic controller:', results[req.params.topicIndex])
					var topic = results[req.params.topicIndex];
					console.log('topic controller input parameter:', req.body.postContent, req.body.currentUser);
					var newPost = new Post({_topic:topic, postContent:req.body.postContent, user:req.body.currentUser,
						comments:[]});

					newPost.save(function(err) {
						if(err) {
							console.log('newPost save error');
						} else {
							topic.posts.push(newPost);

							topic.save(function(err) {
								if(err) {

								} else {
									console.log('topic controller addPost:', topic.posts);
									res.json(topic.posts);
								}
							});								
						}

					});


				}
			});

		},	
		addComment: function(req, res) {
			var postId = req.params.id;
			Post.findOne({_id:postId})
			.populate('comments')
			.exec(function(err, post) {   // find all documents and get document by index
				if(err) {
				 console.log(err);
				} else {
					console.log('topic controller addComment', post);
					console.log('topic controller input parameter:', req.body.comment, req.body.currentUser);
					var newComment = new Comment({_post:post.id, comment:req.body.comment, user:req.body.currentUser});

					newComment.save(function(err) {
						if(err) {
							console.log('newPost save error');
						} else {
							post.comments.push(newComment);
							post.save(function(err) {
								if(err) {
									console.log('topic controller addComment: Error occured');
								} else {
									console.log('topic controller addComment:', post);
									return res.json(post);
								}
							});								
						}

					});


				}
			});

		},			
		create: function(req, res) {
			var f = new Topics({category:req.body.category, topic:req.body.topic, userName:req.body.userName, description:req.body.description, numPosts: 0, date:req.body.date});
			console.log('f=', f);
			f.posts = [];
			f.save(function(err) {
				if(err) {
					console.log('Error in saving');
				} else {
					console.log('Successfully saved', f); 		
				}
			});
			res.json(f);
		}		
	}

})();