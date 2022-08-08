import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders:[],
    roles:[],
    positions:[],
    users:[],
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
        default:
            return state;
    }
}

export default adminReducer;
