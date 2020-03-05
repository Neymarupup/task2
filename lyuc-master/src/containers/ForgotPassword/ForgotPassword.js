import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, Platform,ToastAndroid
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import CheckBox from 'react-native-check-box'
import AppHeader from '../../components/AppHeader';
import Dialog, { DialogContent, DialogButton } from 'react-native-popup-dialog';
import { verticalScale } from "react-native-size-matters";
import * as firebase from "firebase";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            dialogclose: false,
            dialogclose: false
        };
    }

    dialogopen() {
        this.setState({ dialogclose: true })
    }

    validation_forgot() {

        var text = this.state.email;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (reg.test(text) == false) {
            Platform.select({
                ios: () => { AlertIOS.alert('Please enter valid email'); },
                android: () => { ToastAndroid.show('Please enter valid email', ToastAndroid.SHORT); }
            })();
            return false;
        }
        else{
            firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
                this.dialogopen();
            }).catch((error)=>{
                alert(error.message);
            });
        
        }
        
        
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <AppHeader
                    headerTitle={'RESET PASSWORD'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <View style={{ width: width - 30, marginTop: 30, alignSelf: 'center' }}>
                    <Text style={{ color: '#999999', fontSize: 16, textAlign: 'justify' }}>PUT IN YOUR EMAIL ADDRESS, SO WE CAN SEND YOU A PASSWORD RESET LINK.</Text>
                </View>
                <View style={{ alignSelf: 'center', marginTop: verticalScale(30) }}>
                    <View style={styles.fieldView}>
                        <TextInput style={styles.nameTextinputview}
                            underlineColorAndroid="transparent"
                            placeholder="Enter here"
                            placeholderTextColor="#999999"
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })} />
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.validation_forgot()}
                        style={styles.createAccbtn}>
                        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <Dialog
                    visible={this.state.dialogclose}
                    onTouchOutside={() => {
                        this.setState({ dialogclose: false });
                    }}
                >
                    <DialogContent style={{
                        borderRadius: Platform.OS === 'android' ? null : null,
                        width: width - 70,
                        height: 200,
                        paddingTop: 10
                    }}>
                        <View>
                            <TouchableOpacity 
                             onPress={() => { this.setState({ dialogclose: false }); }}
                            style={{alignSelf:'flex-end'}}>
                                <Image source={require('../../components/Images/close.png')}
                                style={{height:15,width:15}}/>
                            </TouchableOpacity>
                            <View style={{ width: width / 2 - 20, alignSelf: 'center', marginTop: 10 }}>
                                <Text style={{ textAlign: 'center', }}>WE HAVE SENT A RESET PASSWORD LINK TO YOUR MAIL.</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { this.setState({ dialogclose: false }); }}
                                style={styles.dialoge}>
                                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Ok</Text>
                            </TouchableOpacity>

                        </View>
                    </DialogContent>
                </Dialog>
                
            </View>
        );
    }
}

// onPress={() => { this.setState({ dialogclose: false }); }}
export default ForgotPassword;
