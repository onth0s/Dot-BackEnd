const express = require('express');
const router = express.Router();

const {
	getEmails,
	register, login
} = require('../controllers/controllers.js');

router.get('/emails', getEmails);

router.post('/login', login);
router.post('/register', register);

module.exports = router;
