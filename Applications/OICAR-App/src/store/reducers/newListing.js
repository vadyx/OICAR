import { SET_CATEGORY, NEW_LISTING_CLOSE } from '../actions/newListing';

const initialState = {
    categoryID: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                categoryID: action.categoryID
            };
        case NEW_LISTING_CLOSE:
            state = initialState;
            return state;
        default:
            return state;
    }
};