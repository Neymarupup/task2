import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, PermissionsAndroid, KeyboardAvoidingView, Platform, StyleSheet, ScrollView, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import { Voximplant } from 'react-native-voximplant'
import CallManager from '../../manager/CallManager'
import * as firebase from 'firebase'
import 'firebase/firestore';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class MessageChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 30,
            value1: 30,
            email : 'someone199@gmail.com',
            first_name : 'someone199',
            image : '',
            mobile : '',
            /* */
            myUid: '',
            matchedUid: '',
            messageText: '',

            /* messages from and to*/
            messages: [],
            avatarTo: ''
        }
    }

    makeCall = async(name, isVideoCall, email, fid, fname, fimg, fmobile) => {
        try {
            if (Platform.OS === 'android') {
                let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
                if (isVideoCall) {
                    permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
                }
                const granted = await PermissionsAndroid.requestMultiple(permissions);
                const recordAudioGranted = granted['android.permission.RECORD_AUDIO'] === 'granted';
                const cameraGranted = granted['android.permission.CAMERA'] === 'granted';
                if (recordAudioGranted) {
                    if (isVideoCall && !cameraGranted) {
                        console.warn('MainScreen: makeCall: camera permission is not granted');
                        return;
                    }
                } else {
                    console.warn('MainScreen: makeCall: record audio permission is not granted');
                    return;
                }
            }
            const callSettings = {
                video: {
                    receiveVideo: isVideoCall,
                    sendVideo: isVideoCall
                },
            };
            if (Platform.OS === 'ios' && parseInt(Platform.Version, 10) >= 10) {
                const useCallKitString = await AsyncStorage.getItem('useCallKit');
                callSettings.setupCallKit = JSON.parse(useCallKitString);
            }
            
            let callInstance = await Voximplant.getInstance()
            
            let call = await callInstance.call(name, callSettings)
            let callManager = CallManager.getInstance();
            callManager.addCall(call);
            
            if (callSettings.setupCallKit) {
                callManager.startOutgoingCallViaCallKit(isVideoCall, name);
            }
            
            Actions.CallEnd({
                callId: call.callId,
                isVideo: isVideoCall,
                isIncoming: false,
                stopwatchRun: 'watchStart',
                email: email,
                fid: '',
                fname: fname,
                fimg: fimg,
                fmobile: fmobile
            });
        } catch (e) {
            console.warn('Home: makeCall failed: ' + e);
        }
    }
    async componentDidMount() {
        const myUid = await AsyncStorage.getItem('uid');
        this.setState({myUid: myUid});
        firebase.database().ref('Users/' + myUid).on("value", snapshot => {
            this.setState({avatarTo: snapshot.child('avatarUri').val()});
        })
        /* get messages to this user */
        firebase.database().ref('Users/' + myUid + '/message/sent').on("value", snapshot => {
            snapshot.forEach((child)=>{
                const uidTo = child.child('1').val();
                if(uidTo === this.state.matchedUid) {
                    this.setState({messages: [...this.state.messages, {text: child.child('0').val(), time: child.child(2).val(), display: 0}]});
                }
            });
        })
        /*get messages from this user*/
        firebase.database().ref('Users/' + myUid + '/message/received').on("value", snapshot => {
            snapshot.forEach((child)=>{
                const uidTo = child.child('1').val();
                if(uidTo === this.state.matchedUid) {
                    this.setState({messages: [...this.state.messages, {text: child.child('0').val(), time: child.child(2).val(), display: 1}]});
                }
            });
        })
        this.setState({messages: this.state.messages.sort((a, b) => a['time'] > b['time'])});
    }
    sendMessageTo() {
        if(this.state.messageText !== '') {

            var currentTime;
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
            var day =  date.getDay() + 1 < 10 ? '0' + (date.getDay() + 1).toString() : (date.getDay() + 1).toString();
            var hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
            var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
            var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
            currentTime = year + month + day + hour + minutes + seconds;
            
            var dataUrl = 'Users/' + this.state.myUid + '/message/sent';
            var message = [this.state.messageText, this.state.matchedUid, currentTime];
            firebase.database().ref(dataUrl).push(message);

            dataUrl = 'Users/' + this.state.matchedUid + '/message/received';
            message = [this.state.messageText, this.state.myUid, currentTime];
            firebase.database().ref(dataUrl).push(message);

        }
    }
    render() {
        var padding
        Platform.select({
            ios: () => {
                padding = "padding"
            },
            android: () => {
                padding = ""
            }
        })();
        if(this.state.matchedUid === '')
            this.setState({matchedUid: this.props.uidTo});
        return (
            <KeyboardAvoidingView behavior={padding} enabled style={{ flex: 1, backgroundColor: "#e9e9e9" }}>
                <View style={{flex: 1, backgroundColor: "#e9e9e9" }}>
                    <AppHeader
                        headerTitle={this.props.nameToChat}
                        backgo={require("../../components/Images/leftarrow.png")}
                        onPress={() => this.props.navigation.goBack()}
                        userprofile={require("../../components/Images/video-camera.png")}
                        userimg={require("../../components/Images/Info-512.png")}
                        profile={() => this.makeCall(
                            this.state.email.split('@')[0],
                            false,
                            this.state.email,
                            this.state.friend_id,
                            this.state.first_name,
                            this.state.image,
                            this.state.mobile,
                        )}
                    />
                    <ScrollView style={{backgroundColor: '#e9e9e9', marginBottom: hp('15%')}}>
                        { this.state.messages.map(item => (
                                item.display === 1 ? 
                                    <View style={customSytle.receiveMessage}>
                                        <Image 
                                            style={{width: 40, height: 40, borderRadius: 20}}
                                            source={{uri: this.props.avatarUri}}  />
                                        <View style={customSytle.messageText}>
                                            <Text style={{fontSize: 16}}>{item.text}</Text>
                                        </View>
                                    </View> : 
                                    <View style={customSytle.sentMessage}>
                                        <Image 
                                            style={{width: 40, height: 40, borderRadius: 20}}
                                            source={{uri: this.state.avatarTo}}/>
                                        <View style={customSytle.messageText}>
                                            <Text style={{fontSize: 16}}>{item.text}</Text>
                                        </View>
                    </View>
                        ))}
                    </ScrollView>
                    <View style={{ height: hp('10%'), backgroundColor: '#fff', justifyContent: 'center', padding: 6, position: 'absolute', bottom: 0 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Image source={require("../../components/Images/smile.png")}
                                    style={{ height: 25, width: 25, alignSelf: 'center' }}>
                                </Image>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Image source={require("../../components/Images/paperclip.png")}
                                    style={{ height: 25, width: 25, tintColor: '#000' }}>
                                </Image>
                            </TouchableOpacity>
                            <View style={styles.fieldView}>
                                <TextInput style={styles.nameTextinputview}
                                    underlineColorAndroid="transparent"
                                    placeholder="Type message....."
                                    placeholderTextColor="#999999"
                                    autoCapitalize="none"
                                    value={this.state.messageText}
                                    onChangeText={(text) => this.setState({ messageText: text })} />
                            </View>
                            <TouchableOpacity 
                                style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}
                                onPress={()=>this.sendMessageTo()}
                            >
                                <Image source={require("../../components/Images/send_icon.png")}
                                    style={{ height: 40, width: 40, }}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const customSytle = StyleSheet.create({
    sentMessage: {
        flexDirection: 'row', 
        marginHorizontal: 10, 
        alignItems: 'flex-end', 
        marginTop: 30,
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    receiveMessage: {
        flexDirection: 'row', 
        marginHorizontal: 10, 
        alignItems: 'flex-end', 
        marginTop: 30,
        marginBottom: 10
    },
    messageText: {
        marginLeft: 10, 
        padding: 5, 
        minWidth: wp('20%'), 
        maxWidth: wp('70%'), 
        minHeight: hp('8%'), 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: 5,
        alignItems: 'center'
    }
})

export default MessageChat;
