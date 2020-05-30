import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RNPickerSelect from 'react-native-picker-select';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { theme } from '../../utils/theme';
import Input from '../../components/Input'
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import * as dropdownConverter from '../../utils/dropdownDataConverter';
import * as newListingActions from '../../store/actions/newListing';

const SET_SUBCATEGORY = "SET_SUBCATEGORY";
const SET_ENGINE_POWER = "SET_ENGINE_POWER";
const SET_TRAVELED_KM = "SET_TRAVELED_KM";
const SET_YEAR = "SET_YEAR";
const SET_FUEL_TYPE = "SET_FUEL_TYPE";
const SET_GEAR_SHIFT = "SET_GEAR_SHIFT";
const SET_WHEEL_DRIVE = "SET_WHEEL_DRIVE";
const SET_ACCESSORIES = "SET_ACCESSORIES";
const CHECK_INFO_VALIDITY = "CHECK_INFO_VALIDITY";

const infoReducer = (state, action) => {
  switch (action.type) {
    case SET_SUBCATEGORY:
      return {
        ...state,
        values: {
          ...state.values,
          subcategoryID: action.value
        }
      };
    case SET_ENGINE_POWER:
      return {
        ...state,
        enginePowerValid: action.isValid,
        enginePowerError: action.error,
        values: {
          ...state.values,
          enginePower: action.value
        }
      };
    case SET_TRAVELED_KM:
      return {
        ...state,
        traveledKMValid: action.isValid,
        traveledKMError: action.error,
        values: {
          ...state.values,
          traveledKM: action.value
        }
      };
    case SET_YEAR:
      return {
        ...state,
        values: {
          ...state.values,
          year: action.value
        }
      };
    case SET_FUEL_TYPE:
      return {
        ...state,
        values: {
          ...state.values,
          fuelTypeID: action.value
        }
      };
    case SET_GEAR_SHIFT:
      return {
        ...state,
        values: {
          ...state.values,
          gearShiftID: action.value
        }
      };
    case SET_WHEEL_DRIVE:
      return {
        ...state,
        values: {
          ...state.values,
          wheelDriveID: action.value
        }
      };
    case SET_ACCESSORIES:
      return {
        ...state,
        values: {
          ...state.values,
          accessories: action.value
        }
      };
    case CHECK_INFO_VALIDITY:
      let validity = 
        state.enginePowerValid &&
        state.traveledKMValid &&
        state.values.fuelTypeID !== null &&
        state.values.gearShiftID !== null &&
        state.values.subcategoryID !== null
      ;

      return {
        ...state,
        inputValid: validity
      };
  }

  return state;
};

const placeholder_subcategory = {
  label: 'Tip vozila',
  value: null,
  color:theme.colors.lightgrey  
};

const placeholder_year = {
  label: 'Godište vozila',
  value: null,
  color:theme.colors.lightgrey
};

const placeholder_fuel = {
  label: 'Gorivo',
  value: null,
  color:theme.colors.lightgrey
};

const placeholder_gearShift = {
  label: 'Tip prijenosa',
  value: null,
  color:theme.colors.lightgrey  
};

const placeholder_wheelDrive = {
  label: 'Pogon',
  value: null,
  color:theme.colors.lightgrey
};

const subcategory_dropdown_data = [];
const fuel_dropdown_data = [];
const gearShift_dropdown_data = [];
const wheelDrive_dropdown_data = [];
const accessories_dropdown_data = [];

