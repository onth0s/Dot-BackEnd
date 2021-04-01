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
}, { timestamps: true });
const User = mongoose.model('UserData', userSchema);

module.exports = User;
