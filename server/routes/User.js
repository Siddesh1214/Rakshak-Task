const express = require('express');
const { login, signUp, editProfile, updatePicture, uploadAdhar, uploadPan, liscenceNoGenSer, generateLiscenceNo } = require('../controllers/User');
const { auth } = require('../middlewares/Auth');
const router = express.Router();
// updatePicture


router.post('/signup', signUp);
router.post('/login', login);
router.post('/editProfile',auth, editProfile);
router.post('/changeProfilePic',auth, updatePicture);
router.post('/uploadAdhar',auth, uploadAdhar);
router.post('/uploadPan',auth, uploadPan);
router.post('/liscenceNo',auth,generateLiscenceNo)

module.exports = router;