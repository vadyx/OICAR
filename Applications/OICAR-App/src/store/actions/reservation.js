export const SET_RESERVATION_1 = "SET_RESERVATION_1";
export const COMPLETE_RESERVATION = "COMPLETE_RESERVATION";

export const setReservation1 = (startDate, endDate, phoneNr, totalPrice) => {
    return {
        type: SET_RESERVATION_1,
        startDate: startDate,
        endDate: endDate,
        phoneNr: phoneNr,
        totalPrice: totalPrice
    };
};

export const completeReservation = () => {
    return async (dispatch, getState) => {

        const reservation = getState().reservation;
        const loggedUserID = getState().auth.userId;
        const ownerID = getState().listings.selectedListing.user.id;
        const listingID = getState.listings.selectedListing.id;

        const response = await fetch('http://192.168.1.10:12335/api/reserveListing',
            {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    FromDate: reservation.startDate,
                    ToDate: reservation.endDate,
                    MobileNumber: reservation.phoneNr,
                    Price: reservation.totalPrice,
                    PriceByID: 1,
                    CardNumber: 1234,
                    ReservatorID: loggedUserID,
                    ListingOwnerID: ownerID,
                    ListingID: listingID
                })
            }
        );

        if (!response.ok) {
            throw new Error("New listing not registered!");
        }

        const resData = await response.json();
        const success = resData === "Success";

        dispatch({
            type: COMPLETE_RESERVATION
        });

    };
};