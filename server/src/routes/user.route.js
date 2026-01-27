import { Router } from "express";
import * as utils from "../utils/utils.js"
import { registerUser, getUserById, listUsers } from "../controllers/user.controller.js";

const router = Router()

router.post('/create', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["username", "email", "password"]);
}, registerUser);

router.get('/list', function(req, res, next){
    utils.reqArgValidation(req, res, next, []);
}, listUsers);

router.post('/getbyid', function(req, res, next){
    utils.reqArgValidation(req, res, next, ["userid"]);
}, getUserById);
export default router