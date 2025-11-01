import httpStatus from "http-status-codes";
import { generalResponse } from "../utils/utils.js";
import * as AuthService from "../services/auth.service.js"


export const signInByEmailId = async (req,res) => {

  try{
    const{email, password} = req.body;
    const resp = await AuthService.signInByEmailIdService(email, password)

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

export const checkUserByEmailOrMobile = async (req, res) => {
  
  try {
    const { contact } = req.body;
    const response = await AuthService.checkUserByEmailOrMobileService(contact);

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      err: null,
      data: response.data,
      mssg: response.message || "User found"
    });
  } catch (err) {
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message,
      data: err.data || null,
      mssg: err.message || "Failed to check user"
    });
  }
};

export const signInByMobileService = async(req, res) => {
  try{
      const {mobile} = req.body;
      const resp = await AuthService.signInByMobileService(mobile);

      return generalResponse(res, {
        statusCode: httpStatus.OK,
        err: null,
        data: null,
        mssg:resp.message
      })
  } catch(err){
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message,
      data:null,
      mssg:"failed to sent otp"
    })
  }
};

export const forgetPassword = async (req, res) => {
  try{
    const {email, newpassword, confirmpassword} = req.body;
    const resp = await AuthService.forgetPasswordService(email, newpassword, confirmpassword);

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
      mssg: "Failed to forget password"
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const {email, oldpassword, newpassword, confirmpassword} = req.body;
    const resp = await AuthService.changePasswordService(email, oldpassword, newpassword, confirmpassword);

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      err:null,
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
}

