import { LOGIN, LOGOUT } from '../actions/auth';
import { UPDATE_PROFILE_IMAGE, UPLOAD_ID, UPLOAD_DRIVER_LICENSE, LOAD_USER_LISTINGS, CLEAR_USER_LISTINGS } from '../actions/profile';

import User from '../../models/user';
import DocumentVerification from '../../models/documentVerification';

const initialState = {
    user: null,
    listings: null
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
                new DocumentVerification (
                    action.idVerification,
                    action.idExpirationDate,
                    state.user.documentVerification.isDLVerified,
                    state.user.documentVerification.dlExpirationDate
                )
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
                new DocumentVerification (
                    state.user.documentVerification.isIDVerified,
                    state.user.documentVerification.idExpirationDate,
                    action.licenseVerification,
                    action.licenseExpirationDate
                )
            );

            return {
                ...state,
                user: updatedUser
            };
            
        case CLEAR_USER_LISTINGS:
            return {
                ...state,
                listings: null
            };

        case LOAD_USER_LISTINGS:
            return {
                ...state,
                listings: action.listings
            }

        default:
            return state;
    }
};