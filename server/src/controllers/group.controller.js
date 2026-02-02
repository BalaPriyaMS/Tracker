import httpStatus from "http-status-codes";
import { generalResponse } from '../utils/utils.js';
import * as GroupService from '../services/group.service.js';
import e from "express";

export const createGroup = async (req, res) => {
    try {
        const { groupname} = req.body;
        const { userid } = req.user; 
        const groupData = await GroupService.createGroupService(groupname, userid);
        return generalResponse(res, {
            statusCode: httpStatus.CREATED,
            err: null,
            data: groupData,
            mssg: "Group created successfully"
        });
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            mssg: "Failed to create group"
        });
    }
}

export const listGroups = async (req, res) => {
    try {
        const groupData = await GroupService.listGroupsService();
        return generalResponse(res, {
            statusCode: httpStatus.OK,
            err: null,
            data: groupData,
            message: "Groups fetched successfully"
        });
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            message: "Failed to fetch groups"
        });
    }
};

export const getGroupById = async (req, res) => {
    try {
        const { groupid } = req.body;
        const groupData = await GroupService.getGroupByIdService(groupid);
        return generalResponse(res, {
            statusCode: httpStatus.OK,
            err: null,
            data: groupData,
            message: "Group fetched successfully"
        });
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            message: "Failed to fetch group"
        });
    }
};

export const updateGroup = async (req, res) => {
    try {
        const { groupid, groupname } = req.body;
        const { userid } = req.user; 
        const groupData = await GroupService.updateGroupService(groupid, groupname, userid);
        return generalResponse(res, {
            statusCode: httpStatus.OK,
            err: null,
            data: groupData,
            message: "Group updated successfully"
        });
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            message: "Failed to update group"
        });
    }
};

export const deleteGroup = async (req, res) => {
    try {
        const { groupid } = req.body;
        await GroupService.deleteGroupService(groupid);
        return generalResponse(res, {
            statusCode: httpStatus.OK,
            err: null,
            data: null,
            message: "Group deleted successfully"
        });
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            message: "Failed to delete group"
        });
    }
};

export const addMemberToGroup = async (req, res) => {
    try {
        const { groupid, userid } = req.body;
        const { userid: addedby } = req.user; 
        const memberData = await GroupService.addMemberToGroupService(groupid, userid, addedby);
        return generalResponse(res, {
            statusCode: httpStatus.CREATED,
            err: null,
            data: memberData,
            message: "Member added to group successfully"
        });
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            mssg: "Failed to add member to group"
        });
    }
};

export const removeMemberFromGroup = async (req, res) => {
    try {
        const { groupid, userid } = req.body;
        const { userid: removedby } = req.user; 
        await GroupService.removeMemberFromGroupService(groupid, userid, removedby);
        return generalResponse(res, {
            statusCode: httpStatus.OK,
            err: null,
            data: null,
            message: "Member removed from group successfully"
        });
    } catch (err) {
        return generalResponse(res, {
            statusCode: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
            err: err.message || "Unexpected error occurred",
            data: null,
            mssg: "Failed to remove member from group"
        });
    }
};