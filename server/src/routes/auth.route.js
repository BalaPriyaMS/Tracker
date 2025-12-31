import { Router } from "express";
import * as utils from "../utils/utils.js"
import {authenticateToken} from "../middleware/authMiddleware.js"
import {  
        checkUserByEmailOrMobile, 
        forgetPassword, 
        resetPassword,
        signInByEmailId, 
        signInByMobileService,
        signOut, 
        changePassword,
        sentInvite,
        verifyInviteToken
        } from "../controllers/auth.controller.js";

const router = Router()

router.post('/user/check', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["contact"]);
}, checkUserByEmailOrMobile);

router.post('/email/login',function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email", "password"]);
}, signInByEmailId);

router.post('/mobile/login', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["mobile"]);
}, signInByMobileService);

router.post('/logout',authenticateToken, signOut);

router.post('/forget-password',authenticateToken,  function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email"]);
}, forgetPassword);

router.post('/reset-password',function (req, res, next) {
    utils.reqArgValidation(req, res, next, ["newpassword", "confirmpassword"]);
}, resetPassword);

router.post("/change-password", function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email", "oldpassword", "newpassword", "confirmpassword"]);
}, changePassword);

router.post('/sent-invite', authenticateToken, function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email"]);
}, sentInvite);

router.post('/verify-invitetoken', authenticateToken, verifyInviteToken);


export default router


