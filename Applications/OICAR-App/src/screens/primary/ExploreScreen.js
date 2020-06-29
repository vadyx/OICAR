import React, { useState, useEffect, useCallback } from "react";
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
import ListingCard from '../../components/ListingCard';
import Logo from "../../components/Logo";
import * as vehicleDataActions from '../../store/actions/vehicleData';
import * as listingsActions from '../../store/actions/listings';
import { theme } from "../../utils/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get('window').width/2 - 30;

const ExploreScreen = props => { 

  const [loadingListings, setLoadingListings] = useState(false);

  const categories = useSelector(state => state.vehicleData.categories);
  const hightlightedListings = useSelector(state => state.listings.hightlightedListings);
  const dispatch = useDispatch();

  //console.log(hightlightedListings);

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

  const _highlightedListingsLoad = useCallback(async () => {
    await dispatch(listingsActions.loadHighlightedListings());
  }, [dispatch]);

  const _onCategoryPressed = async (categoryID) => {
    await dispatch(listingsActions.clearPreviousList());
    await dispatch(listingsActions.setCategory(categoryID));
    props.navigation.navigate('Listings');
  };

  const _onListingPressed = async (id) => {
    await dispatch(listingsActions.loadSelectedListing(id));
    props.navigation.navigate('ListingDetails');
}

  const _renderCategoryItem = (item) => {
    return (
      <CategoryExplore
        key={item.id}
        categoryID = {item.id}
        onCategoryPressed={_onCategoryPressed}
        imageUri={item.imageUri}
        name={item.name}
      />
    );
  }

  const _renderHighlightedItem = (item) => {
    return (
      <ListingCard 
        key={item.id}
        width={width}
        height={228}
        name={item.title}
        type={item.category}
        price={item.price}
        rating={item.rating}
        imageUri={`data:image/jpg;base64,${item.image}`}
        imageHeight={Platform.OS === "web" ? 200 : 110}
        pricetime={item.pricePeriod}
        onPress={() => _onListingPressed(item.id)}
        widthbrand="45%"
        widthprice="55%"
        brand={item.manufacturer}
        model={item.model}
      />
    );
  }

  useEffect(() => {
    setLoadingListings(true);
    _highlightedListingsLoad().then(() => {
      setLoadingListings(false);
    });
  }, [_highlightedListingsLoad]);

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
                  Rezervirajte već danas te započnite svoje nezaboravno plovljenje Jadranom!
                </Text>
                          
                <TouchableOpacity style={styles.video_view}>
                    <Video
                        source={require("../../assets/Boat.mp4")}
                        rate={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay={!!props.isFocused}
                        isLooping
                        style={styles.video1}
                      />
                </TouchableOpacity>

              </View>

            </View>
            
            <View style={styles.home_container}>
              <View style={styles.vehicle_text_container}>
                <Text style={styles.textstyle}>
                  Vozila širom Hrvatske
                </Text>
                        
                <View style={styles.home_view}>
                  {hightlightedListings.map(item => _renderHighlightedItem(item))}
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
      paddingTop:15,
      height:100,
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
      width: Platform.OS === "web" ? Dimensions.get('window').width : Dimensions.get('window').width - 50,
      height: Platform.OS === "web" ? 450 : 220,
      marginTop: 20,
      borderRadius:10,
      shadowColor: "#000",
      shadowOffset:{
          width: 0,
          height: 2,
          },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      backgroundColor:theme.colors.white,
      overflow:"hidden"
    },
    home_container:{
      marginTop: Platform.OS === "web" ? 0 : 70
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