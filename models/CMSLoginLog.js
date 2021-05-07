const mongoose = require('mongoose');

const CMSLoginLogSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	IP: {
		type: Object,
		required: true,
	},
	success: {
		type: Boolean,
		required: true
	}
}, { timestamps: true });
const CMSLoginLog = mongoose.model('cms-login-log', CMSLoginLogSchema);

module.exports = CMSLoginLog;
