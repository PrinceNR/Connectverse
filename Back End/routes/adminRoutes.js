const express = require('express');
const router = express.Router();
const {createAdmin, loginAdmin, logOutAdmin } = require('../controller/admin.controller')

router.post('/signup', createAdmin)
router.post('/login', loginAdmin)
router.delete('/logout', logOutAdmin);

module.exports = router;

// Important: Remember to protect the routes with JWT middleware to ensure only authenticated users can access them.