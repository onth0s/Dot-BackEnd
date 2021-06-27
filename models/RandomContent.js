const mongoose = require('mongoose');

const randomContentSchema = new mongoose.Schema({
	// 	title: cat.title,
	// 	author: 'Edgar Allan Poe',

	// 	icon: icons.sci_fi,
	// 	genre: icons.sci_fi,

	// 	time_ago: 0,
	// 	time_lenght: 8,
	// 	text: cat.text,

	// 	image: './assets/Library/Catalog/cat.png',

	title: {
		type: String,
		required: true,
		unique: true
	},
	author: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},

	text: {
		type: [String],
		required: true,
	},

	image: {
		type: String,
		required: false,
	},

}, { timestamps: true });

const RandomContent = mongoose.model('random-content', randomContentSchema);

module.exports = RandomContent;
