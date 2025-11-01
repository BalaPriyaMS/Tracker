import { Router } from "express";
import * as utils from "../utils/utils.js"
import { checkUserByEmailOrMobile, forgetPassword, signInByEmailId, signInByMobileService, changePassword } from "../controllers/auth.controller.js";

const router = Router()

router.post('/check', function(req, res, next){
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