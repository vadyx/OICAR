export const SET_CATEGORY = "SET CATEGORY";
export const SET_MANUFACTURER_MODEL = "SET_MANUFACTURER_MODEL";
export const SET_TITLE = "SET_TITLE";
export const SET_BASIC_INFO = "SET_BASIC_INFO";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_PRICE = "SET_PRICE";
export const SET_DATES = "SET_DATES";
export const SET_COORDINATES = "SET_COORDINATES";
export const SET_IMAGES = "SET_IMAGES";
export const CONFIRM_LISTING = "CONFIRM_LISTING";
export const NEW_LISTING_CLOSE = "NEW_LISTING_CLOSE";

export const setCategory = categoryID => {
    return {
        type: SET_CATEGORY,
        categoryID: categoryID
    };
};

export const setManufacturerAndModel = (manufacturerID, modelID) => {
    return {
        type: SET_MANUFACTURER_MODEL,
        manufacturerID: manufacturerID,
        modelID: modelID
    };
};

export const setTitle = title => {
    return {
        type: SET_TITLE,
        title: title
    };
};

export const setBasicInfo = (subcategoryID, enginePower, traveledKM, year, fuelTypeID, gearShiftID, wheelDriveID, accessories) => {
    return {
        type: SET_BASIC_INFO,
        subcategoryID: subcategoryID,
        enginePower: enginePower,
        traveledKM: traveledKM,
        year: year,
        fuelTypeID: fuelTypeID,
        gearShiftID: gearShiftID,
        wheelDriveID: wheelDriveID,
        accessories: accessories
    };
};

export const setDescription = description => {
    return {
        type: SET_DESCRIPTION,
        description: description
    };
}

export const setPrice = (price, periodID) => {
    return {
        type: SET_PRICE,
        price: price,
        pricePeriodID: periodID
    };
};

export const setDates = (startDate, endDate) => {
    return {
        type: SET_DATES,
        startDate: startDate,
        endDate: endDate
    };
};

export const setCoordinates = (coordinates) => {
    return {
        type: SET_COORDINATES,
        coordinates: coordinates
    };
};

export const setImages = images => {
    return {
        type: SET_IMAGES,
        images: images
    };
};

export const confirmListing = () => {
    return async (dispatch, getState) => {

        const newListingData = getState().newListing;
        const userID = getState().auth.userId;

        const response = await fetch('http://192.168.1.10:12335/api/newListing',
            {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    Title: newListingData.title,
                    ListingDescription: newListingData.description,
                    Price: newListingData.price,
                    PriceByID: newListingData.pricePeriodID,
                    AvailableFromDate: newListingData.startDate,
                    AvailableToDate: newListingData.endDate,
                    LocationCoordinateX: newListingData.coordinates.lat,
                    LocationCoordinateY: newListingData.coordinates.lng,
                    UserID: userID,
                    Images: newListingData.images,
                    Vehicle: {
                        CategoryID: newListingData.categoryID,
                        VehicleManufacturerID: newListingData.manufacturerID,
                        VehicleModelID: newListingData.modelID,
                        SubCategoryID: newListingData.subcategoryID,
                        ManufacturingYear: newListingData.year,
                        FuelTypeID: newListingData.fuelTypeID,
                        DriveTypeID: newListingData.wheelDriveID,
                        GearShiftTypeID: newListingData.gearShiftID,
                        Kilometers: newListingData.traveledKM,
                        EnginePower: newListingData.enginePower,
                        Accessories: newListingData.accessories
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error("New listing not registered!");
        }

        const resData = await response.json();
        const success = resData === "Success";

        dispatch({
            type: CONFIRM_LISTING,
            success: success
        });

    }
};

export const newListingClose = () => {
    return {
        type: NEW_LISTING_CLOSE
    };
};