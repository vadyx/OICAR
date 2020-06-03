import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Video } from 'expo-av';

import CategoryExplore from '../../components/CategoryExplore';
import FeaturedVehicle from '../../components/FeaturedVehicle';
import Logo from "../../components/Logo";
import * as vehicleDataActions from '../../store/actions/vehicleData';
import { theme } from "../../utils/theme";

const { height, width } = Dimensions.get('window');

const _renderCategoryItem = (item) => {
  return (
    <CategoryExplore
      key={item.id} 
      imageUri={item.imageUri}
      name={item.name}
    />
  );
}

const ExploreScreen = props => { 

  const categories = useSelector(state => state.vehicleData.categories);
  const dispatch = useDispatch();

  if (categories.length === 0) {
    try {
      dispatch(vehicleDataActions.loadCategories());
    } catch (error) {
      //error handling
    }
  }

  let startHeaderHeight = 80;
  if (Platform.OS == 'android') {
      startHeaderHeight = 58 + StatusBar.currentHeight
  }

  return (
    <SafeAreaView style={styles.safeareastyle}>
      <View style={styles.container}>
        <View style={styles.logo_search_container}>

          <Logo style={styles.logostyle}/>

          <View style={styles.search_container}>

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

          <View style={styles.dataContainer}>

            <View style={styles.category_video_container}>

              <Text style={styles.textstyle}>
                Kategorije vozila
              </Text>
                      
              <View style={styles.category_container}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>

                  {categories.map(item => _renderCategoryItem(item))}

                </ScrollView>
              </View>
                      
              <View style={styles.video_container}>
                
                <Text style={styles.textstyle1}>
                  Turistička opcija
                </Text>
                
                <Text style={styles.textstyle2}>
                  Odaberite idealan brod za sebe i započnite svoje nezaboravno plovljenje Jadranom!
                </Text>
                          
                <View style={styles.video_view}>
                    <Video
                        source={require("../../assets/Boat.mp4")}
                        rate={1.0}
                        isMuted={true}
                        resizeMode="contain"
                        shouldPlay={!!props.isFocused}
                        isLooping
                        style={styles.video1}
                      />
                </View>

              </View>

            </View>
            
            <View style={styles.home_container}>
              <View style={styles.vehicle_text_container}>
                <Text style={styles.textstyle}>
                  Vozila širom Hrvatske
                </Text>
                        
                <View style={styles.home_view}>
                  <FeaturedVehicle width={152}
                    height={210}
                    imageUri={require('../../assets/scooter.jpg')}
                    name="Aprilia Scooter 1"
                    type="Motocikl"
                    price={20}
                    rating={4}
                    imageHeight={Platform.OS === "web" ? 200 : 110}
                    pricetime="tjedan"
                    widthbrand="50%"
                    widthprice="50%"
                    brand = "Aprilia"
                    model="1"
                  />
                  
                  <FeaturedVehicle width={152}
                    height={210}
                    imageUri={require('../../assets/audia3.jpg')}
                    name="Audi A3 TOP"
                    type="Automobil"
                    price={42}
                    rating={3.5}
                    imageHeight={Platform.OS === "web" ? 200 : 110}
                    pricetime="dan"
                    widthbrand="50%"
                    widthprice="50%"
                    brand = "Audi"
                    model="A3"
                  />

                  <FeaturedVehicle width={152}
                    height={210}
                    imageUri={require('../../assets/car3.jpg')}
                    name="Fiat Punto"
                    type="Automobil"
                    price={30}
                    rating={4.5}
                    imageHeight={Platform.OS === "web" ? 200 : 110}
                    pricetime="sat"
                    widthbrand="50%"
                    widthprice="50%"
                    brand = "Fiat"
                    model="Punto"
                  />

                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    logo_search_container:{
      paddingTop:10,
      height:90,
      flexDirection:'row',
      backgroundColor: 'white',
      borderBottomWidth:0, //samo radi na iOS
      shadowOffset: { width: 5, height: 3 },
      shadowColor: "black",
      shadowOpacity: 0.5,
      //samo radi na Android
      elevation: 5,
      justifyContent: Platform.OS === "web" ? "center" : null
    },
    search_container:{
      flexDirection: 'row',
      padding: 5,
      width: Platform.OS === "web" ? "40%" : "80%",
      height:40,
      backgroundColor: Platform.OS === "web" ? '#e1ede7' : 'white',
      marginHorizontal: 10,
      borderRadius:10,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: 'black',
      shadowOpacity: 0.2,
      elevation: 2,
      marginTop: Platform.OS == 'android' ? 30 : null
    },
    category_video_container:{
      flex: 1,
      backgroundColor: 'white',
      paddingTop:  20,
      paddingLeft: Platform.OS === "web" ? 50 : null
    },
    category_container:{
      height: 130,
      marginTop: 20
    },
    video_container:{
      marginTop: 0,
      paddingVertical:20,
      paddingHorizontal: 20,
      height:300
    },
    video_view:
    {
      width: Platform.OS === "web" ? width : width - 40,
      height: Platform.OS === "web" ? 450 : 200,
      marginTop: 20,
      borderRadius:10,
      overflow:"hidden"
    },
    home_container:{
      marginTop: Platform.OS === "web" ? 0 : 40
    },
    home_view:{
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: Platform.OS === "web" ? 'column' : 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    safeareastyle:{
      flex: 1
    },
    vehicle_text_container:{
      paddingRight: Platform.OS === "web" ? 60 : 0
    },
    logostyle:{
      width:45,
      height:45,
      marginTop: Platform.OS === "web" ? 0 : 28,
      marginLeft:10
    },
    iconstyle:{
      marginHorizontal:10,
      marginTop:4
    },
    textinputstyle:{
      flex: 1,
      fontWeight: '700',
      backgroundColor: 'white',
      textAlign: Platform.OS === "web" ? "center" : null 
    },
    scrollviewstyle:{
      backgroundColor:'white',
      flex: 1
    },
    dataContainer: {
      flexDirection: Platform.OS === "web" ? 'row' : null
    },
    textstyle:{
      fontSize: 24,
      fontWeight: '700',
      paddingHorizontal: 20
    },
    textstyle1:{
      fontSize: 24,
      fontWeight: '700',
      color:theme.colors.black
    },
    textstyle2:{
      fontWeight: '100',
      fontSize: Platform.OS === "web" ? 18 : 14,
      marginTop: 10,
      color:theme.colors.black
    },
    video1:{
      width: Platform.OS === "web" ? "50%" : "100%",
      height:"100%"
    },
    touchableopacity1:{
      flex:1
  }
});


export default withNavigationFocus(ExploreScreen);