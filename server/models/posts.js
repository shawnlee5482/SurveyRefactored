var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
 _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},	// to specify parent
 postContent: String, 
 user: String,
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]  // to associate comment(childs)
});

mongoose.model('Post', postSchema);