const AddBasicInfoScreen = props => {
  
  const vehicleData = useSelector(state => state.vehicleData);
  const newListing = useSelector(state => state.newListing);

  const [firstLoad, setFirstLoad] = useState(true);

  const dispatch = useDispatch();

  const [infoState, dispatchInfoState] = useReducer(infoReducer, {
    values: {
      subcategoryID: newListing.subcategoryID,
      enginePower: newListing.enginePower,
      traveledKM: newListing.traveledKM,
      year: newListing.year,
      fuelTypeID: newListing.fuelTypeID,
      gearShiftID: newListing.gearShiftID,
      wheelDriveID: newListing.wheelDriveID,
      accessories: newListing.accessories
    },
    enginePowerValid: newListing.enginePower === null ? false : true,
    traveledKMValid: newListing.traveledKM === null ? false : true,
    enginePowerError: "",
    traveledKMError: "",
    inputValid: false
  });

  const years_dropdown_data = vehicleData.years;

  const _onPickerSelect = (value, action) => {
    dispatchInfoState({
      type: action,
      value: value
    });
  };

  const _onInputChange = useCallback((id, value, isValid, error) => {

    const type = id === "enginePower" ? SET_ENGINE_POWER : SET_TRAVELED_KM;
    const intValue = parseInt(value);

    dispatchInfoState({
      type: type,
      value: intValue,
      isValid: isValid,
      error: error
    });

  }, [dispatchInfoState]);

  const _onNextPressed = () => {
    dispatch(newListingActions.setBasicInfo(
      infoState.values.subcategoryID,
      infoState.values.enginePower,
      infoState.values.traveledKM,
      infoState.values.year,
      infoState.values.fuelTypeID,
      infoState.values.gearShiftID,
      infoState.values.wheelDriveID,
      infoState.values.accessories,
    ));
    
    props.navigation.navigate("AddDescription");
  };

  useEffect(() => {
    if (firstLoad) {

      if (wheelDrive_dropdown_data.length === 0) {
        dropdownConverter.convert(vehicleData.wheelDrives, wheelDrive_dropdown_data);
      }

      if (fuel_dropdown_data.length === 0) {
        dropdownConverter.convert(vehicleData.fuelTypes, fuel_dropdown_data);
      }

      if (gearShift_dropdown_data.length === 0) {
        dropdownConverter.convert(vehicleData.gearShiftTypes, gearShift_dropdown_data);
      }

      if (subcategory_dropdown_data.length === 0) {
        dropdownConverter.convert(vehicleData.subcategories, subcategory_dropdown_data);
      }

      if (accessories_dropdown_data.length === 0) {
        let items = [];
        dropdownConverter.convert(vehicleData.vehicleAccessories, items);

        accessories_dropdown_data.push({
          label: 'Dodatna oprema',
          value: 0,
          children: items
        })
      }
    }

    setFirstLoad(false);
  }, [firstLoad]);

  useEffect(() => {
    dispatchInfoState({
      type: CHECK_INFO_VALIDITY
    });
  }, [infoState.values]);

  let dropdownsstyles = {
    placeholder: {
      color: theme.colors.darkgray,
      fontSize: 12,
      fontWeight: 'bold',
    },
    inputAndroid:{
      color:theme.colors.primary
    },
    inputIOS:{
      color:theme.colors.primary
    }
  };

  return (
      
    <View style={styles.container}>
     
      <ScrollView style={styles.scrollviewcontainer}>

        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />

        <View style={styles.contentstyle}>
          <Text style={styles.headerstyle}>Osnovne informacije</Text>
          <View style={styles.rnpstyle}>

            <RNPickerSelect
              placeholder={placeholder_subcategory}
              onValueChange={(value) => _onPickerSelect(value, SET_SUBCATEGORY)}
              items={subcategory_dropdown_data}
              style={dropdownsstyles}
            />

            <Divider style={styles.divider} />

            <Input style={styles.input}
              id="enginePower"
              label="Snaga motora u kW"
              returnKeyType="next"
              onInputChange={_onInputChange}
              keyboardType="numeric"
              displayError={!infoState.enginePowerValid}
              updateState={false}
              errorText={infoState.enginePowerError}
              basicInfo
              required
              autoUpdate
              number
              minNumber={1}
              maxNumber={800}
            />

            <Divider style={styles.divider} /> 

            <Input style={styles.input}
              id="traveledKM"
              label="Broj prijeđenih km"
              returnKeyType="next"
              onInputChange={_onInputChange}
              keyboardType="numeric"
              displayError={!infoState.traveledKMValid}
              updateState={false}
              errorText={infoState.traveledKMError}
              basicInfo
              required
              autoUpdate
              number
              minNumber={1}
            />

            <Divider style={styles.divider} /> 

            <RNPickerSelect
              placeholder={placeholder_year}
              onValueChange={(value) => _onPickerSelect(value, SET_YEAR)}
              items={years_dropdown_data}
              style={dropdownsstyles}
            />

            <Divider style={styles.divider} /> 
              
            <RNPickerSelect
              placeholder={placeholder_fuel}
              onValueChange={(value) => _onPickerSelect(value, SET_FUEL_TYPE)}
              items={fuel_dropdown_data}
              style={dropdownsstyles}
            />

            <Divider style={styles.divider} />

            <RNPickerSelect
              placeholder={placeholder_gearShift}
              onValueChange={(value) => _onPickerSelect(value, SET_GEAR_SHIFT)}
              items={gearShift_dropdown_data}
              style={dropdownsstyles}
            />
            
            <Divider style={styles.divider} />

            <RNPickerSelect
              placeholder={placeholder_wheelDrive}
              onValueChange={(value) => _onPickerSelect(value, SET_WHEEL_DRIVE)}
              items={wheelDrive_dropdown_data}
              style={dropdownsstyles}
            />

            <Divider style={styles.divider} />

            <SectionedMultiSelect
              items={accessories_dropdown_data}
              hideSearch={true}
              showDropDowns={false}
              expandDropDowns={true}
              uniqueKey="value"
              displayKey="label"
              subKey="children"
              iconKey="icon"
              selectText="Dodatna oprema"
              confirmText="Dodaj"
              selectedText = ""
              readOnlyHeadings={true}
              onSelectedItemsChange={(selectedItems) => _onPickerSelect(selectedItems, SET_ACCESSORIES)}
              selectedItems={infoState.values.accessories === null ? [] : infoState.values.accessories}
              styles={{
                button: {
                  backgroundColor:theme.colors.primary,
                  height:60
                },

                item: {
                  marginVertical:10,
                },

                itemText:{
                  fontSize:30
                },
                subItemText:{
                  fontSize:18
                },

                subItem:{
                  paddingVertical:9,
                  borderBottomWidth:1,
                  borderBottomColor:theme.colors.lightgrey
                },

                selectToggleText:{
                  color:infoState.values.accessories === null ? theme.colors.darkgray : theme.colors.primary
                }
              }}
            />
            <Divider style={styles.divider} />

          </View>
        </View>
      </ScrollView>

      <NextScreenButton 
        disabled={!infoState.inputValid}
        navigate={_onNextPressed} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:getStatusBarHeight(),
    backgroundColor: theme.colors.white
  },
  scrollviewcontainer:{
    flex:1,
  },
  contentstyle:{
    marginTop:80,
    marginBottom: 80,
    width:"80%",
    alignSelf:"center"
  },
  headerstyle: {
    fontSize: 32,
    textAlign:"center",
    fontWeight: '700',
  },
  input:{
    width:"100%",
    marginBottom:10
  },
  rnpstyle:{
    marginTop:20
  },
  divider:{
    backgroundColor: 'black',
    marginVertical:5
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  }
});

export default AddBasicInfoScreen;