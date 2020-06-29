import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { theme } from '../utils/theme';
import { AntDesign,SimpleLineIcons,Feather } from '@expo/vector-icons';

import {
  AuthScreen,
  LoginScreen,
  RegistrationScreen,
  ForgotPasswordScreen,
  AddListingScreen,
  ExploreScreen,
  InboxScreen,
  ProfileScreen,
  SearchScreen,
  AddCategoryScreen,
  AddModelScreen,
  AddTitleScreen,
  AddBasicInfoScreen,
  AddDescriptionScreen,
  AddPriceScreen,
  AddDateScreen,
  AddLocationScreen,
  AddMapScreen,
  AddPicturesScreen,
  SearchListingsScreen,
  SearchFilterScreen,
  SearchListingDetailsScreen,
  ReservationDateScreen,
  ReservationPayScreen,
  ProfileListingsScreen,
  ReservedVehicleUserScreen,
  ReservedVehicleRenterScreen,
  ReservedUserListingScreen,
  ReservedRenterListingScreen
} from '../screens';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const ReservedUserNavigator = createStackNavigator(
  {
    ReservedUserListing:ReservedUserListingScreen,
    ReservedUser:ReservedVehicleUserScreen
  },
  {
    headerMode:"none",
  }
);

const ReservedRenterNavigator = createStackNavigator(
  {
    ReservedRenterListing:ReservedRenterListingScreen,
    ReservedRenter: ReservedVehicleRenterScreen
  },
  {
    headerMode:"none",
  }
);

const TopTabNavigator = createMaterialTopTabNavigator({
  ReservedUserNav:{
    screen: ReservedUserNavigator,
    navigationOptions:{
      tabBarLabel:"Unajmljena vozila"
    }
  },
  ReservedRenterNav:{
    screen: ReservedRenterNavigator,
    navigationOptions:{
      tabBarLabel:"Iznajmljena vozila"
    }
  }
},
{
  swipeEnabled:true,
  initialRouteName:'ReservedUserNav',
  tabBarOptions:{
    activeTintColor:theme.colors.white,
    inactiveTintColor:theme.colors.lightgrey,
    allowFontScaling:true,
    pressColor:theme.colors.primary,
    indicatorStyle:{borderBottomColor:theme.colors.white, borderBottomWidth:3,},
    style:{backgroundColor:theme.colors.primary},
    labelStyle:{fontWeight:'bold',marginTop:getStatusBarHeight()+15,marginBottom:15}
  }
}
)

const ExploreNavigator = createStackNavigator(
  {
    Explore: ExploreScreen,
    ListingDetails: SearchListingDetailsScreen
  },
  {
    headerMode:"none",
  }
);

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Listings: SearchListingsScreen,
    Filter: SearchFilterScreen,
    ListingDetails: SearchListingDetailsScreen,
    ReservationDate: ReservationDateScreen,
    ReservationPay: ReservationPayScreen,
  },
  {
    headerMode:"none",
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    MyListings: ProfileListingsScreen,
    ListingDetails: SearchListingDetailsScreen,
    ReservedVehicle: TopTabNavigator
  },
  {
    headerMode:"none",
  }
);

const HomeTabNavigator = createBottomTabNavigator({

  Explore: {
    screen: ExploreNavigator,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon:({ tintColor }) => (
        <AntDesign name="home" size={32} color={tintColor} />
      )
    },
  },

  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarLabel: 'SEARCH',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="search1" color={tintColor} size={30} />
      )
    },
  },

  Add: {
    screen: AddListingScreen,
    navigationOptions: {
      tabBarLabel: 'ADD',
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons name="plus" color={tintColor} size={30} />
      )
    },
  },

  Inbox: {
    screen: InboxScreen,
    navigationOptions: {
      tabBarLabel: 'INBOX',
      tabBarIcon: ({ tintColor }) => (
          <AntDesign name="message1" color={tintColor} size={30} />
        )
      },
  },

  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
          <Feather name="user" color={tintColor} size={30} />
        )
      },
  },
}, 

{
  tabBarOptions: {
    keyboardHidesTabBar:false,
    showLabel: false,
    activeTintColor: theme.colors.primary,
    inactiveTintColor: theme.colors.quaternary,

    style: {
      backgroundColor: "white",
      borderTopWidth: 0,
      //samo radi na iOS
      shadowOffset: { width: 5, height: 3 },
      shadowColor: "black",
      shadowOpacity: 0.5,
      //samo radi na Android
      elevation: 5
    }
  }
});

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    headerMode: 'none',
  }
);

const AddNavigator = createStackNavigator(
  {
    AddCategory: AddCategoryScreen,
    AddModel: AddModelScreen,
    AddTitle: AddTitleScreen,
    AddBasicInfo: AddBasicInfoScreen,
    AddDescription: AddDescriptionScreen,
    AddPrice: AddPriceScreen,
    AddDate: AddDateScreen,
    AddLocation: AddLocationScreen,
    AddMap:AddMapScreen,
    AddPictures: AddPicturesScreen    
  },

  {
    headerMode:"none",
  }
);

const MainNavigator = createStackNavigator({
  Home: HomeTabNavigator,
  Auth: AuthNavigator,
  Add: AddNavigator
}, 
{
  headerMode: 'none'
});

export default createAppContainer(MainNavigator);