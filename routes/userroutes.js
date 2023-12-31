const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Define routes
router.post('/register', userController.registerUser);
// ... other routes
router.post("/generateotp",userController.updatePhoneNumber);
router.post("/verifyotp",userController.verifyotp);
module.exports = router;