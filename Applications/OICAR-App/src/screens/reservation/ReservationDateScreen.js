import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Input } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

import BackButton from '../../components/BackButton';
import NextScreenButton from '../../components/NextScreenButton';
import DatePicker from '../../components/DatePicker';
import * as reservationAction from '../../store/actions/reservation';
import { theme } from '../../utils/theme';

const currentDate = moment().toDate();

const ReservationDateScreen = props => {

  const userData = useSelector(state => state.profile.user);
  const listing = useSelector(state => state.listings.selectedListing);

  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(moment(currentDate).add(1, 'days').toDate());
  const [phoneNr, setPhoneNr] = useState("+ 385 ");
  const [totalPrice, setTotalPrice] = useState();

  const dispatch = useDispatch();

  const _onDateChanged = (id, selectedDate) => {
    let date;

    if (id === 'startDate') {
      date = selectedDate || startDate;
      setStartDate(date);
      return;
    }

    if (id === 'endDate') {
      date = selectedDate || endDate;
      setEndDate(date);
      return;
    }
  };

  const _calculateTotalPrice = () => {
    let totalPrice = listing.price;

    const start = new Date(startDate.toDateString());
    const end = new Date(endDate.toDateString());

    var days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24); 

    switch (listing.pricePeriod) {
      case "Sat":
        totalPrice = totalPrice * 24 * days;
        break;
      case "Dan":
        totalPrice = totalPrice * days;
        break;
      case "Tjedan":
        totalPrice = ((totalPrice * days) / 12);
        break;
      default:
        break;
    }

    setTotalPrice(totalPrice.toFixed(2));
  }

  const _onNextPressed = async () => {
    dispatch(reservationAction.setReservation1(startDate, endDate, phoneNr, totalPrice));
    props.navigation.navigate('ReservationPay');
  };

  useEffect(() => {
    _calculateTotalPrice();
  }, [startDate, endDate]);

  return (
    <View style={styles.container}>
      <ScrollView style={{flex:1,width:"100%",height:"100%"}}>
      <BackButton style={styles.back} goBack={() => props.navigation.goBack()} />
      <Text style={styles.headerstyle}>Rezervacija</Text>
        <Text style={styles.headerstyle2}>1/2</Text>

        <View style={styles.datecontainer}>
          <DatePicker
            id='startDate'
            label="Od"
            date={startDate}
            minimumDate={currentDate}
            onDateChanged={_onDateChanged}     
            style={styles.labelstyle}
            labelsize={18}
            labelfontweight="bold"
            labelcolor={theme.colors.lightplusgrey}  
          />

          <DatePicker
            id='endDate'
            label="Do"
            date={endDate}
            minimumDate={currentDate}
            maximumDate={listing.endDate}
            onDateChanged={_onDateChanged}
            style={styles.labelstyle}
            labelsize={18}
            labelfontweight="bold"
            labelcolor={theme.colors.lightplusgrey}
          />
        </View>

        <Input 
          containerStyle={styles.input}
          label='Ime'
          labelStyle={styles.inputlabel}
          placeholder={userData.firstName}
          disabled
          inputContainerStyle={styles.inputinside}
          inputStyle={styles.textinput}
        />

        <Input 
          containerStyle={styles.input} 
          label='Prezime'
          labelStyle={styles.inputlabel}
          placeholder={userData.lastName}
          disabled
          inputContainerStyle={styles.inputinside}
        />

        <Input 
          placeholder={userData.email}
          label='E-mail'
          labelStyle={styles.inputlabel}
          disabled
          containerStyle={styles.input} 
          leftIcon={<MaterialIcons name="email" size={20} color={theme.colors.lightgrey} />}
          leftIconContainerStyle={styles.iconstyle}
          inputStyle={styles.textinput}
        />
        
        <Input
          keyboardType="decimal-pad"
          label='Telefon'
          labelStyle={styles.inputlabel}
          containerStyle={styles.input}
          leftIcon={<MaterialIcons name="phone" size={20} color={theme.colors.lightgrey} />}
          leftIconContainerStyle={styles.iconstyle}
          value={phoneNr}
          inputStyle={styles.textinput}
          onChangeText={(text) => setPhoneNr(text)}
        />

        <View style={styles.pricebox}>
          <Text style={styles.pricetextstyle}>Cijena ukupno:</Text>
          <Text style={styles.pricetextstyle1}>{totalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.detailboxstyle}>
          <Text style={styles.detailprice}> - Pogledajte detalje cijene</Text>
        </TouchableOpacity>
        
      </ScrollView>
      <NextScreenButton
        disabled={startDate > endDate || phoneNr.length < 9}
        navigate={_onNextPressed}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"flex-start",
    justifyContent:"flex-start",
    marginTop:getStatusBarHeight(),
    backgroundColor: theme.colors.white
  },
  headerstyle: {
    fontSize: 32,
    marginTop:50,
    alignSelf:"center",
    textAlign:"center",
    fontWeight: '700',
  },
  headerstyle2: {
    fontSize: 22,
    marginTop:5,
    marginBottom:50,
    alignSelf:"center",
    textAlign:"center",
    fontWeight: '700',
  },
  input:{
    width:"80%",
    marginLeft:10,
  },
  inputinside:{
    paddingLeft:10,
  },
  inputlabel:{
    color:theme.colors.lightplusgrey,
    fontSize:17
  },
  iconstyle:{
    paddingRight:20
  },
  back:{
    marginTop:-getStatusBarHeight()
  },
  textinput:{
    color:theme.colors.primary
  },
  labelstyle:{
    width:80,
    fontSize:15
  },
  datecontainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:20,
    paddingBottom:20,
  },
  pricebox:{
    flexDirection:"row",
    marginTop:50,
    marginLeft:20
  },
  pricetextstyle:{
    fontWeight:"bold",
    fontSize:24,
    color:theme.colors.primary
  },
  pricetextstyle1:{
    fontWeight:"500",
    fontSize:24,
    paddingLeft:10,
    color:theme.colors.black
  },
  detailprice:{
    color:theme.colors.primary
  },
  detailboxstyle:{
    marginLeft:40,
    marginBottom:20,
  }
});

export default ReservationDateScreen;