const mongoose = require('mongoose');

const CMSUserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
}, { timestamps: true });
const CMSUser = mongoose.model('cms-user', CMSUserSchema);

module.exports = CMSUser;
