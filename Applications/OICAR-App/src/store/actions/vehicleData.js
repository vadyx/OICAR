import Category from '../../models/category';
import VehicleManufacturer from '../../models/vehicleManufacturer';
import VehicleModel from '../../models/vehicleModel';

export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const LOAD_MANUFACTURERS = "LOAD_MANUFACTURERS";
export const LOAD_MODELS = "LOAD_MODELS";

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
    };
};

export const loadManufacturers = (categoryID) => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.3:12335/api/vehicleManufacturers/${categoryID}`);

        if (!response.ok) {
            throw new Error("Manufacturers not loaded");
        }

        const resData = await response.json();
        const loadedManufacturers = [];

        for (const index in resData) {
            loadedManufacturers.push(new VehicleManufacturer(
                resData[index].IDVehicleManufacturer,
                resData[index].ManufacturerName
            ));
        }

        dispatch({
            type: LOAD_MANUFACTURERS,
            manufacturers: loadedManufacturers
        });
    }
}

export const loadModels = (manufacturerID) => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.3:12335/api/vehicleModels/${manufacturerID}`);

        if (!response.ok) {
            throw new Error("Models not loaded");
        }

        const resData = await response.json();
        const loadedModels = [];

        for (const index in resData) {
            loadedModels.push(new VehicleModel(
                resData[index].IDVehicleModel,
                resData[index].ModelName
            ));
        }

        dispatch({
            type: LOAD_MODELS,
            models: loadedModels
        });
    }
}