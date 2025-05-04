const express = require('express');
const {
  sendInvitation,
  getInvitations,
  respondInvitation
} = require('../controllers/invitationController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.use(auth);
router.post('/', sendInvitation);
router.get('/', getInvitations);
router.put('/:id/respond', respondInvitation);

module.exports = router;
