import { SET_CATEGORY, NEW_LISTING_CLOSE, SET_MANUFACTURER_MODEL, SET_TITLE } from '../actions/newListing';

const initialState = {
    categoryID: null,
    manufacturerID: null,
    modelID: null,
    title: ''
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
        case NEW_LISTING_CLOSE:
            state = initialState;
            return state;
        default:
            return state;
    }
};