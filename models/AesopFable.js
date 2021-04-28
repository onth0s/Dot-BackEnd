const mongoose = require('mongoose');

const fableSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	text: {
		type: [String],
		required: true,
	},
	moral: {
		type: String,
	},
});
const AesopFable = mongoose.model('AesopFable', fableSchema);

module.exports = AesopFable;
