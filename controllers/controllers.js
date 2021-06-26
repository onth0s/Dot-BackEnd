const bcrypt = require('bcrypt');

const AesopFable = require('../models/AesopFable.js');

const CMSUser = require('../models/CMSUser.js');
const CMSLoginLog = require('../models/CMSLoginLog.js');

const getFables = async (req, res) => {
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
		console.log(`Error counting the AesopFable model:`);
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
	} catch (err) {
		console.log('Error finding user:');
		console.log(err);
	}
}

module.exports = {
	getFables,

	CMSLogin,
}
