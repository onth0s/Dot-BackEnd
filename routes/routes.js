const express = require('express');
const router = express.Router();

const {
	getFables, getRandomContent,

	CMSLogin,
} = require('../controllers/controllers.js');


// TODO this is new
router.get('/content/fables/Aesop/random', getFables);
router.get('/content/random', getRandomContent);


// TODO CMS ======================================
router.post('/CMS/login', CMSLogin);

module.exports = router;
