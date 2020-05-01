import { REGISTRATION, LOGIN, LOGOUT } from '../actions/auth';
import User from '../../models/user';

const initialState = {
    registrationSuccessful: null,
    isLoggedIn: false,
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
            const loggedUser = new User(
                action.userData.id,
                action.userData.firstName,
                action.userData.lastName,
                action.userData.email,
                action.userData.rating,
                action.userData.registrationDate,
                action.userData.profileImage
            );

            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                user: loggedUser
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};