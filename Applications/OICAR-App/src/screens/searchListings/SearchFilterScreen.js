import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';

import NextScreenButton from '../../components/NextScreenButton';
import BackButton from '../../components/BackButton';
import DatePicker from '../../components/DatePicker';
import * as listingActions from '../../store/actions/listings';
import { theme } from '../../utils/theme';

const currentDate = moment().toDate();
let nextDayDate = moment(currentDate).add(1, 'days').toDate();

const SearchFilterScreen = props => {

  const [selectedManufacturer, setSelectedManufacturer] = useState('');

  const dispatch = useDispatch();

  const _onNextPressed = async () => {
    await dispatch(listingActions.filter(selectedManufacturer));
    props.navigation.goBack();
  };

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

  const placeholder_manufacturer = {
    label: 'Marka vozila',
    value: null,
    color:theme.colors.lightgrey  
  };

  return (
    <View style={styles.container}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <Text style={styles.headerstyle}>Filtriraj vozila</Text>
        <AntDesign name="filter" size={50} color={theme.colors.black} style={styles.icon}/>
        <View style={styles.subcategory}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedManufacturer(value)}
              placeholder={placeholder_manufacturer}
              items={[
                {label:'Audi', value:'Audi'},
                {label:'Peugeot', value:'Peugeot'},
                {label:'Opel', value:'Opel'},
                {label:'Renault', value:'Renault'},
                {label:'Volkswagen', value:'Volkswagen'}
                ]}
              style={dropdownsstyles}
              />
        </View>
        <View style={styles.hl}></View>
        <View style={styles.datecontainer}>
            <DatePicker
                id='startDate'
                label="Datum od"
                date={currentDate}     
                style={styles.labelstyle}
                labelsize={15}
                labelfontweight="400"
                labelcolor={theme.colors.black}  
            />
        </View>
        <View style={styles.hl}></View>
        <View style={styles.datecontainer}>
            <DatePicker
            id='endDate'
            label="Datum do"
            date={nextDayDate}
            style={styles.labelstyle}
            labelsize={15}
            labelfontweight="500"
            labelcolor={theme.colors.black}
            />
        </View>

        <NextScreenButton
            style={styles.filterbutton}
            navigate={_onNextPressed}>

            <Text style={styles.filtertext}>Filtrirajte</Text>
        </NextScreenButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:getStatusBarHeight(),
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:theme.colors.white
  },
  headerstyle:{
    fontSize:32,
    color:theme.colors.black,
    fontWeight:"700",
    paddingBottom:20,
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
  subcategory:{
      width:175,
      paddingLeft:5,
      alignSelf:"center",
      borderWidth:1,
      borderRadius:10,
      borderColor:theme.colors.lightplusgrey,
      marginBottom:20
  },
  icon:{
      marginBottom:50
  },
  datecontainer:{
    alignSelf:"center",
  },
  labelstyle:{
    width:80,
    fontSize:15
  },
  filterbutton:{
      position:"relative",
    height:50,
    width:165,
    marginTop:50,
    paddingLeft:20,
    flexDirection:"row"
  },
  filtertext:{
    fontSize:20,
    paddingBottom:5,
    fontWeight:"600",
    color:theme.colors.white
  },
  hl:{
      marginVertical:10,
      width:"60%",
      borderBottomWidth:1,
      borderColor:theme.colors.lightgrey
  },
});

export default SearchFilterScreen;