import * as Location from 'expo-location';

import ShortListing from '../../models/shortListing';
import FullListing from '../../models/fullListing';
import Vehicle from '../../models/vehicle';
import User from '../../models/user';

export const CLEAR_LIST = "CLEAR_LIST";
export const SET_CATEGORY = "SET_CATEGORY";
export const LOAD_CATEGORY_LISTINGS = "LOAD_CATEGORY_LISTINGS";
export const LOAD_HIGHLIGHTED_LISTINGS = "LOAD_HIGHLIGHTED_LISTINGS";
export const LOAD_SELECTED_LISTING = "LOAD_SELECTED_LISTING";
export const FILTER_LISTINGS = "FILTER_LISTINGS";

export const clearPreviousList = () => {
    return {
        type: CLEAR_LIST
    };
};

export const setCategory = categoryID => {
    return {
        type: SET_CATEGORY,
        categoryID: categoryID
    };
};

export const loadCategoryListings = (locationPermission) => {
    return async (dispatch, getState) => {

        const categoryID = getState().listings.categoryID;
        let response;

        if (locationPermission) {
            try {
                const currentPos = await Location.getCurrentPositionAsync({
                  timeout: 5000,
                  enableHighAccuracy: true
                });

                response = await fetch(`http://192.168.1.10:12335/api/shortListings/${categoryID}/${currentPos.coords.latitude}/${currentPos.coords.longitude}/`);
            } catch (error) {
                //error logic
            }
        } else {
            response = await fetch(`http://192.168.1.10:12335/api/shortListings/${categoryID}`);
        }

        if (!response.ok) {
            throw new Error("Listings not loaded");
        }

        const resData = await response.json();
        const loadedListings = [];
        const listingsToShow = [];

        let tempListing;
        for (const index in resData) {
            tempListing = new ShortListing(
                resData[index].IDListing,
                resData[index].Title,
                resData[index].Category,
                resData[index].Price,
                resData[index].PriceBy,
                resData[index].Rating,
                resData[index].Image,
                resData[index].VehicleManufacturer,
                resData[index].VehicleModel
            );

            listingsToShow.length < 10 ? listingsToShow.push(tempListing) : loadedListings.push(tempListing);
        }

        dispatch({
            type: LOAD_CATEGORY_LISTINGS,
            listings: loadedListings,
            shownListings: listingsToShow
        });
    };
};

export const loadHighlightedListings = () => {
    return async (dispatch) => {

        let response = await fetch(`http://192.168.1.10:12335/api/highlightedListings`);

        if (!response.ok) {
            throw new Error("Listings not loaded");
        }

        const resData = await response.json();
        const loadedHighlightedListings = [];

        for (const index in resData) {
            loadedHighlightedListings.push(new ShortListing(
                resData[index].IDListing,
                resData[index].Title,
                resData[index].Category,
                resData[index].Price,
                resData[index].PriceBy,
                resData[index].Rating,
                resData[index].Image,
                resData[index].VehicleManufacturer,
                resData[index].VehicleModel
            ));
        }

        dispatch({
            type: LOAD_HIGHLIGHTED_LISTINGS,
            highlightedListings: loadedHighlightedListings
        });
    };
}

export const load10MoreListings = () => {
    return async (dispatch, getState) => {

        const availableListings = getState().listings.listings;
        const currentShown = getState().listings.shownListings;

        if (availableListings.length > 0 && availableListings.length < 11) {
            currentShown.push(...availableListings);
            availableListings.length = 0;
        } else {
            const nextListings = availableListings.slice(0, 10);
            currentShown.push(...nextListings);
            availableListings.splice(0, 10);
        }
    };
};

export const loadSelectedListing = id => {
    return async (dispatch) => {

        const response = await fetch(`http://192.168.1.10:12335/api/getListing/${id}`);

        if (!response.ok) {
            throw new Error("Listings not loaded");
        }

        const resData = await response.json();

        const resImages = [];
        for (const index in resData.Images) {
            resImages.push(`data:image/jpg;base64,${resData.Images[index]}`);
        }

        const loadedListing = new FullListing(
            resData.IDListing,
            resData.Title,
            resData.ListingDescription,
            resData.Price,
            resData.PriceBy,
            resData.AvailableFromDate,
            resData.AvailableToDate,
            resData.LocationCoordinateX,
            resData.LocationCoordinateY,
            resImages,
            new Vehicle(
                resData.Vehicle.Category,
                resData.Vehicle.SubCategory,
                resData.Vehicle.VehicleManufacturer,
                resData.Vehicle.VehicleModel,
                resData.Vehicle.ManufacturingYear,
                resData.Vehicle.FuelType,
                resData.Vehicle.DriveType,
                resData.Vehicle.GearShiftType,
                resData.Vehicle.Kilometers,
                resData.Vehicle.EnginePower,
                resData.Vehicle.Accessories,
            ),
            new User(
                resData.User.IDUser,
                resData.User.FirstName,
                resData.User.LastName,
                resData.User.Email,
                resData.User.Rating,
                resData.User.RegistrationDate,
                resData.User.ProfileImage,
            )
        );

        dispatch({
            type: LOAD_SELECTED_LISTING,
            selectedListing: loadedListing
        });
    };
};

export const filter = (manufacturer) => {
    return async (dispatch, getState) => {

        const listings = getState().listings.listings;

        const filteredListings = await listings.filter(v => v.manufacturer === manufacturer);
        
        console.log(filteredListings.length);

        const listingsToShow = [];

        for (const index in filteredListings) {
            listingsToShow.length < 10 ? listingsToShow.push(filteredListings[index]) : "";
        }

        dispatch({
            type: FILTER_LISTINGS,
            listings: filteredListings,
            shownListings: listingsToShow
        });

    }
};