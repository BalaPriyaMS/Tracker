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

export const listUsers = async(req, res) => {
    try{
        const userData = await UserService.listUsersService();
        return generalResponse(res, {
            statusCode: httpStatus.OK,
            err: null,
            data: userData,
            message: "Users fetched successfully"
        })
    } catch(err){
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            message: "Failed to fetch users"
        })
    }
    }

export const getUserById = async(req, res) => {
    try{
        const { userid } = req.body;
        const userData = await UserService.getUserByIdService(userid);
        return generalResponse(res, {
            statusCode: httpStatus.OK,
            err: null,
            data: userData,
            message: "User fetched successfully"
        })
    } catch(err){
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            message: "Failed to fetch user"
        })
    }
}