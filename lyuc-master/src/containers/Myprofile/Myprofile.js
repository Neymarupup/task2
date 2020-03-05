import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, FlatList, ImageBackground, ScrollView, TouchableWithoutFeedback
} from "react-native";
import { Actions } from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import AppHeader from '../../components/AppHeader';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import styles from './styles';
import { verticalScale } from "react-native-size-matters";
import {AsyncStorage} from 'react-native';
import firebase from 'firebase';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const users = [
    {
        image: require("../../components/Images/home2.jpg"),
    },
    {
        image: require("../../components/Images/home2.jpg"),
    },
    {
        image: require("../../components/Images/mountain.jpg"),
    },
    {
        image: require("../../components/Images/home2.jpg"),
    },
    {
        image: require("../../components/Images/home2.jpg"),
    },
]

class Myprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            selectedIndex: 0,
            selectedIndex1: 0,
            customStyleIndex: 0,
            customStyleIndex1: 0,
            firstName: '',
            lastName: '',
            occupation: '',
            age: '',
            gender: '',
            city: '',
            aboutMe: '',
            avatarUri: '',
            introVideoUri: '',
            paused: true
        }
    }

    handleIndexChange = index => {
        this.setState({
            ...this.state,
            selectedIndex: index
        });
    };

    handleIndexChange1 = index => {
        this.setState({
            ...this.state,
            selectedIndex1: index
        });
    };

    async componentDidMount() {
        await this.getMyData();
    }

    // componentWillReceiveProps() {
    //     this.getMyData();
    // }

    getMyData = async () => {
        const uid = await AsyncStorage.getItem('uid')
        const dataUrl = 'Users/' + uid;
        let data;
        
        firebase.database().ref(dataUrl).once('value', function (snapshot) {
            data = snapshot;
        }).then(() => {
            const today = new Date().getFullYear();
            const age = today - data.child('birthday').val().substring(0, 4);
            
            this.setState({firstName: data.child('firstName').val()});
            this.setState({lastName: data.child('lastName').val()});
            this.setState({occupation: data.child('occupation').val()});
            this.setState({city: data.child('city').val()});
            this.setState({aboutMe: data.child('aboutMe').val()});
            this.setState({avatarUri: data.child('avatarUri').val()});
            this.setState({age: age});
            this.setState({introVideoUri: data.child('introVideoUri').val()});
            this.setState({gender: data.child('gender').val()})
            
            AsyncStorage.setItem('firstName', this.state.firstName);
            AsyncStorage.setItem('lastName', this.state.lastName);
            AsyncStorage.setItem('occupation', this.state.occupation);
            AsyncStorage.setItem('city', this.state.city);
            AsyncStorage.setItem('aboutMe', this.state.aboutMe);
            AsyncStorage.setItem('birthday', data.child('birthday').val());
            AsyncStorage.setItem('avatarUri', this.state.avatarUri);
            AsyncStorage.setItem('introVideoUri', this.state.introVideoUri);
            AsyncStorage.setItem('gender', this.state.gender);    
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    headerTitle={'MY PROFILE'}
                    // backgo={require("../../components/Images/leftarrow.png")}
                    // onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView style={styles.container}>
                    <View style={{ height: 350 }}>
                        <ImageSlider
                            loopBothSides
                            // autoPlayWithInterval={3000}
                            images={users}
                            customSlide={({ index, item, style, width }) => (
                                // It's important to put style here because it's got offset inside
                                <View key={index} style={[style, styles.customSlide]}>
                                    <ImageBackground blurRadius={5} source={item.image} style={{ height: 350, alignItems: 'center', justifyContent: 'center' }} >
                                        <TouchableOpacity
                                           onPress={() => {Actions.Editprofile();this.setState({paused: true});this.video.seek(100)}}
                                            style={{ alignSelf: 'flex-end',backgroundColor:'#00000050',height:45,width:45,borderRadius:45/2,alignItems:'center',justifyContent:'center', marginRight:verticalScale(15)
                                             }}>
                                            <Image source={require('../../components/Images/pencil.png')}
                                                style={{ height: 20, width: 20, tintColor:'#fff' }} />
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={{uri: this.state.avatarUri}} style={{ height: 130, width: 130, borderRadius: 130 / 2, borderWidth: 2, borderColor: '#fff' }} />
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', lineHeight: 25, }}>{this.state.firstName + ' ' + this.state.lastName}</Text>
                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', lineHeight: 25, }}>{this.state.occupation} | {this.state.age} yrs.old | Female</Text>

                                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                                <Image source={require('../../components/Images/location.png')}
                                                    style={{ width: 15, height: 15, tintColor: '#fff' }}>
                                                </Image>
                                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>{this.state.city}</Text>
                                            </View>

                                        </View>
                                        <View style={{ height: 1, width: '80%', backgroundColor: '#fff', alignSelf: 'center', marginTop: 8 }} />
                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', lineHeight: 25, textAlign: 'center' }}>I'm looking for: Male, 21-25 yrs old</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            )}
                        />
                    </View>
                    <View>
                        <Text style={{ marginLeft: 18, marginTop: 10, fontSize: 16, fontWeight: 'bold', color: 'grey' }}>ABOUT ME</Text>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 8 }}>
                        <Text style={{ textAlign: 'justify', fontSize: 12 }}>{this.state.aboutMe}</Text>
                    </View>
                    <View>
                        <Text style={{ marginLeft: 18, marginTop: 10, fontSize: 16, fontWeight: 'bold', color: 'grey' }}>VIDEO CLIPS</Text>
                    </View>
                    <TouchableWithoutFeedback style={{width:'90%', height: 300}}
                        onPress={()=>{this.setState({paused: !this.state.paused})}} activeOpacity={1}>
                        {/* <Image style={{ height: 200, width: 340, marginTop: 15, alignSelf: 'center',marginBottom:15 }}
                            source={require('../../components/Images/profilemain.jpg')}
                        /> */}
                        <Video
                            style={{width: '90%', height: 300, alignSelf: 'center', backgroundColor: 'black'}}
                            ref={(ref: Video) => {this.video = ref}}
                            source={{uri: this.state.introVideoUri}}
                            paused={this.state.paused}
                            repeat={true}
                        />
                        {/* <MediaControls /> */}
                        
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        );
    }
}

export default Myprofile;
