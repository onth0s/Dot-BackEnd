const express = require('express');
const router = express.Router();

const {
	getEmails,
	register, login,

	getFables,



	CMSLogin,
} = require('../controllers/controllers.js');

router.get('/emails', getEmails);

router.post('/login', login);
router.post('/register', register);

// TODO this is new
router.get('/content/fables/Aesop/random', getFables);



// TODO CMS ======================================

router.post('/CMS/login', CMSLogin);


module.exports = router;
