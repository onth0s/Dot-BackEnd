const express = require('express');
const router = express.Router();

const {
	getEmails,
	register, login,

	getFables
} = require('../controllers/controllers.js');

router.get('/emails', getEmails);

router.post('/login', login);
router.post('/register', register);

// TODO this is new
router.get('/content/fables/Aesop/', getFables);

module.exports = router;
