const express = require('express');
const router = express.Router();
const {createAdmin, verifyOtp, loginAdmin, logOutAdmin , profileImage} = require('../controller/adminController')
const uploads = require('../config/multer')

router.post('/signup', createAdmin)
router.post("/otp",verifyOtp)
router.post("/image", profileImage)
router.post('/login', loginAdmin)
router.delete('/logout', logOutAdmin);

module.exports = router;

// Important: Remember to protect the routes with JWT middleware to ensure only authenticated users can access them.