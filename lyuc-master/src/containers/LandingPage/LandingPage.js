import React from "react";
import { View, Text, StatusBar, Image, Dimensions, ImageBackground, TouchableOpacity, } from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { verticalScale } from "react-native-size-matters";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { GoogleSignin} from 'react-native-google-signin';
import { AsyncStorage } from 'react-native';
import ImagePicker from "react-native-image-picker";
import * as firebase from 'firebase';
import storage from "redux-persist/lib/storage";


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; //full heigh

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    androidClientId: '1096293473407-487oeo6hngui1jvf2i9nc9hqbke0609a.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onBoardStatus: false
        };
    }

    signUpWithGoogle = async () => {
        try {
            await GoogleSignin.signIn().then((user) => {
                AsyncStorage.setItem('email', user.user.email);
                Actions.tabbar();
            });
        } catch (error) {
            alert(error);
        }

    };
    chooseFile = async () => {
        var firebaseConfig = {
            apiKey: "AIzaSyACuogpUgXR5qiD8PSG2BK4nDUmvXzkpm0",
            authDomain: "lynx-99b44.firebaseapp.com",
            databaseURL: "https://lynx-99b44.firebaseio.com",
            projectId: "lynx-99b44",
            storageBucket: "lynx-99b44.appspot.com",
            messagingSenderId: "1096293473407",
            appId: "1:1096293473407:web:e4a633695e4ea28c0f734a"
          };
        
        firebase.initializeApp(firebaseConfig);
        const {pp} = firebase.storage();
        alert(JSON.stringify(pp))
        // let response = await ImagePicker.openPicker({
        //   width: 400,
        //   height: 400,
        //   cropping: true
        // });
        // if (Array.isArray(response)) {
        //   response = response[0];
        // }
        // if(response){
        //     // this.setState({imageUri: response.path});
        //     // firebase.firestore().collection('Image').add(response.path).then((snapshot)=>snapshot.get()).then(()=>{
        //     //     alert("asdfasdf");
        //     // }).catch((error)=>{
        //     //     alert(error);
        //     // })
        //     // alert((await firebase.storage().ref('image/i.jpg').put(response.path)).totalBytes);
        //     // alert(firebase.auth().currentUser.email);
        //     var storageRef = firebase.storage().ref('image/1.png');
        //     // storageRef.put(response.);

        //     alert(storageRef.toString());
        //       // firebase
        //       // .storage()
        //       // .ref('st/1.png')
        //       // .put(response.path).then(()=>{
        //       //   alert("ss")
        //       // }).catch(()=>{
        //       //   alert('error');
        //       // })
        //   // alert("asdf");
        // }
      }
    signOutGoogle = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
      };

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ fontSize: RFPercentage(6), fontFamily: 'DepotTrapharet', textAlign: 'center', color: '#fff', marginTop: verticalScale(100) }}>SIGN UP WITH</Text>
                <View style={{ flexDirection: 'row',alignSelf:'center',marginTop:verticalScale(20) }}>
                    <TouchableOpacity onPress={this.chooseFile}>
                        <Image style={{ height: verticalScale(55), width:verticalScale(55)}}
                            source={require("../../components/Images/facebook.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.signUpWithGoogle}>
                        <Image style={{ height: verticalScale(55), width:verticalScale(55),marginLeft:verticalScale(35) }}
                            source={require("../../components/Images/google-plus.png")} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:verticalScale(130)}}>
                    <Text style={{ fontSize: RFPercentage(6), fontFamily: 'DepotTrapharet', textAlign: 'center', color: '#fff',}}>OR</Text>
                </View>
                <TouchableOpacity 
                onPress={() => Actions.Signup()}
                style={{marginTop:verticalScale(40)}}>
                    <Text style={{ fontSize: RFPercentage(3.5), textAlign: 'center', color: '#fff',}}>Sign up with email</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => Actions.Login()}
                style={{marginTop:verticalScale(50)}}>
                    <Text style={{ fontSize: RFPercentage(3), textAlign: 'center', color: '#fff',}}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default LandingPage;
