const bcrypt = require('bcrypt');

const AesopFable = require('../models/AesopFable.js');
const RandomContent = require('../models/RandomContent.js');

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


const getUnlockedTitles = (items) => {
	if (!items) return console.log('No items to iterate!');
	return items.map(el => {
		return { title: { $ne: el.title } };
	});
}

let retryCounter = 0;
const getRandomContent = async (req, res) => {
	try {
		// TODO ↓ to add content to the database
		// const content = new RandomContent();
		// content.title = 'Juana de Arco';
		// content.author = 'Mark Twain';
		// content.genre = 'HISTORICA';
		// content.text = jsonText.text;
		// content.image = './assets/Library/Catalog/janne.png';
		// content.score = 4;

		// content.save().then(doc => {
		// 	console.log('content saved succesfully!');			
		// }).catch(err => {
		// 	console.log('Error saving token:');
		// 	console.log(err);
		// });

		const unlocked = req.body;

		RandomContent.countDocuments().exec(async (err, count) => {
			if (err) return res.sendStatus(404);

			const random = Math.floor(Math.random() * count);
			try {
				let isContentRepeated = true;

				do {
					const content = await RandomContent.findOne(getUnlockedTitles(unlocked).length > 0
						? { $and: getUnlockedTitles(unlocked) }
						: {}
					).skip(random);

					if (content) {
						res.json(content); break;
					}

					if (retryCounter++ > count + 1) break; 

					console.log('retryCounter:', retryCounter++);
					// console.log('content:', content ? true : false);
					// console.log('isContentRepeated:', isContentRepeated);
				} while (isContentRepeated);
				// if  res.json({message: 'tsdfsfasfasdcsafd'});
				console.log('end of while');

				console.log('no of docs: ' + count);

				retryCounter = 0;

				// console.log(`(${random}) content title: ` + content.title);
			} catch (err) {
				console.log('Error finding random content:');
				console.log(err);
			}
		});
	} catch (err) {
		console.log(`server error with RandomContent....`); // TODO write a better error message
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
	getFables, getRandomContent,

	CMSLogin,
}
