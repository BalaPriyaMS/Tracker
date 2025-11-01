import { Router } from "express";
import * as utils from "../utils/utils.js"
import { registerUser } from "../controllers/user.controller.js";

const router = Router()

router.post('/create', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["username", "email", "password"]);
}, registerUser);

export default router