import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';
import * as profileActions from '../store/actions/profile';
import { theme } from '../utils/theme';

/*All configuration -> https://github.com/santomegonzalo/react-native-floating-action*/

const ActionButton = props => {

  const dispatch = useDispatch();

  const _onOpeningListings = async () => {
    await dispatch(profileActions.clearPreviousList());
    props.navigation.navigate("MyListings");
  };

  const _onOpeningmyReservation = async () => {
    props.navigation.navigate("ReservedVehicle");
  };

  const _onButtonPressed = name => {
    switch(name) {
      case "btn_settings":
        break;
      case "btn_myListings":
        _onOpeningListings();
        break;
      case "btn_myReservation":
        _onOpeningmyReservation();
        break;
      case "btn_logout":
        dispatch(authActions.logout());
        break;
      default:
        break;
    }
  };

  const actions = [
    {
      text: "Postavke",
      buttonSize: 45,
      textBackground:theme.colors.primary,
      textStyle: {fontWeight:"bold",color:theme.colors.white},
      icon: require("../assets/settings_icon.png"),
      name: "btn_settings",
      position: 1,
      color:theme.colors.primary
    },
    {
      text: "Moji oglasi",
      buttonSize: 45,
      textBackground:theme.colors.darkgray,
      textStyle: {fontWeight:"bold",color:theme.colors.white},
      icon: require("../assets/items_icon.png"),
      name: "btn_myListings",
      position: 2,
      color:theme.colors.darkgray
    },
    {
      text: "Moje rezervacije",
      buttonSize: 45,
      textBackground:theme.colors.gray,
      textStyle: {fontWeight:"bold",color:theme.colors.white},
      icon: require("../assets/items_icon.png"),
      name: "btn_myReservation",
      position: 3,
      color:theme.colors.gray
    },
    {
      text: "Odjavite se",
      buttonSize: 45,
      textBackground:theme.colors.lightplusgrey,
      textStyle: {fontWeight:"bold",color:theme.colors.white},
      icon: require("../assets/logout_icon.png"),
      name: "btn_logout", 
      position: 4,
      color:theme.colors.lightplusgrey
    }
  ];

  return (

    <FloatingAction
      position={"right"}
      actions={actions}
      color={theme.colors.lightgrey}
      overlayColor={"rgba(250,250,250,0.7)"}
      buttonSize={56}
      onPressItem={name => {_onButtonPressed(name)}}/>
  );
}

const styles = StyleSheet.create({
});

export default ActionButton;