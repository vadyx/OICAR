import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Button from '../components/Button';

const NotLoggedInView = props => {
    return (
        <View style={styles.wrapper}>
      
            <Text style={styles.textstyle}>
                {props.titleText}
            </Text>
                
            <Text style={styles.textstyle1}>
                {props.contentText}
            </Text>

            <Image 
                source={props.imageUri}  
                style={styles.image}
            />
                
            <Button mode="contained" onPress={() => props.navigation.navigate('Auth')} style={styles.buttonstyle}>
                Prijava
            </Button>
    
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 70
    },

    buttonstyle: {
        alignSelf:"center",
        paddingVertical:2,
        margin:0,
        marginTop:0,
        width:"50%"
    },

    textstyle: {
        fontSize: 40,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 20,
    },

    textstyle1:{
        fontSize: 14,
        fontWeight: '100',
        marginLeft: 20,
    },

    image:{
        width: 400,
        height: 350,
        alignSelf: 'center'     
    }
});

export default NotLoggedInView;