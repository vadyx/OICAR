import { REGISTRATION, LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
    isLoggedIn: false,
    registrationSuccessful: null
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
                isLoggedIn: action.isLoggedIn
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};