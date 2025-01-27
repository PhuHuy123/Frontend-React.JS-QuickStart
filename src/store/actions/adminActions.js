import actionTypes from './actionTypes';
import {getAllCodeService, createNewUserAPI, 
        getAllUsers, deleteUserAPI, editUserAPI, 
        getTopDoctorHomeService, getAllDoctors,
        createInfoDoctorAPI, getAllSpecialty, getAllClinic} from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
    return async(dispatch, getState)=>{
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER")
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
            let res = await getAllCodeService("POSITION")
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
            let res = await getAllCodeService("ROLE")
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
            toast.error('Error delete user!');
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

// edit user
export const editUser = (data) => {
    return async(dispatch, getState)=>{
        try {
            let res = await editUserAPI(data);
            if(res && res.errCode ===0){
                toast.success("Update user successfully");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }
            else{
                toast.error("Failed to edit user")
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Failed to edit user")
            dispatch(editUserFailed());
            console.log("editUserFailed error: " ,e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})
 
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})
// Top DOCTOR
export const fetchTopDoctors = () => {
    return async(dispatch, getState)=>{
        try {
            let res = await getTopDoctorHomeService('8')
            if(res && res.errCode ===0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    doctorsData: res.data
                });
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            });
            console.log("fetchTopDoctorsFailed error: " ,e)
        }
    }
}

// all doctors
export const fetchAllDoctors = () => {
    return async(dispatch, getState)=>{
        try {
            let res = await getAllDoctors()
            if(res && res.errCode ===0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    doctorsData: res.data
                });
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            });
            console.log("fetchAllDoctorsFailed error: " ,e)
        }
    }
}
// create info doctor
export const createInfoDoctor = (data) => {
    return async(dispatch, getState)=>{
        try {
            let res = await createInfoDoctorAPI(data)
            if(res && res.errCode ===0){
                toast.success("Create info doctor successfully");
                dispatch({
                    type: actionTypes.CREATE_INFO_DOCTOR_SUCCESS,
                });
            }
            else{
                toast.error(`${res.message}`)
                dispatch({
                    type: actionTypes.CREATE_INFO_DOCTOR_FAILED
                });
            }
        } catch (e) {
            toast.error("Failed to create info doctor")
            dispatch({
                type: actionTypes.CREATE_INFO_DOCTOR_FAILED
            });
            console.log("CREATE_INFO_DOCTOR_FAILED error: " ,e)
        }
    }
}
// all schedule time
export const fetchAllScheduleTime = () => {
    return async(dispatch, getState)=>{
        try {
            let res = await getAllCodeService('TIME')
            if(res && res.errCode ===0){
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                });
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED
                });
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED
            });
            console.log("fetchAllDoctorsFailed error: " ,e)
        }
    }
}
// all doctors info
export const fetchRequiredDoctorInfo = () => {
    return async(dispatch, getState)=>{
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START})
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if( resPrice && resPrice.errCode ===0 && 
                resProvince && resProvince.errCode ===0 &&
                resPayment && resPayment.errCode ===0 &&
                resSpecialty && resSpecialty.errCode ===0 &&
                resClinic && resClinic.errCode ===0
                ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data));
            }
            else{
                dispatch(fetchRequiredDoctorInfoFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInfoFailed());
            console.log("fetchRequiredDoctorInfoFailed error: " ,e)
        }
    }
}
export const fetchRequiredDoctorInfoSuccess = (roleData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: roleData
})
 
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})
