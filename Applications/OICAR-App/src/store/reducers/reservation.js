import { SET_RESERVATION_1, COMPLETE_RESERVATION } from "../actions/reservation";

const initialState = {
    startDate: null, 
    endDate: null,
    phoneNr: null,
    totalPrice: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_RESERVATION_1:
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate,
                phoneNr: action.phoneNr,
                totalPrice: action.totalPrice
            };
        case COMPLETE_RESERVATION:
            return initialState;
        default:
            return state;
    }
};