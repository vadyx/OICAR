import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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
  AddPicturesScreen,
  SearchListingsScreen,
  Vehicle
} from '../screens';

const SearchNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Listings: SearchListingsScreen,
    Vehicle: Vehicle
  },
  {
    headerMode:"none",
  }
)

const HomeTabNavigator = createBottomTabNavigator({

  Explore: {
    screen: ExploreScreen,
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
    screen: ProfileScreen,
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