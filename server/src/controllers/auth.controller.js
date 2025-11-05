import httpStatus from "http-status-codes";
import { generalResponse } from "../utils/utils.js";
import * as AuthService from "../services/auth.service.js"

export const checkUserByEmailOrMobile = async (req, res) => {
  
  try {
    const { contact } = req.body;
    const response = await AuthService.checkUserByEmailOrMobileService(contact);
    return generalResponse(res, {
      statusCode: httpStatus.OK,
      data: response.data,
      message: response.message || "User found"
    });
  } catch (err) {
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message,
      data: null,
      message: "Failed to check user"
    });
  }
};

export const signInByEmailId = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resp = await AuthService.signInByEmailIdService(email, password);

    return generalResponse(res, {
      statusCode: resp.statusCode || httpStatus.OK,
      err: null,
      data: resp.data || null,
      message: resp.message || "Login attempt",
    });
  } catch (err) {
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to login",
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
        message:resp.message
      })
  } catch(err){
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data:null,
      message:"failed to sent otp"
    })
  }
};

export const forgetPassword = async (req, res) => {
  try{
    const {email, newpassword, confirmpassword} = req.body;
    const resp = await AuthService.forgetPasswordService(email, newpassword, confirmpassword);

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      data: null,
      mwssage: resp.message
    });
  } catch(err){
     return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to forget password"
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const {email, oldpassword, newpassword, confirmpassword} = req.body;
    const resp = await AuthService.changePasswordService(email, oldpassword, newpassword, confirmpassword);

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      data: null,
      mssg: resp.message 
    });
  } catch(err){
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to reset password"
    });
  }
}

export const sentInvite = async (req, res) => {
  try{
    const { email: targetEmail } = req.body;
    const { userid } = req.user.userid; 
    const resp = await AuthService.sendInviteServices(targetEmail,userid);
    return generalResponse(res, {
      statusCode: resp.statusCode || httpStatus.OK,
      data: resp.data || null,
      message: resp.message || "Login attempt",
    });
  } catch(err){
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to login",
    });
  }
}

