const express = require('express');
const router = express.Router();

const {
	getFables,

	CMSLogin,
} = require('../controllers/controllers.js');


// TODO this is new
router.get('/content/fables/Aesop/random', getFables);


// TODO CMS ======================================
router.post('/CMS/login', CMSLogin);

module.exports = router;
