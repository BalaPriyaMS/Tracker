import {queryReturn} from "../config/mysqlconfig.js"
import { hashPassword, checkPassword, generateOTP } from "../utils/utils.js"
import { logger } from "../common/logger.js";
import { v4 as uuidv4 } from 'uuid';

export const registerUserService = async(username, email, password, mobile) => {
    try{
        const userid = uuidv4();
        const createdat = Date.now();

        const hashPswd = hashPassword(password);

        const query = "INSERT INTO users (userid, username, email, password, mobile, createdat, updatedat) VALUES (?, ?, ? , ?, ?, ?, ?)";
        await queryReturn(query, [userid, username, email, hashPswd, mobile, createdat, createdat]);
        
        const roleid = "d35fb7b1-b475-11f0-a114-e8b0c5a9b7e9";
        const userroleQuery = "INSERT INTO userroles (userid, roleid) VALUES (?,?)";
        await queryReturn(userroleQuery, [userid, roleid]);
        return {
            userid,
            username,
            email,
            mobile,
            createdat,
            updatedat:createdat
        }
    } catch(err){
        console.error("Error in registerUserService:", err);
        throw err;
    }
    
};

export const signInByEmailIdService = async (email, password) => {
  try {
    const query = "SELECT password FROM users WHERE email = ?";
    const rows = await queryReturn(query, [email]);

    const isMatched = checkPassword(password, rows[0].password);
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
    try{
        const otp = generateOTP();
        
    } catch(err){
        logger.err("Error in signInByMobileService:", err)
        throw err;
    }
}


export const checkUserByEmailOrMobileService = async(identifier) => {
    try{
        let query
        if (identifier.includes('@')){
            query = "SELECT email FROM users WHERE email=?";
        } else {
            query = "SELECT mobile FROM users WHERE mobile=?";
        }

        const row = await queryReturn(query, [identifier])
        if (row.length === 0) {
            const err = new Error("User not found ");
            err.statusCode = 404;
            throw err;
        }
        return {
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