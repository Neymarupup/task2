import React from "react";
import {
    View, Text, Image, TouchableOpacity, PermissionsAndroid, Dimensions, Alert, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import { Voximplant } from 'react-native-voximplant';
import CallManager from '../../manager/CallManager'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
var width = Dimensions.get('window').width;


const CALL_STATES = {
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
};


class CallEnd extends React.Component {
    constructor(props) {
        super(props);
        this.callId = this.props.callId? this.props.callId : null
        this.state = {
            modalVisible: false
        }
        this.call = CallManager.getInstance().getCallById(this.callId)
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

    toggleTimer() {
        this.setState({ timerStart: !this.state.timerStart, timerReset: false });
    }

    resetTimer() {
        this.setState({ timerStart: false, timerReset: true });
    }

    toggleStopwatch() {
        this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
    }

    resetStopwatch() {
        this.setState({ stopwatchStart: false, stopwatchReset: true });
    }

    componentDidMount() {
        this.setState({ stateString: 'Ringing...' })
        if (this.call) {
            Object.keys(Voximplant.CallEvents).forEach((eventName) => {
                const callbackName = `_onCall${eventName}`;
                if (typeof this[callbackName] !== 'undefined') {
                    this.call.on(eventName, this[callbackName]);
                }
            });
        }
        Object.keys(Voximplant.Hardware.AudioDeviceEvents).forEach((eventName) => {
            const callbackName = `_onAudio${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                Voximplant.Hardware.AudioDeviceManager.getInstance().on(eventName, this[callbackName]);
            }
        });

        this.callState = CALL_STATES.CONNECTING;

        (async () => {
            let currentAudioDevice = await Voximplant.Hardware.AudioDeviceManager.getInstance().getActiveDevice();
            switch (currentAudioDevice) {
                case Voximplant.Hardware.AudioDevice.BLUETOOTH:
                    this.setState({ audioDeviceIcon: 'bluetooth-audio' });
                    break;
                case Voximplant.Hardware.AudioDevice.SPEAKER:
                    this.setState({ audioDeviceIcon: 'volume-up' });
                    break;
                case Voximplant.Hardware.AudioDevice.WIRED_HEADSET:
                    this.setState({ audioDeviceIcon: 'headset' });
                    break;
                case Voximplant.Hardware.AudioDevice.EARPIECE:
                default:
                    this.setState({ audioDeviceIcon: 'hearing' });
                    break;
            }
        })();
    }
    
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    componentWillUnmount() {
        if (this.call) {
            Object.keys(Voximplant.CallEvents).forEach((eventName) => {
                const callbackName = `_onCall${eventName}`;
                if (typeof this[callbackName] !== 'undefined') {
                    this.call.off(eventName, this[callbackName]);
                }
            });
        }
        Object.keys(Voximplant.Hardware.AudioDeviceEvents).forEach((eventName) => {
            const callbackName = `_onAudio${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                Voximplant.Hardware.AudioDeviceManager.getInstance().off(eventName, this[callbackName]);
            }
        });
    }

    muteAudio = () => {
        const isMuted = this.state.isAudioMuted;
        this.call.sendAudio(isMuted);
        this.setState({ isAudioMuted: !isMuted });
    }

    sendVideo = async (doSend) => {
        try {
            if (doSend && Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('CallScreen[' + this.callId + '] sendVideo: failed due to camera permission is not granted');
                    return;
                }
            }
            await this.call.sendVideo(doSend);
            this.setState({ isVideoSent: doSend });
        } catch (e) {
            console.warn(`Failed to sendVideo(${doSend}) due to ${e.code} ${e.message}`);
        }
    }

    hold = async (doHold) => {
        try {
            await this.call.hold(doHold);
        } catch (e) {
            console.warn('Failed to hold(' + doHold + ') due to ' + e.code + ' ' + e.message);
        }
    }

    receiveVideo = async () => {
        try {
            await this.call.receiveVideo();
        } catch (e) {
            console.warn('Failed to receiveVideo due to ' + e.code + ' ' + e.message);
        }
    }

    endCall = () => {
        this.call.getEndpoints().forEach(endpoint => {
            this._setupEndpointListeners(endpoint, false);
        });
        this.call.hangup();
        Actions.MessageChat()
    }

    switchKeypad() {
        let isVisible = this.state.isKeypadVisible;
        this.setState({ isKeypadVisible: !isVisible });
    }

    async switchAudioDevice() {
        let devices = await Voximplant.Hardware.AudioDeviceManager.getInstance().getAudioDevices();
        this.setState({ audioDevices: devices, audioDeviceSelectionVisible: true });
    }

    selectAudioDevice(device) {
        Voximplant.Hardware.AudioDeviceManager.getInstance().selectAudioDevice(device);
        this.setState({ audioDeviceSelectionVisible: false });
    }

    declineCall = () => {
        this.call.decline();
    }

    _onCallEndpointAdded = (event) => {
        const userName = event.endpoint.displayName
        this.setState({ displayName: userName });
    };

    _keypadPressed(value) {
        this.call.sendTone(value);
    }

    _closeModal() {
        this.setState({ isModalOpen: false, modalText: '' });
        this.props.navigation.navigate('App');
    }

    _onCallFailed = (event) => {
        console.log('===TEMP', event)
        if (event.reason === 'Decline') {
            Alert.alert('Call', 'Your calling was declined')
        }
        else {
            Alert.alert('Call', 'Call failed')
        }
        this.callState = CALL_STATES.DISCONNECTED;
        CallManager.getInstance().removeCall(this.call);
        this.setState({
            isModalOpen: true,
            modalText: 'Call failed: ' + event.reason,
            remoteVideoStreamId: null,
            localVideoStreamId: null,
        });
        Actions.MessageChat()
    };

    _onCallDisconnected = (event) => {
        Alert.alert('Call', "Call is ended")
        this.setState({
            remoteVideoStreamId: null,
            localVideoStreamId: null,
        });

        CallManager.getInstance().removeCall(this.call);
        if (Platform.OS === 'android' && Platform.Version >= 26 && this.callState === CALL_STATES.CONNECTED) {
            (async () => {
                await VIForegroundService.stopService();
            })();
        }
        this.callState = CALL_STATES.DISCONNECTED;
        this.resetStopwatch();
        Actions.Home()
    };

    _onCallConnected = (event) => {
        if (this.state.watchStart === 'watchStart') {
            this.toggleStopwatch();
        }

        this.callState = CALL_STATES.CONNECTED;
        if (Platform.OS === 'android' && Platform.Version >= 26) {
            const channelConfig = {
                id: 'ForegroundServiceChannel',
                name: 'In progress calls',
                description: 'Notify the call is in progress',
                enableVibration: false,
            };
            const notificationConfig = {
                channelId: 'ForegroundServiceChannel',
                id: 3456,
                title: 'Voximplant',
                text: 'Call in progress',
                icon: 'ic_vox_notification',
            };
        }
    };

    _onCallLocalVideoStreamAdded = (event) => {
        // this.setState({ localVideoStreamId: event.videoStream.id });
    };

    _onCallLocalVideoStreamRemoved = (event) => {
        // this.setState({ localVideoStreamId: null });
    };

    _onCallEndpointAdded = (event) => {
        this._setupEndpointListeners(event.endpoint, true);
    };

    _onEndpointRemoteVideoStreamAdded = (event) => {
        this.setState({ remoteVideoStreamId: event.videoStream.id });
    };

    _onEndpointRemoteVideoStreamRemoved = (event) => {
        if (this.state.remoteVideoStreamId === event.videoStream.id) {
            this.setState({ remoteVideoStreamId: null });
        }
    };

    _onEndpointRemoved = (event) => {
        this._setupEndpointListeners(event.endpoint, false);
    };

    _onEndpointInfoUpdated = (event) => {
        if(this.call)
            console.log('CallScreen: _onEndpointInfoUpdated: callid: ' + this.call.callId + ' endpoint id: ' + event.endpoint.id);
    };

    _setupEndpointListeners(endpoint, on) {
        Object.keys(Voximplant.EndpointEvents).forEach((eventName) => {
            const callbackName = `_onEndpoint${eventName}`;
            if (typeof this[callbackName] !== 'undefined') {
                endpoint[(on) ? 'on' : 'off'](eventName, this[callbackName]);
            }
        });
    }

    _onAudioDeviceChanged = (event) => {
        switch (event.currentDevice) {
            case Voximplant.Hardware.AudioDevice.BLUETOOTH:
                this.setState({ audioDeviceIcon: 'bluetooth-audio' });
                break;
            case Voximplant.Hardware.AudioDevice.SPEAKER:
                this.setState({ audioDeviceIcon: 'volume-up' });
                break;
            case Voximplant.Hardware.AudioDevice.WIRED_HEADSET:
                this.setState({ audioDeviceIcon: 'headset' });
                break;
            case Voximplant.Hardware.AudioDevice.EARPIECE:
            default:
                this.setState({ audioDeviceIcon: 'hearing' });
                break;
        }
    };

    _onAudioDeviceListChanged = (event) => {
        (async () => {
            let device = await Voximplant.Hardware.AudioDeviceManager.getInstance().getActiveDevice();
        })();
        this.setState({ audioDevices: event.newDeviceList });
    };

    render() {
        return (
            <View style={{ backgroundColor: '#000', flex: 1 }}>
                <View style={{ alignItems: 'center', height: width / 2 + 70, justifyContent: 'flex-end', }}>
                    <View style={{ marginTop: 90 }} >
                        <Image style={{
                            height: width / 3 + 20, width: width / 3 + 20, borderRadius: 70
                        }} source={require("../../components/Images/people.jpeg")} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#fff', fontSize: RFPercentage(3), fontWeight: 'bold' }}>Jane Harrison</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.endCall()}
                    style={{ flex: 1, position: 'absolute', bottom: 80, alignSelf: 'center' }}>
                    <View style={{}}>
                        <Image style={{
                            height: 60, width: 60,
                        }} source={require("../../components/Images/calldrop.png")} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CallEnd;
