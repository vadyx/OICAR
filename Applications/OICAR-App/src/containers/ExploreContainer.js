import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from '../components/Category'
import Home from '../components/Home'
import Logo from "../components/Logo"
import { Video } from 'expo-av';
const { height, width } = Dimensions.get('window')


const ExploreContainer = props => {

        let startHeaderHeight = 80;
        if (Platform.OS == 'android') {
            startHeaderHeight = 58 + StatusBar.currentHeight}

        return (
            <SafeAreaView style={styles.safeareastyle}>
                <View style={styles.container}>
                    <View style={styles.container1}>

                            <Logo style={styles.logostyle}/>

                        <View style={styles.container2}>

                            <Icon name="ios-search" size={22} style={styles.iconstyle} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Pokušaj brodovi u Splitu ...."
                                placeholderTextColor="grey"
                                style={styles.textinputstyle}
                            />
                        </View>
                    </View>

                    <ScrollView
                        scrollEventThrottle={16}
                        style={styles.scrollviewstyle}>

                      <View style={styles.container3}>

                            <Text style={styles.textstyle}>
                                Kategorije vozila
                            </Text>
                            
                            <View style={styles.container4}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <Category imageUri={require('../assets/carcategory.jpg')}
                                        name="Automobili"
                                    />
                                    <Category imageUri={require('../assets/motorbikecategory.jpg')}
                                        name="Motocikli"
                                    />
                                    <Category imageUri={require('../assets/truckcategory.jpg')}
                                        name="Kamioni"
                                    />
                                     <Category imageUri={require('../assets/bikecategory.jpg')}
                                        name="Bicikli"
                                    />
                                     <Category imageUri={require('../assets/boatcategory.jpg')}
                                        name="Brodovi"
                                    />
                                     <Category imageUri={require('../assets/campercategory.jpg')}
                                        name="Ostalo"
                                    />
                                </ScrollView>
                            </View>
                            <View style={styles.container5}>
                                <Text style={styles.textstyle1}>
                                    Turistička opcija
                                </Text>
                                <Text style={styles.textstyle2}>
                                   Odaberite brod i započnite svoje nezaboravno plovljenje Jadranom!
                                </Text>
                                <View style={styles.container6}>
                                  
                                    <Video
                                        source={require("../assets/Boat.mp4")}
                                        rate={1.0}
                                        isMuted={true}
                                        resizeMode="contain"
                                        shouldPlay
                                        isLooping
                                        style={styles.video1}
                                      />
                                   {/*}<Image
                                        style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                        source={require('../assets/boatmain.jpg')}
                                    />*/}
                                    
                                </View>
                            </View>
                        </View>
                        <View style={styles.container7}>
                            <Text style={styles.textstyle}>
                                Vozila širom Hrvatske
                            </Text>
                            <View style={styles.container8}>
                                <Home width={width}
                                    imageUri={require('../assets/scooter.jpg')}
                                    name="Aprilia Scooter 1"
                                    type="Motocikl"
                                    price={20}
                                    rating={4}
                                />
                                <Home width={width}
                                    imageUri={require('../assets/audia3.jpg')}
                                    name="Audi A3"
                                    type="Automobil"
                                    price={42}
                                    rating={3.5}
                                />
                                <Home width={width}
                                    imageUri={require('../assets/car3.jpg')}
                                    name="Fiat Punto"
                                    type="Automobil"
                                    price={30}
                                    rating={4.5}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    };

export default ExploreContainer;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    container1:{
      height:80,
      flexDirection:'row',
      backgroundColor: 'white',
      borderBottomWidth:0, //samo radi na iOS
      shadowOffset: { width: 5, height: 3 },
      shadowColor: "black",
      shadowOpacity: 0.5,
      //samo radi na Android
      elevation: 5

    },
    container2:{
      flexDirection: 'row',
      padding: 5,
      width:"80%",
      height:40,
      backgroundColor: 'white',
      marginHorizontal: 10,
      borderRadius:10,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'black',
      shadowOpacity: 0.2,
      elevation: 1,
      marginTop: Platform.OS == 'android' ? 30 : null
    },
    container3:{
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 20
    },
    container4:{
      height: 130,
      marginTop: 20
    },
    container5:{
      marginTop: 40,
      paddingHorizontal: 20
    },
    container6:
    {
      width: width - 40,
      height: 200,
      marginTop: 20,
      borderRadius:10,
      overflow:"hidden"
    },
    container7:{
      marginTop: 40
    },
    container8:{
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    safeareastyle:{
      flex: 1
    },
    logostyle:{
      width:45,
      height:45,
      marginTop:28,
      marginLeft:10
    },
    iconstyle:{
      marginHorizontal:10,
      marginTop:4
    },
    textinputstyle:{
      flex: 1,
      fontWeight: '700',
      backgroundColor: 'white' 
    },
    scrollviewstyle:{
      backgroundColor:'white'
    },
    textstyle:{
      fontSize: 24,
      fontWeight: '700',
      paddingHorizontal: 20
    },
    textstyle1:{
      fontSize: 24,
      fontWeight: '700'
    },
    textstyle2:{
      fontWeight: '100',
      marginTop: 10
    },
    video1:{
      width:"100%",
      height:"100%"
    }
});