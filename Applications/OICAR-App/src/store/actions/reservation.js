export const SET_RESERVATION_1 = "SET_RESERVATION_1";

export const setReservation1 = (startDate, endDate, phoneNr) => {
    return {
        type: SET_RESERVATION_1,
        startDate: startDate,
        endDate: endDate,
        phoneNr: phoneNr
    };
}