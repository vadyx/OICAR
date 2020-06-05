import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import * as newListingActions from '../../store/actions/newListing';
import * as vehicleDataActions from '../../store/actions/vehicleData';
import { theme } from '../../utils/theme';

const AddTitleScreen = props => {

  const newListing = useSelector(state => state.newListing);
  const vehicleData = useSelector(state => state.vehicleData);

  const [title, setTitle] = useState(newListing.title);
  const dispatch = useDispatch();

  const _onNextPressed = async () => {
    await dispatch(newListingActions.setTitle(title));

    try {
      if (vehicleData.years.length === 0) {
        await dispatch(vehicleDataActions.loadManufacturingYears());
      }

      if (vehicleData.wheelDrives.length === 0) {
        await dispatch(vehicleDataActions.loadWheelDrives());
      }

      if (vehicleData.fuelTypes.length === 0) {
        await dispatch(vehicleDataActions.loadFuelTypes());
      }

      if (vehicleData.gearShiftTypes.length === 0) {
        await dispatch(vehicleDataActions.loadGearShiftTypes());
      }

      if (vehicleData.subcategories.length === 0) {
        await dispatch(vehicleDataActions.loadSubcategories(newListing.categoryID));
      }

      if (vehicleData.vehicleAccessories.length === 0) {
        await dispatch(vehicleDataActions.loadVehicleAccessories());
      }

      props.navigation.navigate('AddBasicInfo');
    } catch (error) {
      console.log(error);
      //error handling logic
    }
    
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={() => props.navigation.goBack()} />
      <ExitButton goBack={() => props.navigation.navigate('Add')} />
      <View style={styles.contentstyle}>     
        <Text style={styles.headerstyle}>Unesite naziv vašega oglasa</Text>
        <Input 
          placeholder='npr. Audi A3 ...' 
          onChangeText={(text) => setTitle(text.trim())}
        />
      </View>

      <NextScreenButton
        disabled={title === null}
        navigate={_onNextPressed}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: theme.colors.white
  },
  contentstyle:{
    marginTop:-100,
    width:"80%",
  },
  headerstyle: {
    fontSize: 32,
    paddingBottom:50,
    textAlign:"center",
    fontWeight: '700',
  }
});

export default AddTitleScreen;