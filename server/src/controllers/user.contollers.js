import httpStatus from "http-status-codes";
import { generalResponse } from "../utils/utils.js";
import * as UserService from "../services/user.service.js"


export const registerUser = async(req, res) => {
  
    try{ 
        
        const {username, email, password, mobile} = req.body;
        const userData = await UserService.registerUserService(username, email, password, mobile)
        return generalResponse(res,{
            statusCode: httpStatus.CREATE,
            err:null,
            data: userData,
            mssg:"user created successfully"
        })
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            mssg: "Failed to create user"
      });
    }
};

export const signInByEmailId = async (req,res) => {

  try{
    const{email, password} = req.body;
    const resp = await UserService.signInByEmailIdService(email, password)

    return generalResponse(res,{
      statusCode: httpStatus.OK,
      err:null,
      data: null,
      mssg: resp.message ||"login successfully"
    });
  } catch(err){

    return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            mssg: "Failed to login"
      });
  }
};

export const checkUserByEmail = async (req, res) => {
  
  try {
    const { email } = req.body;
    const response = await UserService.checkUserByEmailService(email);

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      err: null,
      data: response.data || { email },
      mssg: response.message || "User found"
    });
  } catch (err) {
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message,
      data: null,
      mssg: "Failed to check user"
    });
  }
};

export const forgetPassword = async (req, res) => {
  try{
    const {email, newpassword, confirmpassword} = req.body;
    const resp = await UserService.forgetPasswordService(email, newpassword, confirmpassword);

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      err: null,
      data: null,
      mssg: resp.message
    });
  } catch(err){
     return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message,
      data: null,
      mssg: "Failed to reset password"
    });
  }
};

