import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExploreContainer from '../containers/ExploreContainer';
import InboxContainer from '../containers/InboxContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SearchContainer from '../containers/SearchContainer';
import AddContainer from '../containers/AddContainer';
import { theme } from '../utils/theme';
import { AntDesign,MaterialIcons,SimpleLineIcons } from '@expo/vector-icons';

const LoggedInTabNavigator = createBottomTabNavigator({

  Explore: {
    screen: ExploreContainer,
    navigationOptions: {
      tabBarLabel: 'EXPLORE',
      tabBarIcon:({ tintColor }) => (
        <AntDesign name="home" size={32} color={tintColor} />
      )
    },
  },
  Search: {
    screen: SearchContainer,
    navigationOptions: {
      tabBarLabel: 'SEARCH',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="search1" color={tintColor} size={30} />
      )
    },
  },
  Add: {
    screen: AddContainer,
    navigationOptions: {
      tabBarLabel: 'ADD',
      tabBarIcon: ({ tintColor }) => (
        <SimpleLineIcons name="plus" color={tintColor} size={30} />
      )
    },
  },
  Inbox: {
    screen: InboxContainer,
    navigationOptions: {
      tabBarLabel: 'INBOX',
      tabBarIcon: ({ tintColor }) => (
          <AntDesign name="message1" color={tintColor} size={30} />
        )
      },
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: {
      tabBarLabel: 'PROFILE',
      tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="person-outline" color={tintColor} size={36} />
        )
      },
  },
}, 

{
  tabBarOptions: {
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


export default createAppContainer(LoggedInTabNavigator);