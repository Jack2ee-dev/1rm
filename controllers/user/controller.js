const { findUser } = require('../auth/functions');

exports.getUserData = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const { id, username, oauth, oauthProvider, admin } = await findUser({ id: userId });
    res.status(200).json({ id, username, oauth, oauthProvider, admin });
  } catch (err) {
    next(err);
  }
};
