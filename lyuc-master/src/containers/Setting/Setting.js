import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, Platform, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import {RFPercentage} from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styles from './styles';
import AppHeader from '../../components/AppHeader';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import StarRating from 'react-native-star-rating';
import { heightPercentageToDP } from "react-native-responsive-screen";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            dialogclose: false,
            dialogclose1: false
        }
    }

    dialogopen() {
        this.setState({ dialogclose: true })
    }

    Rateapp() {
        this.setState({ dialogclose1: true })
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <AppHeader
                    headerTitle={'SETTINGS'}
                />
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Myprofile')}}>
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>My Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.Rateapp()}>
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>About the App</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.dialogopen()} >
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Rate App</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.Contactus()}>
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Contact Us</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{this.props.navigation.navigate('Newpassword')}}>
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Change Password</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.Privacypolicy()}>
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Privacy Policy</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.Termsandcondition()}>
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Terms and Conditions</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        AsyncStorage.clear();
                        Actions.LandingPage();
                        }
                    }
                >
                    <View style={{ height: 50, paddingLeft: 15, borderBottomWidth: 1, borderColor: '#000', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Logout</Text>
                    </View>
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
                        height: 218,
                        paddingTop: 10

                    }}>
                        <View>
                        <TouchableOpacity
                                onPress={() => { this.setState({ dialogclose: false }); }}
                                style={{ alignSelf: 'flex-end' }}>
                                <Image source={require('../../components/Images/close.png')}
                                    style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>
                            <View style={{ marginTop: 15, alignSelf: 'center' }}>
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>RATE THE APP</Text>
                            </View>

                            <View style={{ width: width - 90, alignSelf: 'center', marginTop: 10 }}>
                                <Text style={{ textAlign: 'center' }}>If you like our app, we would appreciate if you take a couple of seconds to rate us in the app market!</Text>
                            </View>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 5
                            }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    starSize={25}
                                    fullStarColor={'#005ce6'}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                />
                            </View>
                            <View style={{ height: 1, width: width - 70, marginTop: 20, backgroundColor: '#000', alignSelf: 'center' }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => { this.setState({ dialogclose: false }); }}
                                    style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>Later</Text>
                                </TouchableOpacity>
                                <View style={{ width: 1, height: 45, backgroundColor: '#000', }} />
                                <TouchableOpacity
                                    onPress={() => { this.setState({ dialogclose: false }); }}
                                    style={{ width: '45%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16 }}>RATE NOW</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </DialogContent>
                </Dialog>


                <Dialog
                    visible={this.state.dialogclose1}
                    onTouchOutside={() => {
                        this.setState({ dialogclose1: false });
                    }}
                >
                    <DialogContent style={{
                        borderRadius: Platform.OS === 'android' ? null : null,
                        width: width - 70,
                        height: hp('34%'),
                        paddingTop: verticalScale(10)

                    }}>
                        <View>
                            <TouchableOpacity
                                onPress={() => { this.setState({ dialogclose1: false }); }}
                                style={{ alignSelf: 'flex-end' }}>
                                <Image source={require('../../components/Images/close.png')}
                                    style={{ height: 15, width: 15 }} />
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center', marginTop: verticalScale(40) }}>
                                <Text style={{ color: '#000', textDecorationLine: 'underline', textAlign: 'center', fontSize: RFPercentage(2.2) }}>Version 1.1.</Text>
                                <Text style={{ color: '#000', textDecorationLine: 'underline', lineHeight: 30, textAlign: 'center', fontSize: RFPercentage(2.2) }}>Copyright 2019</Text>
                                <Text style={{ color: '#000', textDecorationLine: 'underline', lineHeight: 20, textAlign: 'center', fontSize: RFPercentage(2.2) }}>Lynx.com</Text>
                                <Text style={{ color: '#000', textDecorationLine: 'underline', lineHeight: 20, textAlign: 'center', fontSize: RFPercentage(2.2) }}>Developer Name Inc.</Text>
                            </View>


                            <TouchableOpacity
                                onPress={() => { this.setState({ dialogclose1: false }); }}
                                style={{
                                    width: width - 70,
                                    height: hp('9%'),
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#005ce6',
                                    marginTop: verticalScale(20)
                                }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Contact Us</Text>
                            </TouchableOpacity>
                        </View>
                    </DialogContent>
                </Dialog>



            </View>
        );
    }
}

export default Setting;
