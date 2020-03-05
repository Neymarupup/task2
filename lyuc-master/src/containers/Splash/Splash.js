import React from "react";
import { View, Text, StatusBar, Image, Dimensions, ImageBackground, AsyncStorage } from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from "./styles";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

import LoginManager from '../../manager/LoginManager'

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: ''
        };
    };

    loginVoxim = async(email, password) =>{
        this.setState({
            email: email,
            password: password
        })
        LoginManager.getInstance().loginWithPassword(this.state.email, this.state.password);
    }

    async componentDidMount() {
        let email = await AsyncStorage.getItem('email')
        let password = await AsyncStorage.getItem('password')
        let self = this
        try {
            setTimeout(async() => {
                await AsyncStorage.getItem('uid').then((uid)=>{
                    if(uid !== null){
                        AsyncStorage.getItem('newUser').then((newUser) => {
                            if(newUser !== 'newUser')
                                {
                                    self.loginVoxim(email, password)
                                    Actions.tabbar();
                                }
                            else
                            Actions.AppIntro()
                        })                        
                    }
                    else
                        Actions.AppIntro()
                })
            }, 1500);
        }
        catch (error) {
            console.log('error' + error)
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./../../components/Images/Splash.png')} 
                style={styles.splashImg}>
                </ImageBackground>
            </View>
        );
    }
}


export default Splash;
