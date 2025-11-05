import { Router } from "express";
import * as utils from "../utils/utils.js"
import {authenticateToken} from "../middleware/authMiddleware.js"
import {  
        checkUserByEmailOrMobile, 
        forgetPassword, 
        signInByEmailId, 
        signInByMobileService, 
        changePassword,
        sentInvite
        } from "../controllers/auth.controller.js";

const router = Router()

router.post('/usercheck', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["contact"]);
}, checkUserByEmailOrMobile);

router.post('/email/login',function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email", "password"]);
}, signInByEmailId);

router.post('/forget-password', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email", "newpassword", "confirmpassword"]);
}, forgetPassword);

router.post("/change-password", function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email", "oldpassword", "newpassword", "confirmpassword"]);
}, changePassword);

router.post('/mobile/login', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["mobile"]);
}, signInByMobileService);
export default router

router.post('/sent-invite', authenticateToken, function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email"]);
}, sentInvite);