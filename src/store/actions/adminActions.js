import actionTypes from './actionTypes';
import {getAddCodeService, createNewUserAPI, getAllUsers, deleteUserAPI} from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
    return async(dispatch, getState)=>{
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAddCodeService("GENDER")
            if(res && res.errCode ===0){
                dispatch(fetchGenderSuccess(res.data));
            }
            else{
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderFailed error: " ,e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
 
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async(dispatch, getState)=>{
        try {
            dispatch({type: actionTypes.FETCH_POSITION_START})
            let res = await getAddCodeService("POSITION")
            if(res && res.errCode ===0){
                dispatch(fetchPositionSuccess(res.data));
            }
            else{
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionFailed error: " ,e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
 
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
 
export const fetchRoleStart = () => {
    return async(dispatch, getState)=>{
        try {
            dispatch({type: actionTypes.FETCH_ROLE_START})
            let res = await getAddCodeService("ROLE")
            if(res && res.errCode ===0){
                dispatch(fetchRoleSuccess(res.data));
            }
            else{
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleFailed error: " ,e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
 
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
 // create user
export const createNewUser = (data) => {
    return async(dispatch, getState)=>{
        try {
            let res = await createNewUserAPI(data);
            if(res && res.errCode ===0){
                toast.success("Created user successfully");
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else{
                toast.error("Failed to create user")
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log("createUserFailed error: " ,e)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
 
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

export const fetchAllUserStart = () => {
    return async(dispatch, getState)=>{
        try {
            let res = await getAllUsers("ALL")
            if(res && res.errCode ===0){
                // reverse(): đảo ngược vị trí user
                dispatch(fetchAllUseSuccess(res.users.reverse()));
            }
            else{
                dispatch(fetchAllUseFailed());
            }
        } catch (e) {
            dispatch(fetchAllUseFailed());
            console.log("fetchAllUseFailed error: " ,e)
        }
    }
}

export const fetchAllUseSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
 
export const fetchAllUseFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})
 // delete user
export const deleteUser = (id) => {
    return async(dispatch, getState)=>{
        try {
            let res = await deleteUserAPI(id);
            if(res && res.errCode ===0){
                toast.success("Delete user successfully");
                dispatch(deleteUserSuccess(id));
                dispatch(fetchAllUserStart());
            }
            else{
                toast.error('Error delete user!');
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log("deleteUserFailed error: " ,e)
        }
    }
}

export const deleteUserSuccess = (id) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    idUser:id
})
 
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})
