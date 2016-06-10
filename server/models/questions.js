var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new mongoose.Schema({
	question: String, 
	answers: [String]
});

mongoose.model('Questions', questionSchema);