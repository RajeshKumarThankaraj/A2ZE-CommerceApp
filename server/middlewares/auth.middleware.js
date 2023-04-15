const { UDError } = require("./errorHandler");
const jwt = require("jsonwebtoken");
const redisClient = require("../services/redis.conn");
const mongoose = require("mongoose");

const verifyAccessToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new UDError({
        status: 400,
        message: "Token not found",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const isAdmin = req.baseUrl.includes("admin");

    const decoded = isAdmin
      ? jwt.verify(token, process.env.JWT_ADMIN_SECRET)
      : jwt.verify(token, process.env.JWT_CLIENT_SECRET);
    req.userId = decoded.id;
    req.token = token;

    if (isAdmin) {
      req.isAdmin = true;
    }

    // verify blacklisted access token.
    const blacklistedToken = await redisClient.get("BL_" + decoded.id);

    if (blacklistedToken === token) {
      throw new UDError({
        status: 401,
        message: "Token expired. Please login again.",
      });
    }

    if (req.originalUrl.includes("addProduct")) {
      req.productId = new mongoose.Types.ObjectId();
    }
    next();
  } catch (error) {
    return res.status(error.status || 400).json({
      error: "Request failed",
      message: error.message,
    });
  }
};

const verifyRefreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new UDError({
        status: 400,
        message: "Token not found",
      });
    }

    const isAdmin = req.baseUrl.includes("admin");
    const decoded = isAdmin
      ? jwt.verify(token, process.env.JWT_ADMIN_REFRESH_SECRET)
      : jwt.verify(token, process.env.JWT_CLIENT_REFRESH_SECRET);
    req.userId = decoded.id;

    // verify if token is in store or not
    const findToken = await redisClient.get(decoded.id.toString());

    if (!findToken) {
      throw new UDError({
        status: 401,
        message: "Authorization failed. Token not available in store.",
      });
    }

    if (JSON.parse(findToken).refreshToken != token) {
      throw new UDError({
        status: 401,
        message: "Authorization failed. Invalid Token.",
      });
    }

    next();
  } catch (error) {
    return res.status(error.status || 400).json({
      error: "Request failed",
      message: error.message,
    });
  }
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};
