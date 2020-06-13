import React from 'react';
import { StyleSheet, View, Text, Platform} from 'react-native';
import { theme } from '../utils/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotLoggedInView = ({children,...props}) => {
    return (
        <View style={styles.wrapper}>
      
            <Text style={styles.headerstyle}>
                {props.titleText}
            </Text>
                
            <Text style={styles.paragraphstyle}>
                {props.contentText}
            </Text>

            {children}
            
            <View  style={{...styles.submit,...props.style}}>
                <TouchableOpacity
                    style={styles.touchablestyle}
                    onPress={() => props.navigation.navigate('Auth')}>

                    <Text style={styles.textstylebutton}>Prijava</Text>

                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent:"center",
        backgroundColor:theme.colors.white,
    },
    submit:{
        width:"35%",
        alignSelf: Platform.OS === "web" ? 'center' : "flex-end",
        marginHorizontal:20,
        marginTop:10,
        height:50,
      },
    touchablestyle:{
        color:"transparent",
        borderRadius:10,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignSelf: Platform.OS === "web" ? "center" : null,
        width: Platform.OS === "web" ? '25%' : null
    },
    headerstyle: {
        fontSize: 40,
        fontWeight: '700',
        alignSelf: Platform.OS === "web" ? 'center' : 'flex-start',
        marginLeft: 20,
        marginBottom:5
    },
    paragraphstyle:{
        fontSize: Platform.OS === "web" ? 24 : 14,
        width: Platform.OS === "web" ? null :"60%",
        fontWeight: '100',
        marginLeft: Platform.OS === "web" ? 0 : 20,
        alignSelf: Platform.OS === "web" ? 'center' : 'flex-start',
        marginBottom: Platform.OS === "web" ? 100 : null
    },
    textstylebutton:{
        fontSize:22,
        color:theme.colors.primary,
        alignSelf: "center",
        paddingVertical:8,
        fontWeight:"900"
    }
});

export default NotLoggedInView;