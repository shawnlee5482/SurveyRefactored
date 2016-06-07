var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new mongoose.Schema({
	question: String, 
	correctAnswer: String,
	fakeAnswer1: String,  // to associate comment(childs)
	fakeAnswer2: String,
	fakeAnswer3: String
});

mongoose.model('Questions', questionSchema);