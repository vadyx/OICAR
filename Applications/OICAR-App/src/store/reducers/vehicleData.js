import { 
    LOAD_CATEGORIES, 
    LOAD_SUBCATEGORIES,
    LOAD_MANUFACTURERS, 
    LOAD_MODELS, 
    LOAD_YEARS, 
    LOAD_DRIVE_TYPES, 
    LOAD_FUEL_TYPES, 
    LOAD_GEAR_SHIFT_TYPES,
    LOAD_VEHICLE_ACCESSORIES,
    LOAD_PRICE_PERIODS
} from '../actions/vehicleData';

const initialState = {
    categories: [],
    subcategories: [],
    manufacturers: [],
    models: [],
    years: [],
    wheelDrives: [],
    fuelTypes: [],
    gearShiftTypes: [],
    vehicleAccessories: [],
    pricePeriods: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case LOAD_SUBCATEGORIES:
            return {
                ...state,
                subcategories: action.subcategories
            };
        case LOAD_MANUFACTURERS:
            return {
                ...state,
                manufacturers: action.manufacturers
            };
        case LOAD_MODELS:
            return {
                ...state,
                models: action.models
            };
        case LOAD_YEARS:
            return {
                ...state,
                years: action.years
            };
        case LOAD_DRIVE_TYPES:
            return {
                ...state,
                wheelDrives: action.wheelDrives
            };
        case LOAD_FUEL_TYPES:
            return {
                ...state,
                fuelTypes: action.fuelTypes
            };
        case LOAD_GEAR_SHIFT_TYPES:
            return {
                ...state,
                gearShiftTypes: action.gearShiftTypes
            };
        case LOAD_VEHICLE_ACCESSORIES:
            return {
                ...state,
                vehicleAccessories: action.vehicleAccessories
            };
        case LOAD_PRICE_PERIODS:
            return {
                ...state,
                pricePeriods: action.pricePeriods
            };
        default:
            return state;
    }
}