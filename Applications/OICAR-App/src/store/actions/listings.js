import ShortListing from '../../models/shortListing';

export const LOAD_CATEGORY_LISTINGS = "LOAD_CATEGORY_LISTINGS";
export const SET_CATEGORY = "SET_CATEGORY";

export const setCategory = categoryID => {
    return {
        type: SET_CATEGORY,
        categoryID: categoryID
    };
}

export const loadCategoryListings = () => {
    return async (dispatch, getState) => {

        const categoryID = getState().listings.categoryID;

        const response = await fetch(`http://192.168.1.6:12335/api/shortListings/${categoryID}`);

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