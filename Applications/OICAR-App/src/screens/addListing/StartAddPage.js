import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { theme } from '../../utils/theme';
import { ThemeColors } from 'react-navigation';

const StartAddPage = props => {
 
  return (
    <View style={styles.container}>
      <Text style={styles.headerstyle}>Želite iznajmiti svoje vozilo?</Text>
      <Text style={styles.paragraphstyle}>Kliknite na gumb te kroz nekoliko kratkih koraka iznajmite svoje vozilo već sada</Text>
      <FontAwesome name="hand-o-down" size={180} color={theme.colors.lightgrey} style={styles.iconstyle} />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => props.navigation.navigate('Kategorija')}>
        <Text style={styles.buttonText}>Iznajmi vozilo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.white
    },
    headerstyle: {
        fontSize: 40,
        marginTop:60,
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom:5
    },
    paragraphstyle:{
        fontSize: 14,
        width:"90%",
        fontWeight: '100',
        marginLeft: 20,
    },
    buttonContainer: {
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        paddingVertical: 10,
        alignSelf:"center",
        alignItems:"center",
        width:200,
        height:50,
    },
    buttonText: {
        fontSize: 20,
        fontWeight:"500",
        color: theme.colors.white
    },
    iconstyle:{
        marginHorizontal:60,
        marginVertical:40
    }
});

export default StartAddPage;