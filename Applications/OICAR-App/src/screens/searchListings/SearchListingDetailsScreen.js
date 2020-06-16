import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SliderBox } from "react-native-image-slider-box";

import BackButton from '../../components/BackButton';
import * as maps from '../../utils/mapsApi';
import { theme } from '../../utils/theme';

const SearchListingDetailsScreen = props => {

    const listing = useSelector(state => state.listings.selectedListing);

    const [mapPreview, setMapPreview] = useState(null);
    const [address, setAddress] = useState(null);

    const _loadMapPreview = useCallback(async () => {
        const imagePreviewUrl = await maps.fetchStaticMap(listing.coordinates.lat, listing.coordinates.lng);
        setMapPreview(imagePreviewUrl);
    }, [setMapPreview]);
    
    const _fetchAddress = useCallback(async () => {
        const formattedAddr = await maps.fetchGeolocation(listing.coordinates.lat, listing.coordinates.lng);
        setAddress(formattedAddr);
    }, [setAddress]);

    useEffect(() => {
        _loadMapPreview();
        _fetchAddress();
    }, [_loadMapPreview, _fetchAddress]);

    return (
        <SafeAreaView style={styles.saw}>
            <View style={styles.container}>

                <View style={styles.headerstyle}>
                    <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
                    <Text style={styles.headertext}>{listing.title}</Text>
                </View>
                <ScrollView>
                    <SliderBox
                        images={listing.images}
                        dotColor={theme.colors.darkgray}
                        height={250}
                        imageLoadingColor={theme.colors.primary}    
                    />
                    <View style={styles.maininfo}>
                        <View style={styles.branadmodelbox}>
                            <Text style={styles.textbox}>{listing.vehicle.manufacturer}</Text>
                            <Text style={styles.textbox2}>{listing.vehicle.model}</Text>
                        </View>
                        <View style={styles.branadmodelbox}>
                            <Text style={styles.textbox}>{listing.vehicle.subcategory}</Text>
                        </View>
                        <View style={styles.branadmodelbox}>
                            <Text style={styles.textboxprice1}>{listing.price} kn</Text>
                            <Text style={styles.texboxprice2}>/ {listing.pricePeriod}</Text>
                        </View>
                    </View>
                    <View style={styles.reservationcontainer}>
                        <TouchableOpacity style={styles.reservationbutton}>
                            <Text style={styles.reservationtext}>Rezerviraj</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infocontainer}>
                        <Text style={styles.headerinfo}>Osnovne informacije:</Text>
                        <View style={styles.infocontent}>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>Snaga Motora:</Text>
                                <Text style={styles.textinfoboxresult}>{listing.vehicle.enginePower}</Text>
                            </View>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>Broj prijeđenih kilometara:</Text>
                                <Text style={styles.textinfoboxresult}>{listing.vehicle.kms}</Text>
                            </View>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>Godište:</Text>
                                <Text style={styles.textinfoboxresult}>{listing.vehicle.year}</Text>
                            </View>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>Gorivo:</Text>
                                <Text style={styles.textinfoboxresult}>{listing.vehicle.fuel}</Text>
                            </View>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>Tip prijenosa:</Text>
                                <Text style={styles.textinfoboxresult}>{listing.vehicle.gearShift}</Text>
                            </View>
                        </View>
                        <Text style={styles.headerinfo}>Dodatne informacije:</Text>
                        <View style={styles.infocontent}>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>Pogon:</Text>
                                <Text style={styles.textinfoboxresult}>{listing.vehicle.drive === "" ? "Nedefinirano" : listing.vehicle.drive}</Text>
                            </View>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>Dodatna oprema</Text>
                                <View>
                                    {listing.vehicle.accessories.length > 0 ? (
                                        listing.vehicle.accessories.map((item, i) => 
                                            <Text key={i} style={styles.textinfoboxresult}>
                                                 -  {item}
                                            </Text>
                                        )
                                    ) : (
                                        <Text style={styles.textinfoboxresult}>
                                            Nedefinirano
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                        <Text style={styles.headerinfo}>Detaljan opis:</Text>
                        <View style={styles.infocontent}>
                            <View style={styles.infoitems}>
                                <Text style={styles.textinfobox}>
                                    {listing.description}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.headerinfo}>Lokacija:</Text>
                        <View style={styles.infocontentmap}>
                            <View style={styles.infoitemsmap}>
                            {mapPreview !== null && 
                                <Image 
                                    style={styles.map} 
                                    source={{ uri: mapPreview }} 
                                />
                            }
                            {address !== null &&
                                <View style={styles.locationtext}>
                                    <Text style={styles.textinfoboxresultmap}>{address.street}</Text>
                                    <Text style={styles.textinfoboxresultmap}>{address.city}</Text>
                                    <Text style={styles.textinfoboxresultmap}>{address.country}</Text>
                                </View>
                            }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    saw:{
        flex:1
    },
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
        marginTop:getStatusBarHeight(),
        paddingBottom:10
    },
    headerstyle:{
        height:60,
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor:theme.colors.white,
    },
    headertext:{
        color:theme.colors.primary,
        alignSelf:"center",
        textAlign:"center",
        fontWeight:"700",
        fontSize:20,
        width:"80%",
        paddingLeft:10
    },
    backandexit:{
        top:null,
        alignSelf:"center",
        width:"20%"
    },
    content:{
        alignItems:"center"
    },
    maininfo:{
        marginTop:15,
        justifyContent:"center",
        flexDirection:"row"
    },
    branadmodelbox:{
        backgroundColor:theme.colors.white,
        borderRadius:20,
        borderWidth:0.1,
        marginHorizontal:10,
        width:"28%",
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    textbox:{
        textAlign:"center",
        fontSize:19,
        fontWeight:"700"
    },
    textbox2:{
        textAlign:"center",
        fontSize:16,
        fontWeight:"500"
    },
    textboxprice1:{
        textAlign:"center",
        fontSize:17,
        fontWeight:"700",
        color:theme.colors.primary,
    },
    texboxprice2:{
        textAlign:"center",
        fontSize:15,
        fontWeight:"500",
        color:theme.colors.primary,
    },
    infocontainer:{
        marginTop:5,
        marginBottom:20,
        justifyContent:"center",
        alignSelf:"center",
    },
    infocontent:{
        width:Dimensions.get('window').width - 40,
        padding:5,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor:theme.colors.white,
    },
    infocontentmap:{
        marginRight:10
    },
    infoitems:{
        padding:10,
        flexDirection:"row",
    },
    infoitemsmap:{
        padding:10,
    },
    infoitemsextra:{
        padding:10
    },
    textinfobox:{
        textAlign:"left",
        paddingLeft:5,
        fontSize:17,
        fontWeight:"500"
    },
    textinfoboxextra:{
        textAlign:"left",
        paddingLeft:5,
        fontSize:17,
        fontWeight:"500",
        color:theme.colors.primary
    },
    textinfoboxresult:{
        textAlign:"left",
        paddingLeft:7,
        fontSize:17,
        fontWeight:"700",
        color:theme.colors.primary
    },
    textinfoboxresultmap:{
        textAlign:"center",
        paddingLeft:7,
        fontSize:18,
        fontWeight:"600",
        color:theme.colors.primary
    },
    headerinfo:{
        paddingVertical:15,
        paddingLeft:5,
        fontSize:20,
        fontWeight:"700"
    },
    reservationcontainer:{
        alignItems:"center",
        justifyContent:"center",
        marginVertical:25
    },
    reservationbutton:{
        width:180,
        alignItems:"center",
        textAlign:"center",
        padding:15,
        borderRadius:20,
        backgroundColor:theme.colors.gold,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    reservationtext:{
        fontSize:20,
        color:theme.colors.white,
        fontWeight:"600"
    },
    map:{
        alignSelf:"center",
        width:270,
        height:270,
        borderRadius:135
    },
    locationtext:{
        marginTop:20
    }

});

export default SearchListingDetailsScreen;