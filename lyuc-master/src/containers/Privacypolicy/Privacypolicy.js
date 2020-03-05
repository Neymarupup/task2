import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import RF from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Privacypolicy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <AppHeader
                    headerTitle={'PRIVACY POLICY'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>PRIVACY POLICY</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                        <View>
                            <Image source={require("../../components/Images/circleimage.png")}
                                style={{ height: 10, width: 10, marginTop: 5 }}>
                            </Image>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Lorem ipsum dollar sit amet,
                        </Text>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Consecteture adipisicing elit, sed do
                        </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>PERSONEL DATA</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                        <View>
                            <Image source={require("../../components/Images/circleimage.png")}
                                style={{ height: 10, width: 10, marginTop: 5 }}>
                            </Image>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Lorem ipsum dollar sit amet,
                        </Text>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Consecteture adipisicing elit, sed do
                        </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>DISCLOSER OF PERSONAL</Text>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>INFORMATION</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                        <View>
                            <Image source={require("../../components/Images/circleimage.png")}
                                style={{ height: 10, width: 10, marginTop: 5 }}>
                            </Image>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Lorem ipsum dollar sit amet,
                        </Text>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Consecteture adipisicing elit, sed do
                        </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>SCOPE AND METHOD OF</Text>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>PROCESSING</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                        <View>
                            <Image source={require("../../components/Images/circleimage.png")}
                                style={{ height: 10, width: 10, marginTop: 5 }}>
                            </Image>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Lorem ipsum dollar sit amet,
                        </Text>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Consecteture adipisicing elit, sed do
                        </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>DATA PROTECTION</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                        <View>
                            <Image source={require("../../components/Images/circleimage.png")}
                                style={{ height: 10, width: 10, marginTop: 5 }}>
                            </Image>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Lorem ipsum dollar sit amet,
                        </Text>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Consecteture adipisicing elit, sed do
                        </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>YOUR RIGHTS</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                        <View>
                            <Image source={require("../../components/Images/circleimage.png")}
                                style={{ height: 10, width: 10, marginTop: 5 }}>
                            </Image>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Lorem ipsum dollar sit amet,
                        </Text>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Consecteture adipisicing elit, sed do
                        </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 15 }}>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>CONTACTING US</Text>
                    <View style={{ flexDirection: 'row', marginTop: 5, marginLeft: 10 }}>
                        <View>
                            <Image source={require("../../components/Images/circleimage.png")}
                                style={{ height: 10, width: 10, marginTop: 5 }}>
                            </Image>
                        </View>
                        <View>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Lorem ipsum dollar sit amet,
                        </Text>
                            <Text style={{ marginLeft: 15, fontSize: 16 }}>
                                Consecteture adipisicing elit, sed do
                        </Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}


export default Privacypolicy;
