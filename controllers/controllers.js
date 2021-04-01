const bcrypt = require('bcrypt');

const User = require('../models/Users.js');

const login = (req, res) => {
	const credentials = req.body;

	console.log('Credentials received:');
	console.log(credentials);
}

const register = async (req, res) => {
	const { email, password } = req.body;

	console.log('\nCredentials received!');
	
	try {
		const doc = await User.findOne({ email });
		if (!doc) {
			const newUser = new User();
			newUser.email = email;
			newUser.password = await bcrypt.hash(password, 10);

			newUser.save().then(doc => {
				console.log(`User '${email}' registered successfully!`);
				console.log(doc);
			}).catch(err => {
				console.log('Error saving user:');
				console.log(err.message);
			});
			
			res.send(`User '${email}' registered successfully!`);
			res.status(200).end();
		} else {
			console.log(`Email '${email}' is already taken!`);
			return res.sendStatus(409);
		}
	} catch (err) {
		console.log('Error finding user:');
		console.log(err);
	}
}

module.exports = {
	login, register
}
