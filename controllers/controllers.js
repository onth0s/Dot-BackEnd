const bcrypt = require('bcrypt');

const UserCredential = require('../models/UserCredential.js');

const getEmails = async (req, res) => {
	try {
		const doc = await UserCredential.find();

		const arr = [];
		doc.forEach(val => {
			arr.push(val.email)
		});

		res.json(arr);
	} catch (err) {
		console.log('Error getting users emails:');
		console.log(err);
	}
}

const login = (req, res) => {
	const credentials = req.body;

	console.log('Credentials received:');
	console.log(credentials);
}

const register = async (req, res) => {
	const { email, password } = req.body;

	console.log('\nCredentials received!');

	try {
		const doc = await UserCredential.findOne({ email });
		if (!doc) {
			const newUser = new UserCredential();
			newUser.email = email;
			newUser.password = await bcrypt.hash(password, 10);

			// newUser.save().then(doc => {
			// 	console.log(`UserCredential '${email}' registered successfully!`);
			// 	console.log(doc);
			// }).catch(err => {
			// 	console.log('Error saving UserCredential:');
			// 	console.log(err.message);
			// });
			try {
				console.log('before save()');
				const doc = await newUser.save();
				console.log(`UserCredential '${email}' registered successfully!`);
				console.log(doc);
				console.log('after save()');
			} catch (err) {
				console.log('Error saving UserCredential:');
				console.log(err.message);
			}


			res.send(`UserCredential '${email}' registered successfully!`);
			res.status(200).end();
		} else {
			console.log(`Email '${email}' is already taken!`);
			return res.sendStatus(409);
		}
	} catch (err) {
		console.log('Error finding UserCredential:');
		console.log(err);
	}
}

module.exports = {
	getEmails,
	login, register
}
