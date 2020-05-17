import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { Divider } from 'react-native-elements';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import * as newListingActions from '../../store/actions/newListing';
import * as vehicleDataActions from '../../store/actions/vehicleData';
import { theme } from '../../utils/theme';

const manufacturer_dropdown_data = [];
const model_dropdown_data = [];

const AddBrandScreen = props => {

  const listingData = useSelector(state => state.newListing);

  const [firstEntry, setFirstEntry] = useState(true);
  const [selectedManufacturer, setSelectedManufacturer] = useState(listingData.manufacturerID);
  const [selectedModel, setSelectedModel] = useState(listingData.modelID);

  const manufacturers = useSelector(state => state.vehicleData.manufacturers);
  const models = useSelector(state => state.vehicleData.models);

  if (models.length !== 0) {
    model_dropdown_data.length = 0;

    for (const index in models) { 
      model_dropdown_data.push(
        {
          label: models[index].name,
          value: models[index].id
        }
      );
    }
  }
  
  const dispatch = useDispatch();

  const _onNextPressed = async () => {
    dispatch(newListingActions.setManufacturerAndModel(selectedManufacturer, selectedModel));
    props.navigation.navigate('AddTitle');
  }

  useEffect(() => {
    if (firstEntry) {
      manufacturer_dropdown_data.length = 0;
      for (const index in manufacturers) { 
        manufacturer_dropdown_data.push(
          {
            label: manufacturers[index].name,
            value: manufacturers[index].id
          }
        );
      }

      setFirstEntry(false);
    }
  }, [firstEntry]);

  useEffect(() => {
    if (selectedManufacturer !== null) {
      dispatch(vehicleDataActions.loadModels(selectedManufacturer));         
    }
  }, [selectedManufacturer]);

  return (
    <View style={styles.container}>
      <BackButton goBack={() => props.navigation.goBack()} />
      <ExitButton goBack={() => props.navigation.navigate('Add')} />
      
      <View style={styles.contentstyle}>
        <Text style={styles.headerstyle}>Marka i model vozila</Text>
        <View style={styles.rnpstyle}>

          <RNPickerSelect
            placeholder={{
              label: 'Odaberite marku vozila',
              value: null,
              color:theme.colors.lightgrey
            }}
            onValueChange={(value) => setSelectedManufacturer(value)}
            items={manufacturer_dropdown_data}
            style={{
              placeholder: {
                color: theme.colors.primary,
                fontSize: 12,
                fontWeight: 'bold',
              },
            }}
          />

          <Divider style={{ backgroundColor: 'black', marginVertical:15 }} />
          
          <RNPickerSelect
            placeholder={{
              label: 'Odaberite model vozila',
              value: null,
              color: theme.colors.lightgrey
            }}
            onValueChange={(value) => setSelectedModel(value)}
            items={model_dropdown_data}
            disabled={selectedManufacturer === null}
          />

        </View>
      </View>

      <NextScreenButton 
        disabled={selectedManufacturer === null || selectedModel === null}
        navigate={_onNextPressed} />

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
    marginTop:-70,
    width:"80%",
  },
  headerstyle: {
    fontSize: 32,
    textAlign:"center",
    fontWeight: '700',
  },
  rnpstyle:{
    marginTop:50
  }
});

export default AddBrandScreen;