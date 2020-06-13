import React,{useState} from 'react';
import {
  View,
  Text,
  Picker,
  StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector, useDispatch } from 'react-redux';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import Input from '../../components/Input';
import NextScreenButton from '../../components/NextScreenButton';
import * as newListingActions from '../../store/actions/newListing';
import { theme } from '../../utils/theme';

const _renderPriceDropdownItem = (item) => {
  return (
    <Picker.Item 
      key={item.id}
      label={item.name} 
      value={item.id} 
    />
  );
}

const AddPriceScreen = props => {

  const pricePeriods = useSelector(state => state.vehicleData.pricePeriods);
  const newListing = useSelector(state => state.newListing);

  const [price, setPrice] = useState(newListing.price);
  const [selectedPricePeriod, setSelectedPricePeriod] = useState(newListing.pricePeriodID === null ? 1 : newListing.pricePeriodID);

  const dispatch = useDispatch();

  const _onInputChange = (value, isInputValid) => {
    if (isInputValid) {
      setPrice(parseInt(value));
    } else {
      setPrice(null);
    }
  };

  const _onNextPressed = () => {
    dispatch(newListingActions.setPrice(price, selectedPricePeriod));
    props.navigation.navigate('AddDate');
  };

  return (
    <View style={styles.container}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />

        <View style={styles.contentstyle}>     
          <Text style={styles.headerstyle}>Cijena vozila</Text>
          <View style={styles.inputpickerbox}>
            <Input 
              keyboardType = 'decimal-pad'
              style={styles.input}
              onInputChange={_onInputChange}
              price
              required
              autoUpdate
              number
              minNumber={0.1}
            />

            <Text style={styles.currencylabel}>kn  /</Text>

            <Picker
              selectedValue={selectedPricePeriod}
              mode="dropdown"
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedPricePeriod(itemValue)}>

              {pricePeriods.map(item => _renderPriceDropdownItem(item))}

            </Picker>
          </View>
        </View>


      <NextScreenButton 
        disabled={price === null}
        navigate={_onNextPressed} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:getStatusBarHeight(),
    backgroundColor: theme.colors.white
  },
  contentstyle:{
    width:"80%",
    marginTop:-80,
    alignSelf:"center"
  },
  headerstyle: {
    fontSize: 32,
    paddingBottom:50,
    textAlign:"center",
    fontWeight: '700',
  },
  input:{
      alignSelf:"center",
      width:"40%",
    
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
  currencylabel:{
    color:theme.colors.primary,
    fontSize:16,
    marginLeft:10,
    marginTop:3
  },
  inputpickerbox:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  picker:{ 
    height: 20, 
    width: 110,
    alignSelf:"center", 
    color:theme.colors.primary
  }
  
});

export default AddPriceScreen;