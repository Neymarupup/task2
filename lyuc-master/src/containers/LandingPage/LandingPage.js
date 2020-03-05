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
// import {  AccessToken } from 'react-native-fbsdk';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; //full heigh

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    androidClientId: '1096293473407-487oeo6hngui1jvf2i9nc9hqbke0609a.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  });
// const FBSDK = require('react-native-fbsdk');
// const {
//     LoginManager,
//     GraphRequest,
//     GraphRequestManager,
//   } = FBSDK;

  _responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
        AsyncStorage.setItem('email', result.email);
        Actions.tabbar();
    }
}
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
    signUpWithFacebook = async() => {
        // LoginManager.logInWithPermissions(['public_profile']).then(
        //     function(result) {
        //       if (result.isCancelled) {
                
        //       } else {
        //         AccessToken.getCurrentAccessToken().then((data)=>{
        //             const infoRequest = new GraphRequest(
        //                 '/me?fields=name,email',
        //                 null,
        //                 _responseInfoCallback
        //             );
        //             new GraphRequestManager().addRequest(infoRequest).start();
        //         })
        //       }
        //     },
        //     function(error) {
        //       alert('Login failed with error: ' + error);
        //     }
        // );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ fontSize: RFPercentage(6), fontFamily: 'DepotTrapharet', textAlign: 'center', color: '#fff', marginTop: verticalScale(100) }}>SIGN UP WITH</Text>
                <View style={{ flexDirection: 'row',alignSelf:'center',marginTop:verticalScale(20) }}>
                    <TouchableOpacity onPress={this.signUpWithFacebook}>
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
