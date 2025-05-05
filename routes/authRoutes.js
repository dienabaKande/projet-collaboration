const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/register', auth.ensureGuest, register);
router.post('/login', auth.ensureGuest, login);

module.exports = router;
