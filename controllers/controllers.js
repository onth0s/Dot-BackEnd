const bcrypt = require('bcrypt');

const UserCredential = require('../models/UserCredential.js');
const AesopFable = require('../models/AesopFable.js');

const CMSUser = require('../models/CMSUser.js');

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

			try {
				const doc = await newUser.save();
				console.log(`UserCredential '${email}' registered successfully!`);
				console.log(doc);
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

let counter = 0;
const getFables = async (req, res) => {
	console.log(`\ngetting Aesop fables... (${counter++})`);

	try {
		AesopFable.countDocuments().exec(async (err, count) => {
			if (err) return res.sendStatus(404);

			const random = Math.floor(Math.random() * count);
			try {
				const fable = await AesopFable.findOne().skip(random - 1);

				res.json({ fable });
				console.log(`(${random}) fable title: ` + fable.title);
			} catch (err) {
				console.log('Error finding the fable:');
				console.log(err);
			}
		});
	} catch (err) {
		console.log(`Error counting a AesopFable model:`);
		console.log(err);
	}

}





const CMSLogin = async(req, res) => {
	const { username, password } = req.body;

	const newUser = new CMSUser();
	newUser.username = username;

	try {
		newUser.password = await bcrypt.hash(password, 10);

		newUser.save().then(doc => {
			console.log('New user saved successfully:');
			console.log(doc);
		}).catch(err => {
			console.log('Error saving new user:');
			console.log(err);
		});
	} catch (err) {
		console.log('Error creating user:');
		console.log(err);
	}

	res.send('Data recieved successfully');
	res.status(200);
	res.end();
	// res.json({
	// 	test_message: 'this is just a test',
	// })
}

module.exports = {
	getEmails,
	login, register,

	getFables,



	CMSLogin,
}
