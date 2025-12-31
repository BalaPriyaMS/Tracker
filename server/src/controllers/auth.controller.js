import httpStatus from "http-status-codes";
import { generalResponse } from "../utils/utils.js";
import * as AuthService from "../services/auth.service.js"

export const checkUserByEmailOrMobile = async (req, res) => {
  
  try {
    const { contact } = req.body;
    const response = await AuthService.checkUserByEmailOrMobileService(contact);
    return generalResponse(res, {
      statusCode: httpStatus.OK,
      err: null,
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

    if (resp?.data?.accessToken) {
      res.cookie("access_token", resp.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000
      });

      delete resp.data.accessToken;
    }

    return generalResponse(res, {
      statusCode: resp.statusCode || httpStatus.OK,
      err: null,
      data: resp.data || null,
      message: resp.message || "Login successful",
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

      if (resp?.data?.accessToken) {
        res.cookie("access_token", resp.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 24 * 60 * 60 * 1000
        });

        delete resp.data.accessToken;
      }

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

export const signOut = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      err: null,
      data: null,
      message: "Logged out successfully",
    });
  } catch (err) {
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to logout",
    });
  }
};


export const forgetPassword = async (req, res) => {
  try{
    const {email} = req.body;
    const resp = await AuthService.forgetPasswordService(email);

    return generalResponse(res, {
      statusCode: httpStatus.OK,
      err: null,
      data: resp.data || null,
      message: resp.message || "Password reset link sent successfully"
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

export const resetPassword = async(req, res) => {
  try{
    const {token} = req.query;
    const {newpassword, confirmpassword} = req.body;

    const resp = await AuthService.resetPasswordService(token, newpassword, confirmpassword);

    return generalResponse(res,{
      statusCode: httpStatus.OK,
      err:null,
      data: null,
      message: resp.message || "Password updated successfully"
    });
  } catch (err){
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to reset password"
    });
  }
}

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
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to reset password"
    });
  }
}

export const sentInvite = async (req, res) => {
  try{
    const { email: targetEmail } = req.body;
    const { userid } = req.user; 
    const resp = await AuthService.sendInviteServices(targetEmail,userid);
    return generalResponse(res, {
      statusCode: resp.statusCode || httpStatus.OK,
      err:null,
      data: resp.data || null,
      message: resp.message || "Login attempt",
    });
  } catch(err){
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to sent invite",
    });
  }
}

export const verifyInviteToken = async (req, res) => {
  try {
    const { token } = req.query; 

    if (!token) {
      return generalResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        err: "Missing token",
        data: null,
        message: "Invitation token is required",
      });
    }

    const resp = await AuthService.verifyInviteTokenService(token);

    return generalResponse(res, {
      statusCode: httpStatus.OK ,
      err: null,
      data: null,
      message: resp.message,
    });

  } catch (err) {
    return generalResponse(res, {
      statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      err: err.message || "Unexpected error occurred",
      data: null,
      message: "Failed to verify invitation token",
    });
  }
};

