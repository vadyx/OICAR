import { 
    SET_CATEGORY, 
    NEW_LISTING_CLOSE, 
    SET_MANUFACTURER_MODEL, 
    SET_TITLE, 
    SET_BASIC_INFO, 
    SET_DESCRIPTION,
    SET_PRICE,
    SET_DATES,
    SET_IMAGES,
    CONFIRM_LISTING,
    SET_COORDINATES
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
    pricePeriodID: null,
    startDate: null,
    endDate: null,
    coordinates: null,
    images: null
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
        case SET_PRICE:
            return {
                ...state,
                price: action.price,
                pricePeriodID: action.pricePeriodID
            };
        case SET_DATES:
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate
            };
        case SET_COORDINATES:
            return {
                ...state,
                coordinates: action.coordinates
            };
        case SET_IMAGES:
            return {
                ...state,
                images: action.images
            };
        case CONFIRM_LISTING:
            return action.success;
        case NEW_LISTING_CLOSE:
            return initialState;
        default:
            return state;
    }
};