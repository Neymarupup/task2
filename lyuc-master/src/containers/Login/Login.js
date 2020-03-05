import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, Platform, Alert,
    ToastAndroid,
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import CheckBox from 'react-native-check-box'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import AppHeader from '../../components/AppHeader';
import * as firebase from "firebase";
import { AsyncStorage } from 'react-native';

import LoginManager from '../../manager/LoginManager'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isChecked: true,
        }
    }


    loginVoxim = async(email, password) =>{
        this.setState({
            email: email,
            password: password
        })
        LoginManager.getInstance().loginWithPassword(this.state.email, this.state.password);
    }


    validationlogin() {
        var text = this.state.email;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) == false) {
            Platform.select({
                ios: () => { Alert.alert('Please enter email Id'); },
                android: () => { ToastAndroid.show('Please enter valid email Id ', ToastAndroid.SHORT); }
            })();
            return false;
        }
        if (this.state.password == "" || this.state.password == null || this.state.password == undefined) {
            Platform.select({
                ios: () => { Alert.alert('Please enter password'); },
                android: () => { ToastAndroid.show('Please enter password', ToastAndroid.SHORT); }
            })();
            return false;
        }
        else {
            let self = this
            firebase
                .auth()
                .signInWithEmailAndPassword(self.state.email, self.state.password)
                .then((user) => {
                    AsyncStorage.clear();
                    AsyncStorage.setItem('email', user.user.email);
                    AsyncStorage.setItem('password', self.state.password);
                    AsyncStorage.setItem('uid', user.user.uid);
                    self.loginVoxim(user.user.email, self.state.password)
                    Actions.tabbar()
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
           
    }
    
    render() {
        var padding
        Platform.select({
            ios: () => {
                padding = 'padding'
            },
            android: () => {
                padding = 0
            }
        })();
        return (
            <View style={styles.mainContainer}>
                <AppHeader
                    headerTitle='LOGIN'
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <Text style={styles.emailText}>EMAIL</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })} />
                </View>
                <Text style={styles.passwordText}>PASSWORD</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        secureTextEntry={true}
                        textContentType='password'
                        autoCapitalize="none"
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: verticalScale(20), marginLeft: verticalScale(25), }}>
                    <CheckBox
                        style={{ marginTop: 2 }}
                        onClick={() => {
                            this.setState({
                                isChecked: !this.state.isChecked
                            })
                        }}
                        isChecked={this.state.isChecked}
                        checkedImage={<Image style={{ height: 17, width: 17 }} source={require('../../components/Images/uncheck.png')} />}
                        unCheckedImage={<Image style={{ height: 17, width: 17 }} source={require('../../components/Images/check.png')} />}
                    />
                    <View style={{alignSelf:'center'}}>
                    <Text style={{ color: '#999999',marginLeft: verticalScale(10), fontWeight: 'bold', fontSize: RFPercentage(2.5) }}>Remember Me</Text>
                    </View>
                </View>
                <TouchableOpacity
                     onPress={() => this.validationlogin()}
                    style={styles.loginView}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Actions.ForgotPassword()}
                    style={{ alignSelf: 'center', marginTop: verticalScale(180) }}>
                    <Text style={styles.passwordText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View> 
        );
    }
}


export default Login;
