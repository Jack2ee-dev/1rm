const functions = require('./functions');

exports.auth = async (req, res, next) => {
  const { oauth, oauthProvider, accessToken } = req.body;

  let oauthData;
  switch (oauthProvider) {
    case 'kakao':
      try {
        oauthData = await functions.authenticateKakao(accessToken);
      } catch (err) {
        next(err);
      }
      break;
    case 'google':
      try {
        oauthData = await functions.authenticateGoogle(accessToken);
      } catch (err) {
        next(err);
      }
      break;
    default:
  }

  const { username, thirdPartyId } = oauthData;

  let exUser;
  try {
    exUser = await functions.findUser(
      {
        oauth,
        oauthProvider,
        thirdPartyId,
      },
      { transaction: t }
    );
  } catch (err) {
    next(err);
  }

  if (exUser) {
    res.status(200).json({
      message: '로그인에 성공하였습니다.',
      userId: exUser.id,
      authToken: exUser.authToken,
    });
  } else {
    try {
      const newUser = await functions.signup({
        username,
        thirdPartyId,
        oauthProvider,
        oauth,
      });
      res.status(201).json({
        message: '회원가입에 성공하였습니다.',
        userId: newUser.id,
        authToken: newUser.authToken,
      });
    } catch (err) {
      next(err);
    }
  }
};
