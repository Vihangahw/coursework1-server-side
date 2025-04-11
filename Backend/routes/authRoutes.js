const express = require('express');
const { registerNewUser, loginUser } = require('../controllers/authController');
const { regenerateApiKey } = require("../controllers/authController");
const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.post("/regenerate-key", regenerateApiKey);

module.exports = router;
