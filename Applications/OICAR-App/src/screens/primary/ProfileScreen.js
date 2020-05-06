import React from 'react';
import StarRating from "react-native-star-rating";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { Ionicons,MaterialIcons,FontAwesome5,FontAwesome} from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import EditProfileButton from '../../components/EditProfileButton';
import NotLoggedInView from '../../components/NotLoggedInView';
import ImagePicker from '../../components/ImagePicker';
import * as profileActions from '../../store/actions/profile';

import { profileImageOptions, documentImageOptions } from '../../utils/imageOptions';
import { theme } from '../../utils/theme';

const ProfileScreen = props => {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const loggedUser = useSelector(state => state.profile.user);

    if (loggedUser !== null) {
    console.log("User: " + loggedUser.firstName + " " + loggedUser.lastName);
    console.log("ID Verified: " + loggedUser.documentVerification.isIDVerified);
    console.log("License Verified: " + loggedUser.documentVerification.isDLVerified);
    }

    const dispatch = useDispatch();

    const _onPictureSelected = (pickerId, picture) => {
        try {
            switch (pickerId) {
                case 'profilePicture':
                    dispatch(profileActions.updateProfilePicture(loggedUser.id, picture));
                    break;
                case 'IDCard':
                    dispatch(profileActions.uploadID(loggedUser.id, picture));
                    break;
                case 'DriverLicense':
                    dispatch(profileActions.uploadDriverLicense(loggedUser.id, picture));
                    break;
            }
        } catch (error) {
            // error logic
        }
        
    };

    if (!isLoggedIn) {
        return (
            <NotLoggedInView 
                titleText='Ups!'
                contentText='Prvo se morate prijaviti kako bih ste vidjeli svoje podatke'
                navigation={props.navigation}
                style={styles.notloggedinstyle}>

                <FontAwesome5 name="user-lock"  size={200} color={theme.colors.lightgrey} style={styles.iconstyle}/>

            </NotLoggedInView>
        );
    }

    return (
    <View style={styles.container}>   
        <ScrollView>

            <EditProfileButton></EditProfileButton>

            <View style={styles.background}>

                <View style={{ alignSelf: "center" }}>

                    <View style={styles.profileImage}>
                        <Image source={{ uri: loggedUser.imageUri }} style={styles.image} resizeMode="cover"></Image>
                    </View>

                    <ImagePicker 
                        id='profilePicture'
                        style={styles.addPicture} 
                        onPictureSelected={_onPictureSelected}
                        imageOptions={profileImageOptions}>

                        <Ionicons name="ios-add" size={40} color="#ffffff" />

                    </ImagePicker>

                </View>

                <Text style={styles.namestyle}>{loggedUser.firstName} {loggedUser.lastName}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={loggedUser.rating}
                    starSize={20}
                    emptyStarColor={theme.colors.quaternary}
                    fullStarColor={theme.colors.gold}
                    />

                <View style={styles.infoContainer}>

                    <View style={styles.infoBox}>
                        <Text style={styles.label}>{'Email:'.toUpperCase()} </Text>
                        <Text style={styles.infoText}>{loggedUser.email}</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.label}>{'Datum registracije:'.toUpperCase()} </Text>
                        <Text style={styles.infoText}>{loggedUser.displayRegistrationDate}</Text>
                    </View>

                      <View style={{ borderBottomColor: theme.colors.quaternary, borderBottomWidth: 2, marginTop: 20 }}>
                    </View>

                    <View style={styles.infoBox2}>
                        <Text style={styles.label1}>{'Dokument osobne iskaznice:'.toUpperCase()} </Text>
                        <ImagePicker
                            id='IDCard'
                            imageOptions={documentImageOptions}
                            onPictureSelected={_onPictureSelected}>

                            <MaterialIcons name="photo-camera" size={36} color={theme.colors.white} style={styles.photoicon}></MaterialIcons>
                            <Text style={styles.label3}>Dodaj</Text>

                        </ImagePicker>

                      {/*
                        <ImagePicker
                            style={styles.imagepickersuccess}>

                            <FontAwesome name="check" size={36} color={theme.colors.success} style={styles.photoicon}></FontAwesome>
                            <Text style={styles.imagepickertextsuccess}>Dodano</Text>
                            
                        </ImagePicker>
                        */}

                    </View>

                    <View style={styles.infoBox2}>
                        <Text style={styles.label1}>{'Dokument vozačke dozvole:'.toUpperCase()} </Text>
                        <ImagePicker
                            id='DriverLicense'
                            imageOptions={documentImageOptions}
                            onPictureSelected={_onPictureSelected}>

                            <MaterialIcons name="photo-camera" size={36} color={theme.colors.white} style={styles.photoicon}></MaterialIcons>
                            <Text style={styles.label3}>Dodaj</Text>

                        </ImagePicker>
                    </View>
                </View>
            </View>
        </ScrollView>
    </View>
   
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:getStatusBarHeight(),
        backgroundColor:theme.colors.white
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 1000,
        overflow: "hidden"
    },
    addPicture: {
        backgroundColor: theme.colors.primary,
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 42,
        height: 42,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        marginTop: 10,
        fontSize: 46,
        color: "#ffffff"
    },
    infoBox: {
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 25,
        fontSize: 46,
    },
    infoBox2: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        fontSize: 46,
    },
    infoText: {
        fontSize: 17,
        fontWeight: "100",
        color: "gray",
    },
    label: {
        fontSize: 14,
        paddingBottom:5,
        fontWeight:"bold",
        color: theme.colors.secondary,
        marginBottom: 3,
        letterSpacing: 1
    },
    label1: {
        fontSize: 12,
        paddingBottom:10,
        fontWeight:"900",
        color: theme.colors.secondary,
        marginBottom: 3,
        letterSpacing: 1
    },
    label2: {
        fontSize:16,
        alignSelf:"center",
        color:"#ffffff"
    },
    label3: {
        fontSize:16,
        alignSelf:"center",
        color:"#ffffff"
    },
    background: {
        flex: 1,
        width: '100%',
        paddingTop: 35,
        paddingBottom:45,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerphoto:{
        width:75,
        height:75,
        padding:0,
        margin:0,
        backgroundColor:theme.colors.primary,
        borderRadius:10,
        shadowColor: "#000",
        //iPhone 
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        //Android
        elevation: 5,
    },
    namestyle:{
        fontSize: 28,
        color:theme.colors.secondary,
        paddingVertical:10
    },
    photoicon:{
        alignSelf:"center",
        paddingTop:8
    },
    iconstyle:{
        alignSelf:"center",
        marginTop:30
    },
    notloggedinstyle:{
        marginTop:26
    },

    imagepickersuccess:{
        backgroundColor:"white",
        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation:0,
        
    },

    imagepickertextsuccess:{
        color:theme.colors.success,
        fontSize:18,
        alignSelf:"center"
    }


});

export default ProfileScreen;