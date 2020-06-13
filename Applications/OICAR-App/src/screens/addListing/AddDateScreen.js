import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import NextScreenButton from '../../components/NextScreenButton';
import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import DatePicker from '../../components/DatePicker';
import * as newListingActions from '../../store/actions/newListing';
import { theme } from '../../utils/theme';

const currentDate = moment().toDate();
let nextDayDate = moment(currentDate).add(1, 'days').toDate();

const AddDateScreen = props => {
  
  const newListing = useSelector(state => state.newListing);

  const [startDate, setStartDate] = useState(newListing.startDate === null ? currentDate : newListing.startDate);
  const [endDate, setEndDate] = useState(newListing.endDate === null ? nextDayDate : newListing.endDate);

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

  const _onNextPressed = () => {
    dispatch(newListingActions.setDates(startDate, endDate));
    props.navigation.navigate('AddLocation');
  };

  return (
    <View style={styles.container}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <Text style={styles.headerstyle}>Raspoloživost vozila</Text>

        <DatePicker
          id='startDate'
          label="Od"
          date={startDate}
          minimumDate={currentDate}
          onDateChanged={_onDateChanged}
        />

        <DatePicker
          id='endDate'
          label="Do"
          date={endDate}
          minimumDate={nextDayDate}
          onDateChanged={_onDateChanged}
        />

      <NextScreenButton
        disabled={startDate > endDate}
        navigate={_onNextPressed} 
      />
      
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
    fontWeight:"700",
    paddingBottom:60,
    marginTop:-80

  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
});

export default AddDateScreen;