const mongoose = require('mongoose');

const CMSLoginLogSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	IP: {
		type: Object,
		required: true,
	},
	success: {
		type: Boolean,
		required: true
	},
	passwordAttempt: {
		type: String,
		required: true
	}
}, { timestamps: true });
const CMSLoginLog = mongoose.model('cms-login-log', CMSLoginLogSchema);

module.exports = CMSLoginLog;
