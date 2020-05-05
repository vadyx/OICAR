import { LOGIN, LOGOUT } from '../actions/auth';
import { UPDATE_PROFILE_IMAGE, UPLOAD_ID, UPLOAD_DRIVER_LICENSE } from '../actions/profile';
import User from '../../models/user';

const initialState = {
    user: null
};

export default (state = initialState, action) => {

    let updatedUser;

    switch (action.type) {
        case LOGIN:
            const loggedUser = new User(
                action.userData.id,
                action.userData.firstName,
                action.userData.lastName,
                action.userData.email,
                action.userData.rating,
                action.userData.registrationDate,
                action.userData.profilePicture,
                action.userData.documentVerification
            );

            return {
                ...state,
                user: loggedUser
            };
        case LOGOUT:
            return initialState;

        case UPDATE_PROFILE_IMAGE:

            updatedUser = new User(
                state.user.id,
                state.user.firstName,
                state.user.lastName,
                state.user.email,
                state.user.rating,
                state.user.registrationDate,
                action.picture,
                state.user.documentVerification
            );

            return {
                ...state,
                user: updatedUser
            };

        case UPLOAD_ID:

            updatedUser = new User(
                state.user.id,
                state.user.firstName,
                state.user.lastName,
                state.user.email,
                state.user.rating,
                state.user.registrationDate,
                state.user.profilePicture,
                {
                    isIDVerified: action.idVerification,
                    isDLVerified: state.user.documentVerification.isDLVerified
                }
            );

            return {
                ...state,
                user: updatedUser
            };

        case UPLOAD_DRIVER_LICENSE:

            updatedUser = new User(
                state.user.id,
                state.user.firstName,
                state.user.lastName,
                state.user.email,
                state.user.rating,
                state.user.registrationDate,
                state.user.profilePicture,
                {
                    isIDVerified: state.user.isIDVerified,
                    isDLVerified: action.licenseVerification
                }
            );

            return {
                ...state,
                user: updatedUser
            };
            
        default:
            return state;
    }
};