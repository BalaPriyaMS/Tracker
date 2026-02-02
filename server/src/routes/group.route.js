import { Router } from "express";
import * as utils from "../utils/utils.js"
import { createGroup, listGroups, getGroupById, updateGroup, deleteGroup, addMemberToGroup, removeMemberFromGroup  } from "../controllers/group.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router()

router.post('/create', authenticateToken, function(req, res, next){
    utils.reqArgValidation(req, res, next, ["groupname"]);
}, createGroup);

router.get('/list', authenticateToken, listGroups);

router.post('/getbyid', authenticateToken, function(req, res, next){
    utils.reqArgValidation(req, res, next, ["groupid"]);
}, getGroupById);

router.post('/update', authenticateToken, function(req, res, next){
    utils.reqArgValidation(req, res, next, ["groupid", "groupname"]);
}, updateGroup);

router.post('/delete', authenticateToken, function(req, res, next){
    utils.reqArgValidation(req, res, next, ["groupid"]);
}, deleteGroup);

router.post('/addmember', authenticateToken, function(req, res, next){      
    utils.reqArgValidation(req, res, next, ["groupid", "userid"]);
}, addMemberToGroup);

router.post('/removemember', authenticateToken, function(req, res, next){
    utils.reqArgValidation(req, res, next, ["groupid", "userid"]);
}, removeMemberFromGroup);

export default router