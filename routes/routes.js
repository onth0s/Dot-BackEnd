const express = require('express');
const router = express.Router();

const {
	getFables, getRandomContent,

	CMSLogin, uploadContent,
} = require('../controllers/controllers.js');


// TODO this is new
router.get('/content/fables/Aesop/random', getFables);
router.post('/content/random', getRandomContent);


// TODO CMS ======================================
router.post('/CMS/login', CMSLogin);
router.post('/CMS/upload', uploadContent);

module.exports = router;
