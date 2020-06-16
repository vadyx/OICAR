import React,{useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useSelector } from 'react-redux';

import BackButton from '../../components/BackButton';
import ExitButton from '../../components/ExitButton';
import NextScreenButton from '../../components/NextScreenButton';
import { theme } from '../../utils/theme';
import * as maps from '../../utils/mapsApi';

const AddLocationScreen = props => {

  const selectedLocation = useSelector(state => state.newListing.coordinates);

  const [mapPreview, setMapPreview] = useState(null);
  const [address, setAddress] = useState(null);

  const _verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    return result.status === "granted";
  };

  let userLocation;
  const _onOpeningMap =  async () => {
    const hasPermission = await _verifyPermissions();

    if (hasPermission) {
      try {
        const currentPos = await Location.getCurrentPositionAsync({
          timeout: 5000,
          enableHighAccuracy: true
        });
  
        userLocation = {
          lat: currentPos.coords.latitude,
          lng: currentPos.coords.longitude,
        };

      } catch (error) {
        // error handling
      }
    }

    props.navigation.navigate('AddMap', { startingLocation: userLocation });
  };

  const _loadMapPreview = useCallback(async () => {
    if (selectedLocation !== null && selectedLocation !== undefined) {
      const imagePreviewUrl = await maps.fetchStaticMap(selectedLocation.lat, selectedLocation.lng);
      setMapPreview(imagePreviewUrl);
    }
  }, [setMapPreview, selectedLocation]);

  const _fetchAddress = useCallback(async () => {
    if (selectedLocation !== null && selectedLocation !== undefined) {
      const formattedAddr = await maps.fetchGeolocation(selectedLocation.lat, selectedLocation.lng);
      setAddress(formattedAddr);
    }
  }, [setAddress, selectedLocation]);

  const _onNextPressed = () => {
    props.navigation.navigate('AddPictures');
  };

  useEffect(() => {
    _loadMapPreview();
    _fetchAddress();
  }, [_loadMapPreview, _fetchAddress]);

  return (
    <View style={styles.container}>
        <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
        <ExitButton style={styles.backandexit} goBack={() => props.navigation.navigate('Add')} />
        <Text style={styles.headerstyle}>Lokacija vozila</Text>
        {mapPreview !== null ? 
          (
            <Image
              style={styles.img}
              source={{ uri: mapPreview }}
            />
          ) : (
            <Image 
              style={styles.img} 
              source={require('../../assets/mapimg.png')} 
            />
          )
        }
        
        {address !== null && 
          <View style={styles.descriptionbox}>
            <Text style={styles.descriptiontext}>{address.street}</Text>
            <Text style={styles.descriptiontext}>{address.city}</Text>
            <Text style={styles.descriptiontext}>{address.country}</Text>
          </View>
        }

        <NextScreenButton 
          style={styles.nsbstyle} 
          navigate={_onOpeningMap}>
          <Text style={styles.nsbtextstyle}>Odaberite na mapi</Text>
        </NextScreenButton>


        <NextScreenButton 
          disabled={mapPreview === null || address === null}
          navigate={_onNextPressed} 
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:getStatusBarHeight(),
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: theme.colors.white
  },
  headerstyle: {
    fontSize: 32,
    paddingBottom:40,
    textAlign:"center",
    fontWeight: '700',
  },
  backandexit:{
    marginTop:-getStatusBarHeight()
  },
  img:{
      width:"75%",
      height:"35%",
      borderRadius:20,
  },
  nsbstyle:{
    height:50,
    width:230,
    bottom:null,
    right:null,
    position:"relative",
    paddingLeft:20,
    flexDirection:"row"
  },
  nsbtextstyle:{
    fontSize:20,
    paddingBottom:5,
    fontWeight:"600",
    color:theme.colors.white
  },
  descriptionbox:{
      marginTop:10,
      marginBottom:20
  },
  descriptiontext:{
      textAlign:"center",
      fontSize:18,
      fontWeight:"400"
  }
});

export default AddLocationScreen;