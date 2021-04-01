const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		}
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
}, { timestamps: true });
const User = mongoose.model('User', userSchema);

module.exports = User;
