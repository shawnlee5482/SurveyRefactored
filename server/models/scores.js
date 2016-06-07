var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new mongoose.Schema({
 // since this is a reference to a different document, the _ is the naming convention!
 name: String, 
 score: String,
 percentage: String
});

mongoose.model('Scores', scoreSchema);