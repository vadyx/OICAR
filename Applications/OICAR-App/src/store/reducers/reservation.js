import { SET_RESERVATION_1, COMPLETE_RESERVATION, LOAD_GIVEN_RESERVATIONS, LOAD_MADE_RESERVATIONS, LOAD_SELECTED_USER_RESERVATION, LOAD_SELECTED_RENTER_RESERVATION, SET_RESERVATION_RATING } from "../actions/reservation";

const initialState = {
    startDate: null, 
    endDate: null,
    phoneNr: null,
    totalPrice: null,
    madeReservations: [],
    givenReservations: [],
    selectedUserReservation: null,
    selectedRenterReservation: null
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
            return {
                ...state,
                startDate: null, 
                endDate: null,
                phoneNr: null,
                totalPrice: null
            };
        case LOAD_GIVEN_RESERVATIONS:
            return {
                ...state,
                givenReservations: action.givenReservations
            };
        case LOAD_MADE_RESERVATIONS:
            return {
                ...state,
                madeReservations: action.madeReservations
            };
        case LOAD_SELECTED_USER_RESERVATION:
            return {
                ...state,
                selectedUserReservation: action.selectedReservation
            };
        case LOAD_SELECTED_RENTER_RESERVATION:
            return {
                ...state,
                selectedRenterReservation: action.selectedReservation
            };
        case SET_RESERVATION_RATING:
            return {
                ...state,
                selectedUserReservation: action.updatedReservation
            };
        default:
            return state;
    }
};