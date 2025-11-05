import { generalResponse } from '../utils/utils.js';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.body.token;

  if (!token) {
    return generalResponse(res, {
      err: { msg: "No token provided" },
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return generalResponse(res, {
        err: { msg: err.message || "Invalid or expired token" },
        statusCode: 403,
        message: "Forbidden",
      });
    }

    if (!decoded.userid || !decoded.email) {
      return generalResponse(res, {
        err: { msg: "Invalid or expired token" },
        statusCode: 403,
        message: "Forbidden",
      });
    }

    req.user = {
      userid: decoded.userid,
      email: decoded.email,
    };

    next();
  });
};
