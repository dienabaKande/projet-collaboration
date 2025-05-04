const express = require('express');
const {
  getProfile,
  updateProfile
} = require('../controllers/userController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use(auth);
router.get('/me', getProfile);
router.put('/me', updateProfile);

module.exports = router;
