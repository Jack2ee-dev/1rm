const axios = require('axios');
const jwt = require('jsonwebtoken');

const env = require('../../config/env.json');
const { User } = require('../../models/index');

exports.findUser = async (identifier) => {
  try {
    const user = await User.findOne({
      where: identifier,
    });
    return user;
  } catch (err) {
    console.log(err);
    err.message = `User: failed to find with ${identifier}`;
    throw err;
  }
};

exports.authenticateKakao = async (accessToken) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const username = data.kakao_account.profile.nickname;
    const thirdPartyId = data.id;
    return { username, thirdPartyId };
  } catch (err) {
    err.message = 'Kakao: failed to authenticate';
    throw err;
  }
};

exports.authenticateGoogle = async (accessToken) => {
  return;
};

exports.signup = async (data) => {
  const { username, oauth, oauthProvider, thirdPartyId } = data;

  const authToken = jwt.sign(
    {
      username,
      oauth,
      oauthProvider,
      thirdPartyId,
    },
    env.jwtSecretKey
  );

  try {
    const user = await User.create({
      username,
      authToken,
      oauth,
      oauthProvider,
      thirdPartyId,
      admin: false,
    });
    return user;
  } catch (err) {
    err.message = 'User: failed to signup new user';
    throw err;
  }
};
