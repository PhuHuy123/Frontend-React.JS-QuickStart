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
export {handleLogin, getAllUsers, createNewUserAPI, deleteUserAPI, editUserAPI, getAddCodeService}
