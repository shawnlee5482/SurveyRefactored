var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketListSchema = new mongoose.Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'Users'},	
	title: String, 
	description: String,
	_partner: [{type: Schema.Types.ObjectId, ref: 'Users'}],
	done: Boolean
}, {timestamps: true});

mongoose.model('BucketList', BucketListSchema);