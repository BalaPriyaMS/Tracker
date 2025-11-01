import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import twilio from "twilio"
import { logger } from "../common/logger.js";
import axios from "axios";

export const generalResponse = (res, resObject) => {
    if (resObject.err){
        return res
         .status( resObject.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
         .json({
            status:"Failure",
            data: resObject.data || null,
            err: resObject.err || null,
            mssg: resObject.mssg || null
         }) ;
    }
    return res.status( resObject.statusCode || httpStatus.OK)
     .json({
        status:"Success",
        data: resObject.data || null,
        err: null,
        mssg: resObject.mssg || null
     });
}

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
