import { REGISTRATION, LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
    registrationSuccessful: null,
    isLoggedIn: false,
    userId: null, 
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION:
            return {
                ...state,
                registrationSuccessful: action.registrationSuccessful
            };
        case LOGIN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                userId: action.userData.id,
                user: action.userData
            };
        case LOGOUT:
            state = initialState;
            return state;
        default:
            return state;
    }
};