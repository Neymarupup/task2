import React from "react";
import { View, Text, StatusBar, Image, Dimensions, ImageBackground, TouchableOpacity, } from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height; //full heigh

const slides = [
    {
        // image: require('../../components/Images/logo.png'),
        text: 'WELCOME TO LYNX',
        fontSize: 40,
        width:width/2
    },
    {
        // image: require("../../components/Images/logo.png"),
        text: 'WE MAKE IT EASY TO FIND SOMEONE NEW.',
        fontSize: 30
    },
    {
        // image: require('../../components/Images/logo.png'),
        text: 'JUST SWIPE AND FIND YOUR NEXT DATE!',
        fontSize: 35 
    },
];

class AppIntro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onBoardStatus: false
        };
    }
    _renderItem = props => (
        <ImageBackground style={{
            flex: 1, height: '100%', width: '100%'
        }}
            source={require("../../components/Images/Splash.png")} >

            <View style={{ alignSelf: 'center', top: '55%', width: props.item.width }}>
                <Text style={{ fontSize: props.item.fontSize, fontFamily: 'DepotTrapharet', color: '#00719B', textAlign: 'center' }}>{props.item.text}</Text>
            </View>

        </ImageBackground>
    );
    SignUp(){
        Actions.Signup()
    }

    render() {
        return (
            <AppIntroSlider
                slides={slides}
                renderItem={this._renderItem}
                showNextButton
                showSkipButton
                buttonStyle={{
                    height: 50,
                    width: width / 3 - 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'blue'
                }}
            onSkip={() => Actions.LandingPage()}
            onDone={() => Actions.LandingPage()}
            />
        );
    }
}


export default AppIntro;
