import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, PermissionsAndroid, KeyboardAvoidingView, Platform
} from "react-native";
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import { Voximplant } from 'react-native-voximplant'
import CallManager from '../../manager/CallManager'


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
        }
    }
    set_Mile = (distance) => {
        console.log(Math.round(distance * 100) / 100)
        this.setState({ value: Math.round(distance * 100) / 100 })
    }
    set_Distance = (distance1) => {
        console.log(Math.round(distance1 * 100) / 100)
        this.setState({ value: Math.round(distance1 * 100) / 100 })
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
        return (
            <KeyboardAvoidingView behavior={padding} enabled style={{ flex: 1, backgroundColor: "#000" }}>
                <View style={styles.container}>
                    <AppHeader
                        headerTitle={'Anne Steel'}
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
                    <View style={{ flex: 7, backgroundColor: '#f2f2f2' }}>

                    </View>
                    <View style={{ flex: 0.7, backgroundColor: '#fff', justifyContent: 'center', padding: 6, position: 'absolute', bottom: 0 }}>
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
                                    value={this.state.email}
                                    onChangeText={(text) => this.setState({ email: text })} />
                            </View>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
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

export default MessageChat;
