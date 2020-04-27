import React, { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import BackButton from '../../components/BackButton';
import { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating"
import EditProfileButton from '../../components/EditeProfileButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/Button';

const ProfileScreen = props => {

    return (
      <View>
        <BackButton goBack={() => props.navigation.goBack()} />
        <EditProfileButton></EditProfileButton>       
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ ...styles.container, ...props.style }}
            scrollEnabled={true}>
            {props.children}
            <View style={styles.background}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../assets/default_user_image.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#ffffff" style={{ marginTop: 0, marginLeft: 0 }}></Ionicons>
                    </View>
                </View>
                <Text style={{ fontWeight: "200", fontSize: 36, color: "#414757", marginBottom: 17 }}>Milica Krmpotić</Text>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={3.5}
                    emptyStarColor={"#D6D6D6"}
                    fullStarColor={"#9F1B41"} />
                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>{'Korisničko ime:'.toUpperCase()}</Text>
                        <Text style={styles.infoText}>Snuggels17 </Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>{'Email:'.toUpperCase()} </Text>
                        <Text style={styles.infoText}>snugglesthecat@mail.com</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>{'Datum registracije:'.toUpperCase()} </Text>
                        <Text style={styles.infoText}>23.04.2020</Text>
                    </View>
                      <View style={{ borderBottomColor: "#414757", borderBottomWidth: 2, marginTop: 20 }}>
                    </View>
                    <View style={styles.infoBox2}>
                        <Text style={styles.label}>{'Dokument osobne iskaznice:'.toUpperCase()} </Text>
                        <TouchableOpacity>
                            <Button style = {styles.button} mode="contained">
                                Uvezi    
                            </Button>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoBox2}>
                        <Text style={styles.label}>{'Dokument vozačke dozvole:'.toUpperCase()} </Text>
                        <TouchableOpacity>
                        <Button style = {styles.button} mode="contained">
                                Uvezi    
                        </Button>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    </View>
    );
};
const styles = StyleSheet.create({
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
    add: {
        backgroundColor: "#9F1B41",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        marginTop: 10,
        fontSize: 46,
        color: "#414757"
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
        fontSize: 20,
        fontWeight: "300",
        color: "#414757",
    },
    label: {
        fontSize: 13,
        color: "#6F122C",
        marginBottom: 5,
        letterSpacing: 2
    },
    background: {
        flex: 1,
        width: '100%',
        paddingTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 130,
        height: 43
    }
});

export default ProfileScreen;