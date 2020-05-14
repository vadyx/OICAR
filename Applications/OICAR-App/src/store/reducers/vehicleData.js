import { LOAD_CATEGORIES } from '../actions/vehicleData';

const initialState = {
    categories: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        default:
            return initialState;
    }
}