import { REGISTRATION, LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
    isSuccessful: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION:
            return {
                ...state,
                isSuccessful: action.isSuccessful
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};