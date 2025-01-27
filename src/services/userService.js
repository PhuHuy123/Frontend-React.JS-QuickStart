import axios from "../axios";
import * as queryString from "query-string";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};
const createNewUserAPI = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const deleteUserAPI = (id) => {
  return axios.delete("/api/delete-user", {
    data: { id },
  });
};

const editUserAPI = (data) => {
  return axios.put(`/api/update-user`, data);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/all-code?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctor`);
};
const createInfoDoctorAPI = (data) => {
  return axios.post(`/api/create-info-doctor`, data);
};
const getDetailInfoDoctor = (idInput) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${idInput}`);
};
///
const bulkCreateSchedule = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorALL = (doctorId) => {
  return axios.get(
    `/api/get-Schedule-doctor-all?doctorId=${doctorId}`
  );
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-Schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const deleteSchedule =(id)=>{
  return axios.delete("/api/delete-schedule", {
    data: { id },
  });
}
///
const getExtraInfoDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};
const postVerifyPaypal = (data) => {
  return axios.post(`/api/verify-paypal`, data);
};
const getUpdatePassword = (data) => {
  return axios.post(`/api/update-password`, data);
};
const handleCheckEmail = (data) => {
  return axios.post(`/api/check-email`, data);
};
const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
const getAllSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};
const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};
const deleteSpecialtyById =(id)=>{
  return axios.delete("/api/delete-specialty", {
    data: { id },
  });
}
const editSpecialty = (data) => {
  return axios.put(`/api/update-specialty`, data);
};
const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};
const getAllClinic = () => {
  return axios.get(`/api/get-clinic`);
};
const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
const deleteClinicById =(id)=>{
  return axios.delete("/api/delete-clinic", {
    data: { id },
  });
}
const editClinic = (data) => {
  return axios.put(`/api/update-clinic`, data);
};
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postCancelAppointment = (data) => {
  return axios.post(`/api/cancel-appointment`,data);
};
const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};
// thống kê covid 19
const getCountriesCovid19 = (data) => {
  return axios.get(`https://api.covid19api.com/countries`);
};
const getReportByCountry = (country) => {
  return axios.get(`https://api.covid19api.com/dayone/country/${country}`);
};

// posts
const createNewPosts = (data) => {
  return axios.post(`/api/create-new-posts`, data);
};
const getAllPosts = () => {
  return axios.get(`/api/get-posts`);
};
const getDetailPostsById = (id) => {
  return axios.get(`/api/get-detail-posts-by-id?id=${id}`);
};
const deletePostById =(id)=>{
  return axios.delete("/api/delete-post", {
    data: { id },
  });
}
const editPost = (data) => {
  return axios.put(`/api/update-post`, data);
};
const getALLBooking = (id) => {
  return axios.get(`/api/get-booking?id=${id}`);
};
const getBookingSingleId = (id) => {
  return axios.get(`/api/booking-single-by-id?id=${id}`);
};
const getCancelBook = (id) => {
  return axios.get(`/api/cancel-book?id=${id}`);
};
const postReCapTCha = (data) => {
  return axios.post(
    `/api/recaptcha`, data
  );
};
// search
const getSearchApi = (data) => {
  return axios.get(
    `/api/search?name=${data}`
  );
};

const resetTokenPassword = (data) => {
  return axios.post(`/api/reset-token-password`, data);
};

const createExamination = (data) => {
  return axios.post(`/api/create-new-examination`, data);
};

const getAllExaminationById = (id) => {
  return axios.get(`/api/get-all-examination-byId?id=${id}`);
};

const deleteExaminationById = (id) => {
  return axios.delete(`/api/delete-examination-byId`, {
    data: { id },
  });
};

const postDoctorForward = (data) => {
  return axios.post(`/api/post-doctor-forward`,data);
};

const postSupport = (data) => {
  return axios.post(`https://sheet.best/api/sheets/32c1f043-19b1-4614-a200-9e12966429e6`,data);
};
export {
  postReCapTCha,
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
  getScheduleDoctorALL,
  getScheduleDoctorByDate,
  deleteSchedule,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  postBookAppointment,
  postVerifyBookAppointment,
  postVerifyPaypal,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  deleteSpecialtyById,
  editSpecialty,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  deleteClinicById,
  editClinic,
  getAllPatientForDoctor,
  postSendRemedy,
  getUpdatePassword,
  handleCheckEmail,
  getCountriesCovid19,
  getReportByCountry,
  createNewPosts,
  getAllPosts,
  getDetailPostsById,
  deletePostById,
  editPost,
  getALLBooking,
  getBookingSingleId,
  getCancelBook,
  getSearchApi,
  resetTokenPassword,
  postCancelAppointment,
  createExamination,
  postDoctorForward,
  getAllExaminationById,
  deleteExaminationById,
  postSupport,
};
