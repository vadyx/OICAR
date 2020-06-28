import { LOAD_CATEGORY_LISTINGS, SET_CATEGORY, LOAD_SELECTED_LISTING, CLEAR_LIST, LOAD_HIGHLIGHTED_LISTINGS } from "../actions/listings";

const initialState = {
    categoryID: null,
    listings: [],
    shownListings: [],
    hightlightedListings: [],
    selectedListing: null,
    isMore: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CLEAR_LIST:
            return initialState;
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
        case LOAD_HIGHLIGHTED_LISTINGS:
            return {
                ...state,
                hightlightedListings: action.hightlightedListings
            }
        case LOAD_SELECTED_LISTING:
            return {
                ...state,
                selectedListing: action.selectedListing
            }
        default: 
            return state;
    }
};