import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import {RF} from "react-native-responsive-fontsize";
import AppHeader from '../../components/AppHeader';
import { verticalScale } from "react-native-size-matters";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Aboutapp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            firstname: '',
            subject: '',
            email: '',
            aboutme: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    headerTitle={'ABOUT THE APP'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <View>
                <View style={{alignSelf:'center',marginTop:verticalScale(100)}}>
                    <Text style={{color:'#000',textDecorationLine:'underline',textAlign:'center',fontSize:RFPercentage(2.2)}}>Version 1.1.</Text>
                    <Text style={{color:'#000',textDecorationLine:'underline',lineHeight:30,textAlign:'center',fontSize:RFPercentage(2.2)}}>Copyright 2019</Text>
                    <Text style={{color:'#000',textDecorationLine:'underline',lineHeight:20,textAlign:'center',fontSize:RFPercentage(2.2)}}>Lynx.com</Text>
                    <Text style={{color:'#000',textDecorationLine:'underline',lineHeight:20,textAlign:'center',fontSize:RFPercentage(2.2)}}>Developer Name Inc.</Text>
                </View>
                

                <TouchableOpacity style={{
                    width: width - 30,
                    height: 40,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000',
                    marginTop: 30
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Contact Us</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default Aboutapp;
