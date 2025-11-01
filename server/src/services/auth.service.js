import {queryReturn} from "../config/mysqlconfig.js"
import { hashPassword, checkPassword, sendOTPViaSMS } from "../utils/utils.js"
import { logger } from "../common/logger.js";

export const signInByEmailIdService = async (email, password) => {
  try {
    const query = "SELECT password FROM users WHERE email = ?";
    const rows = await queryReturn(query, [email]);
    const isMatched = await checkPassword(password, rows[0].password);
    if (!isMatched) {
      const err = new Error("Invalid password");
      err.statusCode = 401;
      throw err;
    }

    return {
      message: "Login successful",
    };
  } catch (err) {
    logger.error("Error in signInByEmailIdService:", err);
    throw err;
  }
};

export const signInByMobileService = async (mobile) => {
  try {
    const otp = await sendOTPViaSMS(mobile); 
    return {
      message: "OTP sent successfully",
      otp, 
    };
  } catch (err) {
    logger.error("Error in signInByMobileService:", err);
    throw err;
  }
};


export const checkUserByEmailOrMobileService = async(contact) => {
    try{
        let query, type
        if (contact.includes('@')){
            query = "SELECT email FROM users WHERE email=?";
            type = "eamil"
        } else {
            query = "SELECT mobile FROM users WHERE mobile=?";
            type = "mobile"
        }

        const row = await queryReturn(query, [contact])
        if (row.length === 0) {
            throw {
              message: "User not found",
              statusCode: 404,
              data: { isActive: false, type }
            };
        }

        return {
            data:{
                isActive:true,
                type
            },
            message:"user found"
        }
    } catch (err){
        logger.error("Error in checkUserByEmailServiceOrMobile", err);
        throw err;
    }
};

export const forgetPasswordService = async (email, newPassword, confirmPassword) => {
    try {
        
        if (newPassword !== confirmPassword) {
            throw new Error("Both passwords must be the same");
        }

        const hashPsswd = hashPassword(newPassword);

        const query = "UPDATE users SET password = ? WHERE email = ?";
        const result = await queryReturn(query, [hashPsswd, email]);

        if (result.affectedRows === 0) {
            const err = new Error("User not found with provided email");
            err.statusCode = 404;
            throw err;
        }

        return { message: "Password updated successfully" };

    } catch (err) {
        logger.error("Error in forgetPasswordService:", err);
        throw err;
    }
};

export const changePasswordService = async (email, oldPassword, newPassword, confirmPassword) => {
  try {
    const query = "SELECT password FROM users WHERE email = ?";
    const rows = await queryReturn(query, [email]);

    if (!rows || rows.length === 0) {
      const err = new Error("User not found with provided email");
      err.statusCode = 404;
      throw err;
    }

    const isMatched = await checkPassword(oldPassword, rows[0].password);

    if (!isMatched) {
      const err = new Error("Invalid old password");
      err.statusCode = 401;
      throw err;
    }
    
    if (oldPassword == newPassword){
      const err = new Error("New password cannot be the same as the old password");
      err.statusCode = 400; 
      throw err;
    }

    if (newPassword !== confirmPassword) {
      const err = new Error("New password and confirmation password do not match");
      err.statusCode = 400;
      throw err;
    }

    const hashPsswd = hashPassword(newPassword);

    const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
    const result = await queryReturn(updateQuery, [hashPsswd, email]);

    if (result.affectedRows === 0) {
      const err = new Error("Failed to update password");
      err.statusCode = 500;
      throw err;
    }

    return { message: "Password updated successfully" };
    
  } catch (err){
    logger.error("Error in changePasswordService:", err);
    throw err;
  }
}