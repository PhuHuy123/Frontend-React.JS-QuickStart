import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders:[],
    roles:[],
    positions:[],
    users:[],
    topDoctors:[],
    allDoctors:[],
    allScheduleTimes:[],
    allRequiredDoctorInfo:[],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // genders
        case actionTypes.FETCH_GENDER_START: 
            let copyState = {...state};
            copyState.isLoading=true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
            state.genders = action.data;
            state.isLoading=false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders =[];
            state.isLoading=false;
            return {
                ...state,
            }
        // positions
        case actionTypes.FETCH_POSITION_START: 
            state.isLoading=true;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS: 
            state.positions = action.data;
            state.isLoading=false;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions =[];
            state.isLoading=false;
            return {
                ...state,
            }
        // roles
        case actionTypes.FETCH_ROLE_START: 
            state.isLoading=true;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS: 
            state.roles = action.data;
            state.isLoading=false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles =[];
            state.isLoading=false;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users= action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users= [];
            return {
                ...state,
            }
        // top doctor
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors= action.doctorsData;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors= [];
            return {
                ...state,
            }
        // all doctor
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors= action.doctorsData;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors= [];
            return {
                ...state,
            }
        // all schedule time
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTimes= action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
            state.allScheduleTimes= [];
            return {
                ...state,
            }
        // all doctor info
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            state.allRequiredDoctorInfo= action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
            state.allRequiredDoctorInfo= [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;
