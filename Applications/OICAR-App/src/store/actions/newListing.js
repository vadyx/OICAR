export const SET_CATEGORY = "SET CATEGORY";
export const SET_MANUFACTURER_MODEL = "SET_MANUFACTURER_MODEL";
export const SET_TITLE = "SET_TITLE";
export const SET_BASIC_INFO = "SET_BASIC_INFO";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_PRICE = "SET_PRICE";
export const SET_DATES = "SET_DATES";
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
        // console.log("User: " + userID);
        
        // console.log("Title: " + newListingData.title + "(type: " + typeof newListingData.title + ")");
        // console.log("Description: " + newListingData.description + "(type: " + typeof newListingData.description + ")");
        // console.log("Price: " + newListingData.price + "(type: " + typeof newListingData.price + ")");
        // console.log("PriceID: " + newListingData.pricePeriodID + "(type: " + typeof newListingData.pricePeriodID + ")");
        // console.log("StartDate: " + newListingData.startDate + "(type: " + newListingData.startDate.constructor.name + ")");
        // console.log("EndDate: " + newListingData.endDate + "(type: " + newListingData.endDate.constructor.name + ")");        
	    // console.log("Cat: " + newListingData.categoryID + "(type: " + typeof newListingData.categoryID + ")");
        // console.log("Manuf: " + newListingData.manufacturerID + "(type: " + typeof newListingData.manufacturerID + ")");
        // console.log("Model: " + newListingData.modelID + "(type: " + typeof newListingData.modelID + ")");
        // console.log("Subcat: " + newListingData.subcategoryID + "(type: " + typeof newListingData.subcategoryID + ")");
        // console.log("Year: " + newListingData.year + "(type: " + typeof newListingData.year + ")");
        // console.log("Fuel: " + newListingData.fuelTypeID + "(type: " + typeof newListingData.fuelTypeID + ")");
	    // console.log("Drive: " + newListingData.wheelDriveID + "(type: " + typeof newListingData.wheelDriveID + ")");
        // console.log("GearShift: " + newListingData.gearShiftID + "(type: " + typeof newListingData.gearShiftID + ")");
        // console.log("KM: " + newListingData.traveledKM + "(type: " + typeof newListingData.traveledKM + ")");
        // console.log("Power: " + newListingData.enginePower + "(type: " + typeof newListingData.enginePower + ")");
        // console.log("Acc: " + newListingData.accessories + "(type: " + typeof newListingData.accessories + ")");

        const response = await fetch('http://192.168.1.3:12335/api/newListing',
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
                    LocationCoordinateX: null,
                    LocationCoordinateY: null,
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
            response.text().then(text => console.log(text));
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