export const SET_CATEGORY = "SET CATEGORY";
export const SET_MANUFACTURER_MODEL = "SET_MANUFACTURER_MODEL";
export const SET_TITLE = "SET_TITLE";
export const SET_BASIC_INFO = "SET_BASIC_INFO";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_PRICE = "SET_PRICE";
export const SET_DATES = "SET_DATES";
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

export const newListingClose = () => {
    return {
        type: NEW_LISTING_CLOSE
    };
};