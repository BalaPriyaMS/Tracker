import {queryReturn} from "../config/mysqlconfig.js"
import { hashPassword, checkPassword, sendOTPViaSMS } from "../utils/utils.js"
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