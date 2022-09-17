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
const getAllCodeService = (inputType) => {
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
    return axios.post(`/api/bulk-create-schedule`,data)
}
const getScheduleDoctorByDate = (doctorId, date)=>{
    return axios.get(`/api/get-Schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInfoDoctorById = (doctorId)=>{
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId)=>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postBookAppointment = (data)=>{
    return axios.post(`/api/patient-book-appointment`,data)
}
const postVerifyBookAppointment = (data)=>{
    return axios.post(`/api/verify-book-appointment`,data)
}
const getUpdatePassword = (data)=>{
    return axios.post(`/api/update-password`,data)
}
const handleCheckEmail = (data)=>{
    return axios.post(`/api/check-email`,data)
}
const createNewSpecialty = (data)=>{
    return axios.post(`/api/create-new-specialty`,data)
}
const getAllSpecialty = ()=>{
    return axios.get(`/api/get-specialty`)
}
const getDetailSpecialtyById = (data)=>{
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const createNewClinic = (data)=>{
    return axios.post(`/api/create-new-clinic`,data)
}
const getAllClinic = ()=>{
    return axios.get(`/api/get-clinic`)
}
const getDetailClinicById = (data)=>{
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data)=>{
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data)=>{
    return axios.post(`/api/send-remedy`,data)
}

// thống kê covid 19
const getCountriesCovid19 = (data)=>{
    return axios.get(`https://api.covid19api.com/countries`)
}
const getReportByCountry = (country)=>{
    return axios.get(`https://api.covid19api.com/dayone/country/${country}`)
}
export {
    handleLogin, 
    getAllUsers, 
    createNewUserAPI, 
    deleteUserAPI, 
    editUserAPI, 
    getAllCodeService, 
    getTopDoctorHomeService,
    getAllDoctors,
    createInfoDoctorAPI,
    getDetailInfoDoctor,
    bulkCreateSchedule,
    getScheduleDoctorByDate,
    getExtraInfoDoctorById,
    getProfileDoctorById,
    postBookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty, getDetailSpecialtyById,
    createNewClinic, getAllClinic, getDetailClinicById,
    getAllPatientForDoctor,
    postSendRemedy,
    getUpdatePassword,
    handleCheckEmail,

    getCountriesCovid19,
    getReportByCountry
}
