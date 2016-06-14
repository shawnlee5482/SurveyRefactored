var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new mongoose.Schema({
 // since this is a reference to a different document, the _ is the naming convention!
    _question: {type: Schema.Types.ObjectId, ref: 'Questions'},
	_user: {type: Schema.Types.ObjectId, ref: 'Users'}, 
	comment: String,
	details: String,
	like: Number
});

mongoose.model('Answers', answerSchema);