import Category from '../../models/category';
import Subcategory from '../../models/subcategory';
import VehicleManufacturer from '../../models/vehicleManufacturer';
import VehicleModel from '../../models/vehicleModel';
import WheelDrive from '../../models/wheelDrive';
import FuelType from '../../models/fuelType';
import GearShift from '../../models/gearShift';
import VehicleAccessory from '../../models/vehicleAccessory';
import PricePeriod from '../../models/pricePeriod';

export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const LOAD_SUBCATEGORIES = "LOAD_SUBCATEGORIES";
export const LOAD_MANUFACTURERS = "LOAD_MANUFACTURERS";
export const LOAD_MODELS = "LOAD_MODELS";
export const LOAD_YEARS = "LOAD_YEARS";
export const LOAD_DRIVE_TYPES = "LOAD_DRIVE_TYPES";
export const LOAD_FUEL_TYPES = "LOAD_FUEL_TYPES";
export const LOAD_GEAR_SHIFT_TYPES = "LOAD_GEAR_SHIFT_TYPES";
export const LOAD_VEHICLE_ACCESSORIES = "LOAD_VEHICLE_ACCESSORIES";
export const LOAD_PRICE_PERIODS = "LOAD_PRICE_PERIODS";

export const loadCategories = () => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.10:12335/api/categories');

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

export const loadSubcategories = (categoryID) => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.10:12335/api/vehicle/subCategories/${categoryID}`);

        if (!response.ok) {
            throw new Error("Subcategories not loaded");
        }

        const resData = await response.json();
        const loadedSubcategories = [];

        for (const index in resData) {
            loadedSubcategories.push(new Subcategory(
                resData[index].IDSubCategory,
                resData[index].SubCategory1
            ));
        }

        dispatch({
            type: LOAD_SUBCATEGORIES,
            subcategories: loadedSubcategories
        });
    };
};

export const loadManufacturers = categoryID => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.10:12335/api/vehicleManufacturers/${categoryID}`);

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
    };
};

export const loadModels = manufacturerID => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.10:12335/api/vehicleModels/${manufacturerID}`);

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
    };
};

export const loadManufacturingYears = () => {
    const years = [];
    const currentYear = parseInt(new Date().getFullYear());

    for (var i = currentYear; i >= 1990; i--) {

        years.push({
            label: `${i}`,
            value: `${i}`
        });
    }

    return {
        type: LOAD_YEARS,
        years: years
    }
}

export const loadWheelDrives = () => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.10:12335/api/vehicle/driveTypes');

        if (!response.ok) {
            throw new Error("Drive types not loaded");
        }

        const resData = await response.json();
        const loadedWheelDrives = [];

        for (const index in resData) {
            loadedWheelDrives.push(new WheelDrive(
                resData[index].IDDriveType,
                resData[index].DriveType1
            ));
        }

        dispatch({
            type: LOAD_DRIVE_TYPES,
            wheelDrives: loadedWheelDrives
        });
    };
};

export const loadFuelTypes = () => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.10:12335/api/vehicle/fuelTypes');

        if (!response.ok) {
            throw new Error("Fuel types not loaded");
        }

        const resData = await response.json();
        const loadedFuelTypes = [];

        for (const index in resData) {
            loadedFuelTypes.push(new FuelType(
                resData[index].IDFuelType,
                resData[index].FuelType1
            ));
        }

        dispatch({
            type: LOAD_FUEL_TYPES,
            fuelTypes: loadedFuelTypes
        });
    };
};

export const loadGearShiftTypes = () => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.10:12335/api/vehicle/gearShiftTypes');

        if (!response.ok) {
            throw new Error("Gear shift types not loaded");
        }

        const resData = await response.json();
        const loadedGearShiftTypes = [];

        for (const index in resData) {
            loadedGearShiftTypes.push(new GearShift(
                resData[index].IDGearShiftType,
                resData[index].GearShiftType1
            ));
        }

        dispatch({
            type: LOAD_GEAR_SHIFT_TYPES,
            gearShiftTypes: loadedGearShiftTypes
        });
    };
};

export const loadVehicleAccessories = () => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.10:12335/api/vehicle/accessories');

        if (!response.ok) {
            throw new Error("Accessories not loaded");
        }

        const resData = await response.json();
        const loadedAccessories = [];

        for (const index in resData) {
            loadedAccessories.push(new VehicleAccessory(
                resData[index].IDVehicleAccessories,
                resData[index].VehicleAccessories1
            ));
        }

        dispatch({
            type: LOAD_VEHICLE_ACCESSORIES,
            vehicleAccessories: loadedAccessories
        });
    };
};

export const loadPricePeriods = () => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.10:12335/api/listing/priceBy');

        if (!response.ok) {
            throw new Error("Price periods not loaded");
        }

        const resData = await response.json();
        const loadedPricePeriods = [];

        for (const index in resData) {
            loadedPricePeriods.push(new PricePeriod(
                resData[index].IDPriceBy,
                resData[index].PriceBy1.toLowerCase()
            ));
        }

        dispatch({
            type: LOAD_PRICE_PERIODS,
            pricePeriods: loadedPricePeriods
        });
    };
};