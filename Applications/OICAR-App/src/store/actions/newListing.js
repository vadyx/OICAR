export const SET_CATEGORY = "SET CATEGORY";
export const NEW_LISTING_CLOSE = "SET CATEGORY";

export const setCategory = categoryID => {
    return {
        type: SET_CATEGORY,
        categoryID: categoryID
    };
};

export const newListingClose = () => {
    return {
        type: NEW_LISTING_CLOSE
    };
};