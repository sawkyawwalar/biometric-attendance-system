const mongoose = require('mongoose');
const userLogSchema = mongoose.Schema({
	name:String,
	fingerID: 0,
	time_in:Date,
	time_out:Date,
	status: false
});

module.exports = mongoose.model('UserLog', userLogSchema,'userLog');