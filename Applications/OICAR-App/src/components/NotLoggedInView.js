import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { theme } from '../utils/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotLoggedInView = props => {
    return (
        <View style={{...styles.wrapper,...props.style}}>
      
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
            <View  style={styles.submit}>
                <TouchableOpacity
                    style={styles.touchablestyle}
                    onPress={() => props.navigation.navigate('Auth')}
                    >

                    <Text style={styles.textstylebutton}>Prijava</Text>   
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 70,
        backgroundColor:theme.colors.white
    },

    submit:{
        width:"35%",
        alignSelf:"flex-end",
        marginHorizontal:20,
        marginTop:-35,
        height:50,
      },

    touchablestyle:{
        color:"transparent",
        borderRadius:10,
        borderWidth: 2,
        borderColor: theme.colors.primary

    },

    textstyle: {
        fontSize: 40,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 20,
    },

    textstyle1:{
        fontSize: 14,
        width:"60%",
        fontWeight: '100',
        marginLeft: 20,
    },

    textstylebutton:{
        fontSize:22,
        color:theme.colors.primary,
        alignSelf:"center",
        paddingVertical:8,
        fontWeight:"900"
    },
    image:{
        width: 380,
        height: 350,
        alignSelf: 'flex-end',
        opacity:0.8  
    }
});

export default NotLoggedInView;