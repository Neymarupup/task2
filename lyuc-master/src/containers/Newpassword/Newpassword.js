import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView, Platform, Alert, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import CheckBox from 'react-native-check-box'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AppHeader from '../../components/AppHeader';
import * as firebase from 'firebase'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Newpassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isChecked: true,
            firstname:'',
            lastname:'',
            newpassword:'',
            cnfpassword:'',
            currentPassword: ''
        }
    }
    async componentDidMount() {
        firstname = await AsyncStorage.getItem('firstName');
        lastname = await AsyncStorage.getItem('lastName');
        email = await AsyncStorage.getItem('email');
        currentPassword = await AsyncStorage.getItem('password');

        this.setState({firstname: firstname, lastname: lastname, email: email, currentPassword: currentPassword});
    }
    confirmPasswordMatch() {
        if(this.state.newpassword === '')
            return false;
        if (this.state.newpassword === this.state.cnfpassword)
            return true;
        else
            return false;
    }
    reauthenticate = async (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return await user.reauthenticateWithCredential(cred);
    }
    onSaveChanges = async () => {
        if(this.confirmPasswordMatch())
        {
            await this.reauthenticate(currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(this.state.newpassword).then(() => {
                  alert("Password updated!");
                }).catch((error) => { alert(error); });
            }).catch((error) => { alert(error); });
        }
        this.props.navigation.goBack()
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
                    headerTitle={'ENTER NEW PASSWORD'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <Text style={styles.emailText}>FIRST NAME</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.firstname}
                        onChangeText={(text) => this.setState({ firstname: text })} />
                </View>
                <Text style={styles.passwordText}>LAST NAME</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.lastname}
                        onChangeText={(text) => this.setState({ lastname: text })} />
                </View>
                <Text style={styles.passwordText}>EMAIL</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })} />
                </View>
                <Text style={styles.passwordText}>NEW PASSWORD</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        value={this.state.newpassword}
                        onChangeText={(text) => this.setState({ newpassword: text })} />
                </View>
                <Text style={styles.passwordText}>CONFIRM PASSWORD</Text>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        value={this.state.cnfpassword}
                        onChangeText={(text) => this.setState({ cnfpassword: text })} />
                </View>
                <TouchableOpacity
                     onPress={this.onSaveChanges}
                    style={styles.loginView}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Save Changes</Text>
                </TouchableOpacity>

              
            </View>
        );
    }
}


export default Newpassword;
