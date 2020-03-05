import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, PermissionsAndroid
} from "react-native";
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import {RFPercentage} from "react-native-responsive-fontsize";
var width = Dimensions.get('window').width; //full width
import { Voximplant } from 'react-native-voximplant'

class VideoCall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

    componentDidMount() {
        if (this.call) {
            Object.keys(Voximplant.CallEvents).forEach((eventName) => {
                const callbackName = `_onCall${eventName}`;
                if (typeof this[callbackName] !== 'undefined') {
                    this.call.on(eventName, this[callbackName]);
                }
            });
        }
    }

    componentWillUnmount() {
        if (this.call) {
            Object.keys(Voximplant.CallEvents).forEach((eventName) => {
                const callbackName = `_onCall${eventName}`;
                if (typeof this[callbackName] !== 'undefined') {
                    this.call.off(eventName, this[callbackName]);
                }
            });
            this.call = null;
        }
    }

    async answerCall(withVideo, email) {
        try {
            if (Platform.OS === 'android') {
                let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];
                if (withVideo) {
                    permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
                }
                const granted = await PermissionsAndroid.requestMultiple(permissions);
                const recordAudioGranted = granted['android.permission.RECORD_AUDIO'] === 'granted';
                const cameraGranted = granted['android.permission.CAMERA'] === 'granted';
                if (recordAudioGranted) {
                    if (withVideo && !cameraGranted) {
                        console.warn('CallingOn: answerCall: camera permission is not granted');
                        return;
                    }
                } else {
                    console.warn('CallingOn: answerCall: record audio permission is not granted');
                    return;
                }
            }
        } catch (e) {
            console.warn('CallingOn: asnwerCall:' + e);
            return;
        }

        Actions.CallEnd({
            callId: this.call.callId,
            isVideo: withVideo,
            isIncoming: true,
            stopwatchRun: 'watchStart',
            email: email
        });
    }
    declineCall() {
        this.call.decline();
    }

    _onCallDisconnected = (event) => {
        CallManager.getInstance().removeCall(event.call);
        Actions.Home()
    };

    _onCallEndpointAdded = (event) => {
        const displayName = event.endpoint.displayName
        this.setState({ displayName: displayName }, () => {
            this.getUserData(this.state.displayName)
        });
    };


    getUserData = (userEmail) => {
        
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <AppHeader 
                    headerTitle = {this.props.email}
                />
                <View >
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: width - 80,
                    }} >
                        <Image style={{
                            height: width / 2, width: width / 3 + 30, borderRadius: 10
                        }} source={require("../../components/Images/people.jpeg")} />
                    </View>
                    <View style={{ alignItems: 'center', height: 60, justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#000', fontSize: RFPercentage(4) }}>Jane Harrison</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: width / 2 + 50,
                        alignSelf: 'center', height: 60, marginTop: 20
                    }}>
                        <TouchableOpacity
                            onPress={() => this.declineCall()}
                        >
                            <View style={{}}>
                                <Image style={{
                                    height: 50, width: 50, marginTop: 5
                                }} source={require("../../components/Images/accept.png")} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.answerCall(false, this.state.profile_email)}
                        >
                            <View>
                                <Image style={{
                                    height: 60, width: 60,
                                }} source={require("../../components/Images/calldrop.png")} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}

export default VideoCall;
