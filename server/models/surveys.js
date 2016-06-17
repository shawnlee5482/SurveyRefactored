var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new mongoose.Schema({
	_creator: {type: Schema.Types.ObjectId, ref: 'Users'},	
	question: String, 
	options: [String],
	votes: [Number]
}, {timestamps: true});

mongoose.model('Surveys', SurveySchema);