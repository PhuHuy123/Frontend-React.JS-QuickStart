import axios from '../axios';
import * as queryString from 'query-string';

const handleLogin =(email, password) => {
    return axios.post('/api/login',{email, password})
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}
const createNewUserAPI = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserAPI = (id) => {
    return axios.delete('/api/delete-user', {
        data: {id}
    })
}

const editUserAPI = (data) => {
    return axios.put(`/api/update-user`, data)
}
const getAddCodeService = (inputType) => {
    return axios.get(`/api/all-code?type=${inputType}`)
}
const getTopDoctorHomeService = (limit)=>{
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = ()=>{
    return axios.get(`/api/get-all-doctor`)
}
const createInfoDoctorAPI = (data)=>{
    return axios.post(`/api/create-info-doctor`,data)
}
const getDetailInfoDoctor = (idInput)=>{
    return axios.get(`/api/get-detail-doctor-by-id?id=${idInput}`)
}
const bulkCreateSchedule = (data)=>{
    console.log("data",data);
    return axios.post(`/api/bulk-create-schedule`,data)
}
export {
    handleLogin, 
    getAllUsers, 
    createNewUserAPI, 
    deleteUserAPI, 
    editUserAPI, 
    getAddCodeService, 
    getTopDoctorHomeService,
    getAllDoctors,
    createInfoDoctorAPI,
    getDetailInfoDoctor,
    bulkCreateSchedule,
}
