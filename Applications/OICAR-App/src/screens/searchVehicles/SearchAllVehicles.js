import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { theme } from '../../utils/theme';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BackButton from '../../components/BackButton';
import { ScrollView } from 'react-native-gesture-handler';
import FeaturedVehicle from '../../components/FeaturedVehicle';

const width = Math.round(Dimensions.get('window').width) -50;
const height = 230;
const imgsize = 140;
const descbrandsize = "80%";
const descpricesize = "20%";

const SearchAllVehicles = props => {

  return (
    <SafeAreaView style={styles.sav}>
    <View style={styles.container}>
            <View style={styles.headerstyle}>
                <BackButton style={styles.backandexit} goBack={() => props.navigation.goBack()} />
                <Text style={styles.headertext}>Automobili</Text>
            </View>
            <ScrollView style={styles.scv}>
                <View style={styles.sortfilter}>
                    <TouchableOpacity style={styles.tosort}><Text style={styles.totext}>Sortiraj</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.tofilter}><Text style={styles.totext}>Filtriraj</Text></TouchableOpacity>
                </View>
                <View style={styles.listads}>
                    <FeaturedVehicle width={width}
                        height={height}
                        imageUri={require('../../assets/scooter.jpg')}
                        name="Aprilia Scooter 1"
                        type="Motocikl"
                        price={20}
                        rating={4}
                        imageHeight={imgsize}
                        pricetime="dan"
                        widthbrand={descbrandsize}
                        widthprice={descpricesize}
                        brand = "Aprilia"
                        model="1"
                    />
                    <FeaturedVehicle width={width}
                    height={ Platform.OS === "web" ? height * 0.9 : height}
                    imageUri={require('../../assets/car3.jpg')}
                    name="Fiat Punto"
                    type="Automobil"
                    price={30}
                    rating={4.5}
                    imageHeight={imgsize}
                    pricetime="tjedan"
                    widthbrand={descbrandsize}
                    widthprice={descpricesize}
                    brand="Fiat"
                    model="Punto"
                    />
                    <FeaturedVehicle width={width}
                        height={height}
                        imageUri={require('../../assets/scooter.jpg')}
                        name="Aprilia Scooter 1"
                        type="Motocikl"
                        price={20}
                        rating={4}
                        imageHeight={imgsize}
                        widthbrand={descbrandsize}
                        widthprice={descpricesize}
                        brand="Aprilia"
                        model="1"
                        
                    />
                    <FeaturedVehicle width={width}
                        height={height}
                        imageUri={require('../../assets/truckcategory.jpg')}
                        name="Volvo c3"
                        type="Motocikl"
                        price={20}
                        rating={4}
                        imageHeight={imgsize}
                        widthbrand={descbrandsize}
                        widthprice={descpricesize}
                        brand="Volvo"
                        model="C3"
                    />
                    <FeaturedVehicle width={width}
                        height={height}
                        imageUri={require('../../assets/motorbikecategory.jpg')}
                        name="Harley Davison"
                        type="Motocikl"
                        price={20}
                        rating={4}
                        imageHeight={imgsize}
                        widthbrand={descbrandsize}
                        widthprice={descpricesize}
                    />
                    <FeaturedVehicle width={width}
                        height={height}
                        imageUri={require('../../assets/scooter.jpg')}
                        name="Aprilia Scooter 1"
                        type="Motocikl"
                        price={20}
                        rating={4}
                        imageHeight={imgsize}
                        widthbrand={descbrandsize}
                        widthprice={descpricesize}
                        brand = "Aprilia"
                        model="1"
                    />
                </View>
            </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    sav:{
        flex:1
    },
    container:{
        flex:1,
        backgroundColor:theme.colors.white,
        alignItems:"center",
        justifyContent:"flex-start",
        marginTop:getStatusBarHeight(),
        overflow:"hidden",
    },
    headerstyle:{
        height:60,
        width:"100%",
        justifyContent:"center",
        backgroundColor:theme.colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backandexit:{
        top:null,
    },
    headertext:{
        color:theme.colors.primary,
        alignSelf:"center",
        fontWeight:"700",
        fontSize:20,
    },
    sortfilter:{
        marginTop:25,
        alignSelf:"center",
        flexDirection:"row",
        height:40,
        width:"80%",
        borderRadius:30,
        borderColor:theme.colors.lightplusgrey,
        borderWidth:1,
        elevation:3,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:theme.colors.white
    },
    tosort:{
        width:"50%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        borderRightWidth:1,
        borderColor:theme.colors.lightplusgrey
    },
    tofilter:{
        width:"50%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        borderLeftWidth:1,
        borderColor:theme.colors.lightplusgrey
    },
    totext:{
        fontSize:15,
        fontWeight:"600",
        color:theme.colors.darkgray
    },
    listads:{
        paddingHorizontal:18,
        marginTop: 20,
        paddingTop:20,
        flexDirection:'column'
    }
});

export default SearchAllVehicles;