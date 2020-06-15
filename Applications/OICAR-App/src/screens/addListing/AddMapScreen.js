import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

import BackButton from '../../components/BackButton';
import NextScreenButton from '../../components/NextScreenButton';
import * as newListingActions from '../../store/actions/newListing';
import { theme } from '../../utils/theme';

const defaultLocation = {
  lat: 45.813170,
  lng: 15.977279
};

const AddMapScreen = props => {
  
  const startingLocation = props.navigation.getParam('startingLocation');
  
  const [selectedLocation, setSelectedLocation] = useState(startingLocation);

  const dispatch = useDispatch();

  const mapRegion = {
    latitude: startingLocation ? startingLocation.lat : defaultLocation.lat,
    longitude: startingLocation ? startingLocation.lng : defaultLocation.lng,
    latitudeDelta: 0.0115,
    longitudeDelta: 0.0054
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  const _onSelectedLocation = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  const _onNextPressed = async () => {
    await dispatch(newListingActions.setCoordinates(selectedLocation));
    props.navigation.navigate('AddLocation');
  };

  return (
    <View style={styles.container}>
        
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        onPress={_onSelectedLocation}>
        {markerCoordinates &&
          <Marker
          title='Odabrana lokacija'
          coordinate={markerCoordinates}>
          </Marker>
        }
      </MapView>

      <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
      
      <NextScreenButton 
        style={styles.nsbstyle} 
        navigate={_onNextPressed}>
        <Text style={styles.nsbtextstyle}>Potvrdi</Text>
      </NextScreenButton> 
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      marginTop:getStatusBarHeight(),
      backgroundColor:theme.colors.white
  },
  backandexit:{
      marginTop:-getStatusBarHeight()
  },
  map:{
    flex: 1
  },
  nsbstyle:{
      height:50,
      width:150,
      position:"absolute",
      paddingLeft:20,
      flexDirection:"row"
    },
  nsbtextstyle:{
    fontSize:20,
    paddingBottom:5,
    fontWeight:"600",
    color:theme.colors.white
  },
});

export default AddMapScreen;