const express = require('express');
const { login, signUp, editProfile, updatePicture } = require('../controllers/User');
const { auth } = require('../middlewares/Auth');
const router = express.Router();
// updatePicture


router.post('/signup', signUp);
router.post('/login', login);
router.post('/editProfile',auth, editProfile);
router.post('/changeProfilePic',auth, updatePicture);


module.exports = router;