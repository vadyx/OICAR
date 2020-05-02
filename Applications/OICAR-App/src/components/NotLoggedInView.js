import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
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
        paddingTop: 80,
        backgroundColor:theme.colors.white
    },
    submit:{
        width:"35%",
        alignSelf:"flex-end",
        marginHorizontal:20,
        marginTop:10,
        height:50,
      },
    touchablestyle:{
        color:"transparent",
        borderRadius:10,
        borderWidth: 2,
        borderColor: theme.colors.primary

    },
    headerstyle: {
        fontSize: 40,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom:5
    },
    paragraphstyle:{
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
    }
});

export default NotLoggedInView;