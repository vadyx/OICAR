import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';


import BackButton from '../../components/BackButton';
import NextScreenButton from '../../components/NextScreenButton';
import Input from '../../components/Input';
import ModalSuccess from '../../components/ModalSuccess';
import Loader from '../../components/Loader';
import * as reservationActions from '../../store/actions/reservation';
import { theme } from '../../utils/theme';

const ReservationDateScreen = props => {

    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [loadVisible,setLoadVisible] = useState(false);

    const [cardNum, setCardNum] = useState("");

    const listing = useSelector(state => state.listings.selectedListing);
    const totalPrice = useSelector(state => state.reservation.totalPrice);

    const dispatch = useDispatch();

    const notOnBrowser = Platform.OS === "web" ? false : true;

    const _onCardChange = (text) => {
        serCardNum(text.trim().substring(text.length-4));
        console.log(cardNum);
    }

    const _onNextPressed = async () => {
        setLoadVisible(true);
        setTimeout(async () => {
            setLoadVisible(false);
            await dispatch(reservationActions.completeReservation());
            setSuccessModalVisible(true);
            setTimeout(async () => {
                setSuccessModalVisible(false);
                props.navigation.navigate('Explore');
            },
            3000);
            props.navigation.navigate('Explore');
        },
        3000);
    };

    return (
        <View style={styles.container}>
        <ScrollView style={{flex:1,width:"100%",height:"100%"}}>
            <BackButton style={styles.back} goBack={() => props.navigation.goBack()} />
            <Text style={styles.headerstyle}>Rezervacija</Text>
            <Text style={styles.headerstyle2}>2/2</Text>
            <View>
                <Image 
                    style={styles.mainimage} 
                    source={{ uri: listing.images[0] }}/>
            </View>

            <View style={styles.namebox}>
            <Text style={styles.pricetextstyle}>Naziv vozila:</Text>
            <Text style={styles.pricetextstyle1}>{listing.vehicle.manufacturer} {listing.vehicle.model}</Text>
            </View>

            <View style={styles.pricebox}>
            <Text style={styles.pricetextstyle}>Cijena ukupno:</Text>
            <Text style={styles.pricetextstyle1}>{totalPrice}</Text>
            <TouchableOpacity style={styles.detailinfo}>
                <AntDesign name="questioncircle" size={18} color={theme.colors.lightgrey} />
            </TouchableOpacity>
            </View>
            <View style={styles.hl}></View>
            <View style={styles.numcardbox}>
                <View style={styles.payheader}>
                    <Text style={styles.payheadertext}>Kartično plaćanje</Text>
                    <Image style={styles.cardsimage} source={require('../../assets/pay_by_cards.jpg')}></Image>
                </View>
                <Text style={styles.cardtext}>Kreditne ili debitne kartice</Text>
                <Input
                    keyboardType='decimal-pad'
                    placeholder="Broj kartice"
                    onInputChange={_onCardChange}
                    style={styles.input}
                />
                <View style={styles.detailcardbox}>
                    <Text style={styles.detailtext}>Ime i prezime</Text>
                    <Input
                        placeholder="Ime i prezime"
                        style={styles.detailinput}
                    />
                </View>
                <View style={styles.detailcardbox}>
                    <Text style={styles.detailtext}>Sigurnosni kod</Text>
                    <Input
                        keyboardType='decimal-pad'
                        placeholder="CVV"
                        style={styles.detailinput}
                    />
                </View>
                <View style={styles.detailcardbox}>
                    <Text style={styles.detailtext}>Datum isteka</Text>
                    <Input
                        keyboardType='decimal-pad'
                        placeholder="MM/GG"
                        style={styles.detailinput} 
                    />
                </View>
                <View style={styles.descriptionbox}>
                    <MaterialIcons name="security" size={45} color={theme.colors.lightplusgrey} />
                    <View style={styles.textdescription}>
                        <Text style={styles.primarydescriptiontext}>Sigurno plaćanje</Text>
                        <Text style={styles.secondarydescriptiontext}>Provjereno od više od 500 milijuna korisnika</Text>
                    </View>
                </View>
            </View>
            
            <NextScreenButton
            style={styles.nsbstyle} 
            navigate={_onNextPressed}>
                <Text style={styles.nsbtextstyle}>Završite rezervaciju</Text>
            </NextScreenButton>

        </ScrollView>
        
        <ModalSuccess visible={successModalVisible}>
            <Text style={styles.modalsubheader}>Uspješno ste rezervirali vozilo!</Text>
        </ModalSuccess>

        { 
        loadVisible && notOnBrowser &&
        <Loader
          modalVisible={loadVisible}
          animationType="fade"
        />
      }

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"flex-start",
    justifyContent:"flex-start",
    marginTop:getStatusBarHeight(),
    backgroundColor: theme.colors.white
  },
  headerstyle: {
    fontSize: 32,
    marginTop:50,
    alignSelf:"center",
    textAlign:"center",
    fontWeight: '700',
  },
  headerstyle2: {
    fontSize: 22,
    marginTop:5,
    marginBottom:50,
    alignSelf:"center",
    textAlign:"center",
    fontWeight: '700',
  },
 
  back:{
    marginTop:-getStatusBarHeight()
  },
  pricebox:{
    alignSelf:"flex-start",
    flexDirection:"row",
    marginVertical:10,
    marginHorizontal:10
  },
  namebox:{
    alignSelf:"flex-start",
    flexDirection:"row",
    marginTop:30,
    marginHorizontal:10
  },
  pricetextstyle:{
    fontWeight:"bold",
    fontSize:18,
    color:theme.colors.primary
  },
  pricetextstyle1:{
    fontWeight:"500",
    fontSize:18,
    paddingLeft:10,
    color:theme.colors.black
  },
  mainimage:{
      width:250,
      height:140,
      alignSelf:"center",
      borderRadius:40,
      resizeMode:"cover"
  },
  hl:{
      borderBottomWidth:0.8,
      borderColor:theme.colors.lightgrey,
      width:"100%",
      alignSelf:"center"
  },
  detailinfo:{
      alignSelf:"center",
      marginLeft:5
  },
  input:{
      width:"90%",
  },
  numcardbox:{
      marginLeft:10,
      marginVertical:10,
      marginBottom:70
  },
  detailcardbox:{
      flexDirection:"row",
      width:"90%",
      justifyContent:"flex-end"
  },
  detailinput:{
      width:"50%",
  },
  detailtext:{
      alignSelf:"center",
      width:"50%",
      fontSize:14,
      fontWeight:"bold",
      color:theme.colors.lightplusgrey
  },
  descriptionbox:{
      marginVertical:20,
      flexDirection:"row",
  },
  textdescription:{
      flexDirection:"column",
      justifyContent:"center",
      marginHorizontal:10
  },
  primarydescriptiontext:{
      fontSize:16,
      fontWeight:"bold"
  },
  secondarydescriptiontext:{
      fontSize:12,
  },
  cardtext:{
      fontSize:16,
      fontWeight:"bold",
      color:theme.colors.lightplusgrey
  },
  cardsimage:{
      width:"50%",
      alignSelf:"center",
      resizeMode:"contain",
      height:40,
      marginBottom:10,
  },
  payheadertext:{
      alignSelf:"center",
      fontSize:28,
      color:theme.colors.black,
      fontWeight:"bold",
      paddingVertical:10
  },
  payheader:{
      paddingBottom:10
  },
  nsbstyle:{
    height:50,
    width:240,
    paddingLeft:20,
    flexDirection:"row"
  },
  nsbtextstyle:{
    fontSize:20,
    paddingBottom:5,
    fontWeight:"600",
    color:theme.colors.white
  },
  modalsubheader:{
    fontSize: 14,
    color: theme.colors.black,
    textAlign:"center",
    paddingTop:5
  }
});

export default ReservationDateScreen;