import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import StarRating from "react-native-star-rating";

import BackButton from '../../components/BackButton';
import * as maps from '../../utils/mapsApi';
import * as reservationActions from '../../store/actions/reservation';
import { theme } from '../../utils/theme';

const ReservationVehicleUserScreen = props => {

    const reservation = useSelector(state => state.reservation.selectedUserReservation);

    const [mapPreview, setMapPreview] = useState(null);
    const [address, setAddress] = useState(null);
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();

    const _loadMapPreview = useCallback(async () => {
        const imagePreviewUrl = await maps.fetchStaticMap(reservation.coordinates.lat, reservation.coordinates.lng);
        setMapPreview(imagePreviewUrl);
    }, [setMapPreview]);
    
    const _fetchAddress = useCallback(async () => {
        const formattedAddr = await maps.fetchGeolocation(reservation.coordinates.lat, reservation.coordinates.lng);
        setAddress(formattedAddr);
    }, [setAddress]);

    const _onConfirmRating = async () => {
        await dispatch(reservationActions.setReservationRating(rating));
    };

    useEffect(() => {
        _loadMapPreview();
        _fetchAddress();
    }, [_loadMapPreview, _fetchAddress]);

    return (
        <View style={styles.container}>
            <ScrollView style={{flex:1,width:"100%",height:"100%"}}>
                <BackButton style={styles.back} goBack={() => props.navigation.goBack()}/>
                <Text style={styles.headerstyle}>Potvrda rezervacije</Text>

                <Image style={styles.mainimage} source={{ uri: `data:image/jpg;base64,${reservation.image}`}}/>
                <View style={styles.infoboxstyle}>
                    <View style={styles.inforow}>
                        <Text style={styles.namestyle}>Rezervacija broj:</Text>
                        <Text style={styles.namestyle}>{reservation.id}</Text>
                    </View>
                    <View style={styles.hl}/>
                    <View style={styles.inforow}>
                        <Text style={styles.namestyle}>Naziv oglasa:</Text>
                        <Text style={styles.namestyle}>{reservation.title}</Text>
                    </View>
                    <View style={styles.hl}/>
                    <View style={styles.inforow}>
                        <Text style={styles.namestyle}>Cijena ukupno:</Text>
                        <Text style={styles.namestyle}>{reservation.price} kn</Text>
                        <TouchableOpacity style={styles.detailinfo}>
                            <AntDesign name="questioncircle" size={20} color={theme.colors.lightgrey} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.hl}/>
                    <View style={styles.inforow}>
                        <Text style={styles.namestyle}>Marka:</Text>
                        <Text style={styles.namestyle}>{reservation.manufacturer}</Text>
                    </View>
                    <View style={styles.hl}/>
                    <View style={styles.inforow}>
                        <Text style={styles.namestyle}>Model:</Text>
                        <Text style={styles.namestyle}>{reservation.model}</Text>
                    </View>
                    <View style={styles.hl}/>
                    <View style={styles.dateboxstyle}>
                        <View style={styles.datesubbox}>
                            <Text style={styles.datesubtext}>Od</Text>
                            <Text style={styles.brandstyle}>{reservation.displayStartDate}</Text>
                        </View>
                        <View style={styles.datesubbox}>
                            <Text style={styles.datesubtext}>Do</Text>
                            <Text style={styles.brandstyle}>{reservation.displayEndDate}</Text>
                        </View>
                    </View>
                    <View style={styles.hl}/>
                    <View style={styles.locationbox}>
                        {mapPreview !== null && 
                            <Image 
                                style={styles.mapimg} 
                                source={{ uri: mapPreview }} 
                            />
                        }
                        {address !== null &&
                            <View style={styles.mapinfobox}>
                                <Text style={styles.maptextinfo}>{address.street}</Text>
                                <Text style={styles.maptextinfo}>{address.city}</Text>
                                <Text style={styles.maptextinfo}>{address.country}</Text>
                            </View>
                        }
                    </View>
                    <Text style={styles.fn}>*Lokacija preuzimanja vozila</Text>
                    <View style={styles.hl}/>
                    <Text style={styles.headercontact}>Kontakt informacije iznajmljivača</Text>
                    <View style={styles.contactbox}>
                        <View style={styles.profileImage}>
                            <Image source={{ uri: reservation.user.imageUri }} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.contactsubbox}>
                            <Text style={styles.contactinfodesctext}>Ime i prezime:</Text>
                            <Text style={styles.contactinfotext}>{reservation.user.firstName} {reservation.user.lastName}</Text>
                        </View>
                        <View style={styles.contactsubbox}>
                            <Text style={styles.contactinfodesctext}>Email:</Text>
                            <Text style={styles.contactinfotext}>{reservation.user.email}</Text>
                        </View>
                        <View style={styles.contactsubbox}>
                            <Text style={styles.contactinfodesctext}>Broj telefona:</Text>
                            <Text style={styles.contactinfotext}>{reservation.phoneNr}</Text>
                        </View>
                        {reservation.rating === null &&
                            <View style={styles.contactsubstarbox}>
                                <Text style={styles.contactinfodescstartext}>Ocijenite iznajmljivača</Text>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={rating}
                                    starSize={25}
                                    emptyStarColor={theme.colors.quaternary}
                                    fullStarColor={theme.colors.gold}
                                    selectedStar={(rating) => setRating(rating)}
                                />
                                <TouchableOpacity  style={styles.starratingbutton} onPress={_onConfirmRating}>
                                    <Text style={styles.starratingbuttontext}>Ocijeni</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"flex-start",
    justifyContent:"flex-start",
    marginTop:0,
    backgroundColor: theme.colors.white
  },
  headerstyle: {
    fontSize: 30,
    marginBottom:25,
    marginTop:40,
    color:theme.colors.black,
    alignSelf:"center",
    textAlign:"center",
    fontWeight: '600',
  },
  back:{
    marginTop:-getStatusBarHeight(),
  },
  mainimage:{
    width:240,
    height:140,
    alignSelf:"center",
    borderRadius:25,
    resizeMode:"cover",
  },
  detailinfo:{
    alignSelf:"center",
    marginLeft:10
  },
  brandmodelbox:{
      flexDirection:"row",
  },
  brandstyle:{
      fontSize:18,
      color:theme.colors.black
  },
  modelstyle:{
      fontSize:18,
      paddingHorizontal:10,
      color:theme.colors.black
  },
  infoboxstyle:{
      marginHorizontal:20,
      marginVertical:20
  },
  namestyle:{
      fontSize:18,
      color:theme.colors.black,
      paddingLeft:5
  },
  dateboxstyle:{
      flexDirection:"row",
      paddingLeft:5
  },
  locationbox:{
      flexDirection:"row"
  },
  mapimg:{
      width:200,
      height:200,
      borderRadius:100,
      borderWidth:0.3,
      borderColor:theme.colors.black
  },
  mapinfobox:{
      justifyContent:"center",
      marginLeft:10
  },
  maptextinfo:{
      fontSize:18,
      fontStyle:"italic",
      paddingBottom:3,
      color:theme.colors.black
  },
  contactbox:{
      backgroundColor:theme.colors.white,
      marginVertical:10,
      alignItems:"center",
      alignSelf:"center",
      padding:30,
      borderRadius:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
    },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
  },
  headercontact:{
      alignSelf:"center",
      fontSize:20,
      fontWeight:"bold",
      marginTop:15,
      marginBottom:5,
      color:theme.colors.black
  },
  datesubbox:{
      marginRight:20
  },
  datesubtext:{
      fontSize:14,
      color:theme.colors.black
  },
  contactinfotext:{
      fontSize:18,
      color:theme.colors.black,
      fontWeight:"600",
      paddingLeft:7
  },
  contactinfodescstartext:{
    fontSize:18,
    color:theme.colors.primary,
    fontWeight:"bold",
    marginBottom:15
  },
  contactinfodesctext:{
      fontSize:18,
      color:theme.colors.primary,
      fontWeight:"bold"
    },
  hl:{
      borderBottomWidth:1,
      width:"100%",
      borderColor:theme.colors.lightgrey,
      marginVertical:14,
  },
  contactsubbox:{
      flexDirection:"row",
      marginBottom:3
  },
  contactsubstarbox:{
      flexDirection:"column",
      marginTop:30
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
        marginBottom:5
    },
    inforow:{
        flexDirection:"row"
    },
    fn:{
        fontSize:10,
        alignSelf:"flex-end"
    },
    back:{
        marginTop:-getStatusBarHeight()
    },
    starratingbutton:{
        alignSelf:"center",
        marginTop:20,
        backgroundColor:theme.colors.primary,
        borderRadius:20
    },
    starratingbuttontext:{
        fontSize:18,
        color:theme.colors.white,
        paddingVertical:10,
        paddingHorizontal:16,
        fontWeight:"bold"

    }
});

export default ReservationVehicleUserScreen;