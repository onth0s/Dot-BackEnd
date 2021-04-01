const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
}, { timestamps: true });
const User = mongoose.model('UserCredential', userSchema);

module.exports = User;
