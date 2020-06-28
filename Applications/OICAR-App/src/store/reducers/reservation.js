import { SET_RESERVATION_1 } from "../actions/reservation";

const initialState = {
    startDate: null, 
    endDate: null,
    phoneNr: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_RESERVATION_1:
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate,
                phoneNr: action.phoneNr
            };
        default:
            return state;
    }
};