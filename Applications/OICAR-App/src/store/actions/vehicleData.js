import Category from '../../models/category';

export const LOAD_CATEGORIES = "LOAD_CATEGORIES";

export const loadCategories = () => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.3:12335/api/categories');

        if (!response.ok) {
            throw new Error("Categories not loaded");
        }

        const resData = await response.json();
        const loadedCategories = [];

        for (const index in resData) {
            loadedCategories.push(new Category(
                resData[index].IDCategory,
                resData[index].CategoryName,
                resData[index].CategoryImage
            ));
        }

        dispatch({
            type: LOAD_CATEGORIES,
            categories: loadedCategories
        });
    }
}