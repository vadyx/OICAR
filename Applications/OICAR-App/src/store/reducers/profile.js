import { LOGIN, LOGOUT } from '../actions/auth';
import { UPDATE_PROFILE_IMAGE } from '../actions/profile';
import User from '../../models/user';

const initialState = {
    user: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const loggedUser = new User(
                action.userData.id,
                action.userData.firstName,
                action.userData.lastName,
                action.userData.email,
                action.userData.rating,
                action.userData.registrationDate,
                action.userData.profilePicture
            );

            return {
                ...state,
                user: loggedUser
            };
        case LOGOUT:
            return initialState;
        case UPDATE_PROFILE_IMAGE:

            const updatedUser = new User(
                state.user.id,
                state.user.firstName,
                state.user.lastName,
                state.user.email,
                state.user.rating,
                state.user.registrationDate,
                action.picture
            );

            return {
                ...state,
                user: updatedUser
            };
        default:
            return state;
    }
};