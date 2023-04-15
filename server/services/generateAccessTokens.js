const jwt = require("jsonwebtoken");
const redisClient = require("./redis.conn");

const generateAccessTokens = async (data, isAdmin) => {
  try {
    const accessToken = jwt.sign(
      data,
      isAdmin ? process.env.JWT_ADMIN_SECRET : process.env.JWT_CLIENT_SECRET,
      { expiresIn: "365d" }
    );
    const refreshToken = jwt.sign(
      data,
      isAdmin
        ? process.env.JWT_ADMIN_REFRESH_SECRET
        : process.env.JWT_CLIENT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );

    await redisClient.set(
      data.id.toString(),
      JSON.stringify({ refreshToken: refreshToken })
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    return error;
  }
};

module.exports = generateAccessTokens;
