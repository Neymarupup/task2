import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, Platform, Alert
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AppHeader from '../../components/AppHeader';
import * as firebase from "firebase";
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import LoginManager from '../../manager/LoginManager'
// import {connect} from 'react-redux';
// import LogInActions from '../../actions/ActionLogin'
let checkmail = ''

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            dialogclose: false
        }
    }
    secureKey() {
        if (this.state.secureKey == false) {
            this.setState({
                secureKey: true
            })
        }
        else {
            this.setState({
                secureKey: false
            })
        }
    }
    signUpBtn() {
        if (this.state.email != '') {
            if (checkmail == "Valid Email") {
                this.props.navigation.navigate("Login", { email: this.state.email })
            }
        }
        else {
            alert('Please enter email.')
        }
    }
    validation() {
        var specailChar = /^[A-Za-z0-9 ]+$/
        if (this.state.email == "" || this.state.email == null) {
            Alert.alert('Please enter email');
            return false;
        }
        var text = this.state.email;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            Alert.alert('Email is Not Correct');
            return false;
        }
        if (this.state.password == "" || this.state.password == null) {
            Alert.alert('Enter password');
            return false;
        }
        console.log("pwd length", this.state.password.length)

        if (this.state.password.search(/[a-zA-Z]/) == -1) {
            console.log('Contain a letter.')
            Alert.alert('Contain a letter.');
            return false;
        }
        if (this.state.password.search(/\d/) == -1) {
            console.log('Atleast 6 characters long.')
            Alert.alert('Contain a number');
            return false;
        }
        if (this.state.password.length < 5 || this.state.password.length == 5) {
            console.log('Atleast 6 characters long.')
            Alert.alert('Atleast 6 characters long.');
            return false;
        }
        // if (specailChar.test(this.state.password) === true) {
        //     console.log('Contain a special character.')
        //     //Alert.alert('specail'); 
        // }
        else {
            console.log("else")
            this.dialogopen()
        }
    }
    dialogopen() {
        this.setState({ dialogclose: true })
    }
    terms() {
        Actions.Termsandcondition()
        this.setState({ dialogclose: false })
    }
    privacy() {
        Actions.Privacypolicy()
        this.setState({ dialogclose: false })
    }
    agreeBtn = async () => {
        let self = this
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {

                self.setState({ dialogclose: false });
                AsyncStorage.clear();
                AsyncStorage.setItem('email', user.user.email);
                AsyncStorage.setItem('password', this.state.password);
                AsyncStorage.setItem('uid', user.user.uid);
                self.RegisterVoxim(user)
                Actions.tabbar()
            })
            .catch((error) => {
                alert(error.message)
                this.setState({ dialogclose: false });
            })
    }

    RegisterVoxim = (callRegisterData) => {
        const userName = callRegisterData.user.email.split('@');
        const fullName = userName[0]
        const displayName = callRegisterData.user.email
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        let self = this
        axios.post('https://api.voximplant.com/platform_api/AddUser/?account_id=3505142&api_key=161cbb15-f915-4374-9291-f457a62b6684&user_name=' + fullName + '&user_display_name=' + displayName + '&user_password=Panda!123&application_id=10023782', callRegisterData, config)
            .then(function (response) {
                let res = response.data;
                if (res.result === "1" || res.result === 1) {
                    AsyncStorage.setItem('call_id', res.user_id.toString());
                    LoginManager.getInstance().loginWithPassword(self.state.email, self.state.password);
                    console.log('===alert, register success')
                } else {
                    Alert.alert(res.error.msg)
                }
            })
            .catch(function (error) {
                console.warn('error', error);
            });
    };

    render() {
        console.log(this.state.password.length, "length")
        let rege = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (rege.test(this.state.email) === false) {
            checkmail = 'Invalid Email.'
        } else {
            checkmail = 'Valid Email.'
        }
        var specailChar = /^[A-Za-z0-9 ]+$/
        const checkpasswordimg = this.state.password.length >= 6 ? require('../../components/Images/verified.png')
            : require('../../components/Images/error.png')
        //------------Character validation---------------//
        if (this.state.password.length == 6) {
            checkpassword = 'Atleast 6 characters long'
        } else {
            checkpassword = 'Atleast 6 characters long'
        }
        if (this.state.password == '') {
            checkpassword = 'Atleast 6 characters long'
        }
        //------------Letter validation---------------//
        if (this.state.password.search(/[a-zA-Z]/) == -1) {
            checkpassword_letter = 'Contain a letter.'
            checkpasswordletter = "0"
        } else {
            checkpassword_letter = 'Contain a letter.'
            checkpasswordletter = '1'
        }
        //------------Number validation---------------//
        if (this.state.password.search(/\d/) == -1) {
            console.log('Atleast 6 characters long.')
            checkpassword_num = 'Contain a number'
            checkpassword_num_img = '0'
        } else {
            checkpassword_num = 'Contain a number'
            checkpassword_num_img = '1'
        }
        //------------Specialcharacter validation---------------//
        // if (specailChar.test(this.state.password) === false && this.state.password !== '') {
        //     checkpassword_schar_img = '1'
        // }
        // if (this.state.password == '' || specailChar.test(this.state.password) === true) {
        //     checkpassword_schar_img = '0'
        // }
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
                    headerTitle={'SIGN UP WITH'}
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
                <View style={styles.emailvalText}>
                    <View>
                        {checkmail == 'Valid Email.' ?
                            <Image style={styles.valImages}
                                source={require('../../components/Images/verified.png')} />
                            : null}{checkmail == 'Invalid Email.' ?
                                <Image style={styles.valImages}
                                    source={require('../../components/Images/error.png')} />
                                : null}
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={styles.checkpwdText}>Valid Email</Text>
                    </View>
                </View>
                <Text style={styles.passwordText}>PASSWORD</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })} />
                </View>
                <Text style={styles.pwdStrength}>Password Strength: <Text style={styles.mediumText}>Medium</Text></Text>
                <View style={styles.sixcharvalText}>
                    <View>
                        {checkpassword == 'Atleast 6 characters long' ?
                            <Image style={styles.valImages}
                                source={checkpasswordimg} />
                            : null}
                    </View>
                    <Text style={styles.checkpwdText}>
                        {checkpassword}
                    </Text>
                </View>
                <View style={styles.valText}>
                    <View>
                        {checkpasswordletter == '0' ?
                            <Image style={styles.valImages}
                                source={require("../../components/Images/error.png")} />
                            : null}
                        {checkpasswordletter == '1' ?
                            <Image style={styles.valImages}
                                source={require("../../components/Images/verified.png")} />
                            : null
                        }
                    </View>
                    <Text style={styles.checkpwdText}>
                        Contain a letter
                        </Text>
                </View>
                <View style={styles.valText}>
                    <View>
                        {checkpassword_num_img == '0' ?
                            <Image style={styles.valImages}
                                source={require("../../components/Images/error.png")} />
                            : null}
                        {checkpassword_num_img == '1' ?
                            <Image style={styles.valImages}
                                source={require("../../components/Images/verified.png")} />
                            : null
                        }
                    </View>
                    <Text style={styles.checkpwdText}>Contain a number</Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.validation()}
                    //   onPress={() => this.dialogopen()}
                    style={{
                        width: width / 2 + 20,
                        height: moderateScale(45, 0.7),
                        borderRadius: moderateScale(15),
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        marginTop: verticalScale(40)
                    }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
                </TouchableOpacity>
                <Dialog
                    visible={this.state.dialogclose}
                    onTouchOutside={() => {
                        this.setState({ dialogclose: false });
                    }}
                >
                    <DialogContent style={{
                        borderRadius: Platform.OS === 'android' ? null : null,
                        width: width - 70,
                        height: moderateScale(185, 0.7),
                        paddingTop: 10
                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => { this.setState({ dialogclose: false }); }}
                                style={{ alignSelf: 'flex-end' }}>
                                <Image source={require('../../components/Images/close.png')}
                                    style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginTop: verticalScale(40), alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => this.terms()}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue' }}>Terms and service</Text>
                                </TouchableOpacity>
                                <Text style={{ color: '#000', marginTop: 2, marginLeft: 5 }}>and</Text>
                                <TouchableOpacity onPress={() => this.privacy()}>
                                    <Text style={{ textDecorationLine: 'underline', color: 'blue', marginLeft: 5 }}>Privacy Policy</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 5, alignSelf: 'center' }}>
                                <Text>
                                    By Signing up you agree above.
                                </Text>
                            </View>
                            <View style={{ borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: verticalScale(45) }}>
                                <TouchableOpacity onPress={() => this.agreeBtn()} style={{ width: '45%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>Agree</Text>
                                </TouchableOpacity>
                                <View style={{ width: 1, height: verticalScale(40), backgroundColor: '#000', }} />
                                <TouchableOpacity onPress={() => { this.setState({ dialogclose: false }); }} style={{ width: '45%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{ height: 1, width: width - 70, backgroundColor: '#000', alignSelf: 'center', marginTop: verticalScale(45) }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <TouchableOpacity
                                        onPress={() => this.agreeBtn()}
                                        style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>Agree</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: 1, height: verticalScale(40), backgroundColor: '#000', }} />
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ dialogclose: false }); }}
                                        style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         state
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signin: (email, password) => dispatch(LogInActions.loginAPI(email, password))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
export default Signup;
