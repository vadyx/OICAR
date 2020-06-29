import ShortListing from '../../models/shortListing';
import Reservation from '../../models/reservation';
import User from '../../models/user';

export const SET_RESERVATION_1 = "SET_RESERVATION_1";
export const COMPLETE_RESERVATION = "COMPLETE_RESERVATION";
export const LOAD_GIVEN_RESERVATIONS = "LOAD_GIVEN_RESERVATIONS";
export const LOAD_MADE_RESERVATIONS = "LOAD_MADE_RESERVATIONS";
export const LOAD_SELECTED_USER_RESERVATION = "LOAD_SELECTED_USER_RESERVATION";
export const LOAD_SELECTED_RENTER_RESERVATION = "LOAD_SELECTED_RENTER_RESERVATION";
export const SET_RESERVATION_RATING = "SET_RESERVATION_RATING";

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
        const listingID = getState().listings.selectedListing.id;

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

export const loadGivenReservations = () => {
    return async (dispatch, getState) => {

        const userID = getState().profile.user.id;

        let response = await fetch(`http://192.168.1.10:12335/api/myListingsReserved/${userID}`);

        if (!response.ok) {
            throw new Error("Given reservations not loaded");
        }

        const resData = await response.json();
        const loadedReservations = [];

        for (const index in resData) {
            loadedReservations.push({
                reservationID: resData.ReservationID,
                listing: new ShortListing(
                    resData[index].IDListing,
                    resData[index].Title,
                    resData[index].Category,
                    resData[index].Price,
                    resData[index].PriceBy,
                    resData[index].Rating,
                    resData[index].Image,
                    resData[index].VehicleManufacturer,
                    resData[index].VehicleModel
                )
            });
        }

        dispatch({
            type: LOAD_GIVEN_RESERVATIONS,
            givenReservations: loadedReservations
        });
    };
};

export const loadMadeReservations = () => {
    return async (dispatch, getState) => {

        const userID = getState().profile.user.id;

        let response = await fetch(`http://192.168.1.10:12335/api/myReservations/${userID}`);

        if (!response.ok) {
            throw new Error("Made reservations not loaded");
        }

        const resData = await response.json();
        const loadedReservations = [];

        for (const index in resData) {
            loadedReservations.push({
                reservationID: resData[index].ReservationID,
                listing: new ShortListing(
                    resData[index].IDListing,
                    resData[index].Title,
                    resData[index].Category,
                    resData[index].Price,
                    resData[index].PriceBy,
                    resData[index].Rating,
                    resData[index].Image,
                    resData[index].VehicleManufacturer,
                    resData[index].VehicleModel
                )
            });
        }

        dispatch({
            type: LOAD_MADE_RESERVATIONS,
            madeReservations: loadedReservations
        });
    };
};

export const loadSelectedReservation = (reservationID, mode) => {
    return async (dispatch, getState) => {

        const userID = getState().profile.user.id;

        let response = await fetch(`http://192.168.1.10:12335/api/reservation/${reservationID}/${userID}`);

        if (!response.ok) {
            throw new Error("Selected reservation not loaded");
        }

        const resData = await response.json();

        const loadedReservation = new Reservation(
            resData.ReservationNumber,
            resData.Title,
            resData.VehicleManufacturer,
            resData.VehicleModel,
            resData.Image,
            resData.Price,
            resData.Rating,
            resData.DateFrom,
            resData.DateTo,
            resData.UserInfo.MobileNumber,
            {
                lat: resData.LocationX,
                lng: resData.LocationY,
            },
            new User(
                resData.UserInfo.IDUser,
                resData.UserInfo.FirstName,
                resData.UserInfo.Lastname,
                resData.UserInfo.Email,
                "",
                "",
                resData.UserInfo.ProfileImage,
                ""
            )
        );

        if (mode === 1) {
            dispatch({
                type: LOAD_SELECTED_USER_RESERVATION,
                selectedReservation: loadedReservation
            });
        } else if (mode === 2) {
            dispatch({
                type: LOAD_SELECTED_RENTER_RESERVATION,
                selectedReservation: loadedReservation
            });
        }
        
    };
};

export const setReservationRating = (rating) => {
    return async (dispatch, getState) => {

        const reservation = getState().reservation.selectedUserReservation;
        const renterID = getState().reservation.selectedUserReservation.user.id;
        const loggedUserID = getState().auth.userId;

        const response = await fetch(`http://192.168.1.10:12335/api/rate/${reservation.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    UserRaterID: loggedUserID,
                    RatedUserID: renterID,
                    RatingValue: rating
                })
            }
        );

        if (!response.ok) {
            throw new Error("New listing not registered!");
        }

        const resData = await response.json();
        const success = resData === "Success";

        const updatedReservation = new Reservation(
            reservation.id,
            reservation.title,
            reservation.manufacturer,
            reservation.model,
            reservation.Image,
            reservation.price,
            rating,
            reservation.startDate,
            reservation.endDate,
            reservation.phoneNr,
            reservation.coordinates,
            reservation.user
        );

        dispatch({
            type: SET_RESERVATION_RATING,
            updatedReservation: updatedReservation
        });
    };
};