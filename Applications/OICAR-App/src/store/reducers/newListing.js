import { 
    SET_CATEGORY, 
    NEW_LISTING_CLOSE, 
    SET_MANUFACTURER_MODEL, 
    SET_TITLE, 
    SET_BASIC_INFO, 
    SET_DESCRIPTION
} from '../actions/newListing';

const initialState = {
    categoryID: null,
    manufacturerID: null,
    modelID: null,
    title: null,
    subcategoryID: null,
    year: null,
    enginePower: null,
    traveledKM: null,
    fuelTypeID: null,
    gearShiftID: null,
    wheelDriveID: null,
    accessories: null,
    description: null,
    price: null,
    pricePeriodID: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                categoryID: action.categoryID
            };
        case SET_MANUFACTURER_MODEL:
            return {
                ...state,
                manufacturerID: action.manufacturerID,
                modelID: action.modelID
            };
        case SET_TITLE:
            return {
                ...state,
                title: action.title
            };
        case SET_BASIC_INFO:
            return {
                ...state,
                subcategoryID: action.subcategoryID,
                enginePower: action.enginePower,
                traveledKM: action.traveledKM,
                year: action.year,
                fuelTypeID: action.fuelTypeID,
                gearShiftID: action.gearShiftID,
                wheelDriveID: action.wheelDriveID,
                accessories: action.accessories
            };
        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.description
            };
        case NEW_LISTING_CLOSE:
            state = initialState;
            return state;
        default:
            return state;
    }
};