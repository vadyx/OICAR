import ShortListing from '../../models/shortListing';

export const UPDATE_PROFILE_IMAGE = "UPDATE_PROFILE_IMAGE";
export const UPLOAD_ID = "UPLOAD_ID";
export const UPLOAD_DRIVER_LICENSE = "UPLOAD_DRIVER_LICENSE";
export const CLEAR_USER_LISTINGS = "CLEAR_USER_LISTINGS";
export const LOAD_USER_LISTINGS = "LOAD_USER_LISTINGS";

export const updateProfilePicture = (id, picture) => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.10:12335/api/user/setProfileImage/${id}`,
            {
                method: 'PUT',               
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(picture)
            }
        );

        if (!response.ok) {
            throw new Error("Error in setting the new picture");
        }

        dispatch({
            type: UPDATE_PROFILE_IMAGE,
            picture: picture
        });
    };
};

export const uploadID = (id, picture) => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.10:12335/api/user/setPersonalIDImage/${id}`,
            {
                method: 'PUT',               
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(picture)
            }
        );

        if (!response.ok) {
            throw new Error("Error in setting the new picture");
        }

        dispatch({
            type: UPLOAD_ID,
            idVerification: true,
            idExpirationDate: new Date().setFullYear(oneYearFromNow.getFullYear() + 1)
        });
    };
};

export const uploadDriverLicense = (id, picture) => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.10:12335/api/user/setDriverLicenseImage/${id}`,
            {
                method: 'PUT',               
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(picture)
            }
        );

        if (!response.ok) {
            throw new Error("Error in setting the new picture");
        }

        dispatch({
            type: UPLOAD_DRIVER_LICENSE,
            licenseVerification: true,
            licenseExpirationDate: new Date().setFullYear(oneYearFromNow.getFullYear() + 1)
        });
    };
};

export const clearPreviousList = () => {
    return {
        type: CLEAR_USER_LISTINGS
    };
};

export const loadUserListings = () => {
    return async (dispatch, getState) => {

        const userID = getState().auth.userId;

        const response = await fetch(`http://192.168.1.10:12335/api/userListings/${userID}`);

        if (!response.ok) {
            throw new Error("Listings not loaded");
        }

        const resData = await response.json();
        const loadedListings = [];

        for (const index in resData) {
            loadedListings.push(new ShortListing(
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
            type: LOAD_USER_LISTINGS,
            listings: loadedListings
        });
    };
};