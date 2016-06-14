var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new mongoose.Schema({
	title: String, 
	description: String,
	_answers: [{type: Schema.Types.ObjectId, ref: 'Answers'}],
	_user: {type: Schema.Types.ObjectId, ref: 'Users'}
}, {timestamps: true});

mongoose.model('Questions', questionSchema);