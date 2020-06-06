import { LOAD_CATEGORY_LISTINGS, SET_CATEGORY } from "../actions/listings";

const initialState = {
    categoryID: null,
    listings: [],
    shownListings: [],
    isMore: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                categoryID: action.categoryID
            };
        case LOAD_CATEGORY_LISTINGS:
            return {
                ...state,
                listings: action.listings,
                shownListings: action.shownListings
            };
        default: 
            return state;
    }
};