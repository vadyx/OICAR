import { LOAD_CATEGORIES, LOAD_MANUFACTURERS, LOAD_MODELS } from '../actions/vehicleData';

const initialState = {
    categories: [],
    manufacturers: [],
    models: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.categories
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
        default:
            return state;
    }
}