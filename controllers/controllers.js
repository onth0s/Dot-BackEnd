const bcrypt = require('bcrypt');

const UserCredential = require('../models/UserCredential.js');
const AesopFable = require('../models/AesopFable.js');

const CMSUser = require('../models/CMSUser.js');
const CMSLoginLog = require('../models/CMSLoginLog.js');

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





const CMSLogin = async (req, res) => {
	const { userCredentials: { username, password }, IP } = req.body;

	const loginLog = new CMSLoginLog();
	loginLog.username = username;
	loginLog.passwordAttempt = password;
	loginLog.IP = IP;
	loginLog.success = false;

	try {
		const userFound = await CMSUser.findOne({ username });

		if (userFound) {
			try {
				const isPasswordCorrect = bcrypt.compareSync(password, userFound.password);
				loginLog.success = isPasswordCorrect;
				
				console.log('isPasswordCorrect:');
				console.log(isPasswordCorrect);

				if (isPasswordCorrect) res.sendStatus(200);
				else res.send('Wrong credentials').status(200);
			} catch (err) {
				console.log('Error comparing password and hash:');
				console.log(err);
				
				// return res.sendStatus(500);
				res.send('Wrong credentials').status(200);
			} 
				
		}
		else {
			loginLog.success = false;
			res.send('Wrong credentials').status(200);
		}

		try {
			const savedLog = await loginLog.save();
			console.log('savedLog:');
			console.log(savedLog);
			return;
		} catch (err) {
			console.log('Error saving logging log:');
			console.log(err);
		}
		// loginLog.save().then(doc => {
		// 	console.log('Logging log saved successfully:');
		// 	console.log(doc);

		// 	return res.sendStatus(202);
		// }).catch(err => {
		// 	console.log('Error saving logging log:');
		// 	console.log(err);

		// 	return res.sendStatus(500);
		// });
	} catch (err) {
		console.log('Error finding user:');
		console.log(err);
	}
}

module.exports = {
	getEmails,
	login, register,

	getFables,



	CMSLogin,
}
