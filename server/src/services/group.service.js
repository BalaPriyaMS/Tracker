import {queryReturn} from "../config/mysqlconfig.js"
import { logger } from "../common/logger.js";
import { v4 as uuidv4 } from 'uuid';

export const createGroupService = async(groupname, createdby) => {
    try{

        // check group already existing
        const checkQuery = "SELECT id FROM `groups` WHERE name = ?";
        const existingGroups = await queryReturn(checkQuery, [groupname]);

        if(existingGroups.length > 0){
            const err = new Error("Group name already exists");
            err.statusCode = 400;
            throw err;
        }
        
        const id = uuidv4();
        const createdat = Date.now();
        const insertQuery = "INSERT INTO `groups` (id, name, createdby, createdat,updatedby, updatedat) VALUES (?, ?, ?, ?, ?, ?) ";
        const result = await queryReturn(insertQuery, [id, groupname, createdby, createdat, createdby, createdat]);

        return {
            groupid:id,
            groupname,
            createdby,
            createdat,
            updatedat: createdat
        }

    } catch(err){
        logger.error("Error in createGroupService:", err);
        throw err;
    }
}

export const listGroupsService = async() => {
    try{
        const query = "SELECT id AS groupid, name AS groupname, createdby, createdat, updatedat FROM `groups`";
        const rows = await queryReturn(query);
        return rows;
        
    } catch(err){
        logger.error("Error in listGroupsService:", err);
        throw err;
    }
}

export const getGroupByIdService = async(groupid) => {
    try{
        const query = "SELECT id AS groupid, name AS groupname, createdby, createdat, updatedat FROM `groups` WHERE id = ?";
        const rows = await queryReturn(query, [groupid]);
        if(rows.length === 0){
            const err = new Error("Group not found");
            err.statusCode = 404;
            throw err;
        }
        return rows;
    } catch(err){
        logger.error("Error in getGroupByIdService:", err);
        throw err;
    }
}

export const updateGroupService = async(groupid, groupname, updatedby) => {
    try{
        const updatedat = Date.now();

        // check group name already existing
        const checkQuery = "SELECT id FROM `groups` WHERE name = ? AND id != ?";
        const existingGroups = await queryReturn(checkQuery, [groupname, groupid]);

        if(existingGroups.length > 0){
            const err = new Error("Group name already exists");
            err.statusCode = 400;
            throw err;
        }       

        const updateQuery = "UPDATE `groups` SET name = ?, updatedby = ?, updatedat = ? WHERE id = ?";
        const result = await queryReturn(updateQuery, [groupname, updatedby, updatedat, groupid]);  
        if(result.affectedRows === 0){
            const err = new Error("Group not found");                
            err.statusCode = 404;
            throw err;
        }
        return {
            groupid,
            groupname,
            updatedby,
            updatedat
        };
    } catch(err){
        logger.error("Error in updateGroupByIdService:", err);
        throw err;
    }
}

export const deleteGroupService = async(groupid) => {
    try{
        const deleteQuery = "DELETE FROM `groups` WHERE id = ?";
        const result = await queryReturn(deleteQuery, [groupid]);
        if(result.affectedRows === 0){
            const err = new Error("Group not found or already deleted");                
            err.statusCode = 404;
            throw err;
        }
        return;
    }   catch(err){     
        logger.error("Error in deleteGroupByIdService:", err);  
        throw err;
    }
}

export const addMemberToGroupService = async(groupid, userid, addedby) => {
    try{

        //check if member already in group
        const checkQuery = "SELECT id FROM groupmembers WHERE groupid = ? AND userid = ?";
        const existingMembers = await queryReturn(checkQuery, [groupid, userid]);
        
        if(existingMembers.length > 0){
            const err = new Error("User is already a member of the group");
            err.statusCode = 400;
            throw err;
        }

        //get role name
        const roleQuery = "SELECT roleid FROM roles WHERE rolename = ?";
        const roleRows = await queryReturn(roleQuery, ["viewer"]);

        if(roleRows.length === 0){
            const err = new Error("Role not found");
            err.statusCode = 404;
            throw err;
        }   
        const roleid = roleRows[0].roleid;
        const id = uuidv4();
        const createdat = Date.now();
        const insertQuery = "INSERT INTO groupmembers (id, groupid, userid, roleid, addedby, createdat, updatedby, updatedat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await queryReturn(insertQuery, [id, groupid, userid, roleid, addedby, createdat, addedby, createdat]);
        return {
            memberid: id,
            groupid,
            userid,
            roleid,
            addedby,
            createdat,
        }
    } catch(err){
        logger.error("Error in addMemberToGroupService:", err);
        throw err;
    }
};

export const removeMemberFromGroupService = async(groupid, userid) => {
    try{
        const deleteQuery = "DELETE FROM groupmembers WHERE groupid = ? AND userid = ?";
        const result = await queryReturn(deleteQuery, [groupid, userid]);
        if(result.affectedRows === 0){
            const err = new Error("Member not found in group");                
            err.statusCode = 404;
            throw err;
        }
        return;
    }   catch(err){     
        logger.error("Error in removeMemberFromGroupService:", err);  
        throw err;
    }
};