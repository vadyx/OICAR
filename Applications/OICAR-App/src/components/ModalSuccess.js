import React from 'react';
import { Text, StyleSheet, Modal, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { theme } from '../utils/theme';

const ModalSuccess = props =>{
    
    return(

        <Modal
            animationType="slide"
            transparent
            visible={props.visible}>
            
            <View style={styles.modalsuccess}>
              <View style={styles.modalsuccesscontent}>
                <LottieView 
                  style={styles.lottiestyle}
                  autoPlay 
                  loop={false} 
                  source={require('../assets/lottie_success.json')}/>
                <Text style={styles.modalheader}>Čestitam !</Text>
                <Text style={styles.modalsubheader}>Uspješno ste dodali oglas vašeg vozila</Text>
              </View>
            </View>

          </Modal>

    )
};

const styles = StyleSheet.create({

    modalsuccess:{
        flex: 1,    
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent:'center',
        alignItems:'center'
      },
      modalsuccesscontent:{
        height:230,
        width:"75%",
        borderRadius:20,
        backgroundColor:theme.colors.white,
        alignItems:"center",
        justifyContent:"flex-start",
        paddingHorizontal:20,
        paddingVertical:20,
        borderWidth:2,
        borderColor:theme.colors.primary
      },
      lottiestyle:{
        width:100,
        height:100
      },
      modalheader:{
        fontSize: 20,
        color: theme.colors.black,
        fontWeight:"700"
      },
      modalsubheader:{
        fontSize: 14,
        color: theme.colors.black,
        textAlign:"center",
        paddingTop:5
      }
    
});

export default ModalSuccess;