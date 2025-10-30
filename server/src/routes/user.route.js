import { Router } from "express";
import * as utils from "../utils/utils.js"
import { registerUser, checkUserByEmail, forgetPassword } from "../controllers/user.contollers.js";

const router = Router()

router.post('/create', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["username", "email", "password"]);
}, registerUser);

router.post('/check', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email"]);
}, checkUserByEmail);

router.post('/auth/reset-password', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["email", "newpassword", "confirmpassword"]);
}, forgetPassword);


export default router