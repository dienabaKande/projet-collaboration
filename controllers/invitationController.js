const Invitation = require('../models/Invitation');

exports.sendInvitation = async (req, res) => {
  const inv = await Invitation.create({ ...req.body, inviter: req.user.id });
  res.status(201).json(inv);
};

exports.getInvitations = async (req, res) => {
  const invs = await Invitation.find({ inviter: req.user.id });
  res.json(invs);
};

exports.respondInvitation = async (req, res) => {
  const inv = await Invitation.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(inv);
};