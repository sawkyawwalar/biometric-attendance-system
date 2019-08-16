const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	
	Ssn: 0,
	name: String,
	email: String,
	gender: String,
	fingerID: 0,
	status: false,
	state: 0
});

module.exports = mongoose.model('User', userSchema,'users');