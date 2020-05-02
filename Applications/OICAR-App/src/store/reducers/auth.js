import { REGISTRATION, LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
    registrationSuccessful: null,
    isLoggedIn: false,
    userId: null
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
                user: action.userData.id
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};