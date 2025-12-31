import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import twilio from "twilio"
import { logger } from "../common/logger.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import { queryReturn } from "../config/mysqlconfig.js";

export const generalResponse = (res, resObject) => {
  const { statusCode, err, data, message } = resObject;

  if (err) {
    return res.status(statusCode || 500).json({
      error: err,
      data: data || null,
      message: message || "Failure",
    });
  }

  return res.status(statusCode || 200).json({
    error: err,
    data: data || null,
    message: message || "Success",
  });
};


export const hashPassword = (paswd) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(paswd, salt);
}

export const checkPassword = (password, storedHash) => {
    return bcrypt.compare(password, storedHash);
}

export const reqArgValidation = (req, res, next, args) => {
    const missingArgs = args.filter((arg) => {
        return req.body[arg] === undefined 
    });

    if(missingArgs.length > 0){
        return generalResponse(res, {
            err : `Missing required fields: ${missingArgs}`,
            statusCode: 400,
            data: null,
            mgs: "Missing requires field"
        });
    }

    next();
}



export const sendOTPViaSMS = async (mobile) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  try {
    const client = twilio(accountSid, authToken);

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,   
      specialChars: false,
      digits: true,
    });

    const message = await client.messages.create({
      body: `Your login OTP for tracker is ${otp}. It is valid for 2 minutes.`,
      from: twilioPhone,      
      to: `+91${mobile}`,
    });

    logger.info(`OTP sent successfully to ${mobile}, SID: ${message.sid}`);

    return otp;

  } catch (error) {
    logger.error("Error sending OTP:", error.response?.data || error.message);
    throw new Error("Failed to send OTP");
  }
};

export const generateAccessToken = (payload, expire) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expire,
  });
};

export const sendMail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.error("Error in sendMail:", err);
    throw err;
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { valid: false, message: "Token expired" };
    } else {
      console.log(err.message)
      logger.warn("Invalid token verification:", err.message);
      return { valid: false, message: "Invalid token" };
    }
  }
};

export const isUserExists = async (email) => {
  const query = "SELECT userid FROM users WHERE email = ?";
  const rows = queryReturn(query, [email]);
  if (rows.length > 0) {
    return true
  }

  return false
}

