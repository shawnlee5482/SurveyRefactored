var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new mongoose.Schema({
 // since this is a reference to a different document, the _ is the naming convention!
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},  // Post is the parent
 comment: String, 
 user: String,
 date: {type: Date, default: new Date}
});

mongoose.model('Comment', commentSchema);