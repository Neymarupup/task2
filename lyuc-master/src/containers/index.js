import React, { Component } from 'react';
import { Scene, Router, Actions, Reducer, ActionConst, Overlay, Tabs, Modal, Drawer, Stack, Lightbox, } from "react-native-router-flux";
import { connect } from "react-redux";
import { Title, Icon, } from "native-base";
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, Image, View, Dimensions, } from "react-native";
import Loader from './../constants/Loader';
import Splash from './../containers/Splash';
import Login from './../containers/Login';
import Signup from './../containers/Signup';
import Favourites from './../containers/Favourites';
import Userprofile from './Userprofile';
import Home from './Home';
import AppIntro from './../containers/AppIntro';
import ForgotPassword from './ForgotPassword';
import Message from './Message';
import Setting from './Setting';
import LikedTab from './LikedTab';
import UnlikedTab from './UnlikedTab';
import MatchedTab from './MatchedTab';
import Unmatched from './Unmatched';
import Searchfilter from './Searchfilter';
import MessageChat from './MessageChat';
import Editprofile from './Editprofile';
import Termsandcondition from './Termsandconditon'
import Privacypolicy from './Privacypolicy';
import Contactus from './Contactus';
import Newpassword from './Newpassword';
import Aboutapp from './Aboutapp';
import Myprofile from './Myprofile';
import LandingPage from './LandingPage';
import VideoCall from './VideoCall';
import CallEnd from './CallEnd';

const TabIcon = ({ selected, title, img, focused }) => {
    return (
        <Image source={img}
            style={{ width: 30, height: 30, tintColor: focused ? "#fff" : "#808080", }}>
        </Image>
    )
}

var width = Dimensions.get('window').width; //full width
const RouterWithRedux = connect()(Router);

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            isStorageLoaded: false,
            loggedIn: false,
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
                token: token !== null,
                isStorageLoaded: true
            })
        });
    }
    render() {
        let { isStorageLoaded } = this.state;
        if (!isStorageLoaded) {
            return (
                <Loader loading={true} />
            )
        } else {
            return (
                <RouterWithRedux navigationBarStyle={{ backgroundColor: '#5dca67', }}>
                    <Scene key="root" hideNavBar hideTabBar>
                        <Stack key="app">
                            <Scene hideNavBar panHandlers={null}>
                                <Scene>
                                    <Scene
                                        component={Splash}
                                        hideNavBar={true}
                                        key='Splash'
                                        title='Splash'
                                        type='replace'
                                    />
                                    <Scene
                                        component={AppIntro}
                                        hideNavBar={true}
                                        key='AppIntro'
                                        type='replace'
                                    // title='AppIntro'
                                    />
                                    <Scene
                                        component={Login}
                                        hideNavBar={true}
                                        key='Login'
                                        title='Login'
                                    />
                                    <Scene
                                        component={LandingPage}
                                        hideNavBar={true}
                                        key='LandingPage'
                                        type='replace'
                                    />
                                    <Scene
                                        component={Signup}
                                        hideNavBar={true}
                                        key='Signup'
                                        title='Signup'
                                    />
                                    <Scene
                                        component={ForgotPassword}
                                        hideNavBar={true}
                                        key='ForgotPassword'
                                    />

                                    {/* <Drawer
                                            hideNavBar
                                            key="drawer"
                                            onExit={() => {
                                                console.log('Drawer closed');
                                            }}
                                            onEnter={() => {
                                                console.log('Drawer opened');
                                            }}
                                            contentComponent={Home}
                                            drawerWidth={width - 100}
                                        > */}
                                    <Scene
                                        key='tabbar'
                                        hideNavBar
                                        tabs
                                        showLabel={false}
                                        tabBarStyle={{ backgroundColor: '#000' }}
                                    >
                                        <Scene img={require('../components/Images/heart_icon_active.png')} icon={TabIcon}>
                                            <Scene
                                                component={Favourites}
                                                hideNavBar={true}
                                                key='Favourites'
                                                showLabel={false}
                                            />
                                        </Scene>
                                        <Scene img={require('../components/Images/user_icon.png')} icon={TabIcon}>
                                            <Scene
                                                component={Myprofile}
                                                hideNavBar={true}
                                                key='Myprofile'
                                                showLabel={false}
                                            />
                                        </Scene>
                                        <Scene img={require('../components/Images/home_icon_active.png')} icon={TabIcon}>
                                            <Scene
                                                component={Home}
                                                hideNavBar={true}
                                                key='Home'
                                            />
                                        </Scene>
                                        <Scene key='Messages' img={require('../components/Images/chat_icon_active.png')} icon={TabIcon}>
                                            <Scene
                                                component={Message}
                                                hideNavBar={true}
                                                key='Message' 
                                                showLabel={false}
                                            />
                                        </Scene>
                                        <Scene img={require('../components/Images/settings(1).png')} icon={TabIcon}>
                                            <Scene
                                                component={Setting}
                                                hideNavBar={true}
                                                key='Setting'
                                                showLabel={false}
                                            />
                                        </Scene>
                                    </Scene>
                                    {/* </Drawer> */}
                                    <Scene
                                        component={LikedTab}
                                        hideNavBar={true}
                                        key='LikedTab'
                                    />
                                    <Scene
                                        component={UnlikedTab}
                                        hideNavBar={true}
                                        key='UnlikedTab'
                                    />
                                    <Scene
                                        component={MatchedTab}
                                        hideNavBar={true}
                                        key='MatchedTab'
                                    />
                                    <Scene
                                        component={Unmatched}
                                        hideNavBar={true}
                                        key='Unmatched'
                                    />
                                     <Scene
                                        component={Searchfilter}
                                        hideNavBar={true}
                                        key='Searchfilter'
                                    />
                                     <Scene
                                        component={MessageChat}
                                        hideNavBar={true}
                                        key='MessageChat'
                                    />
                                      <Scene
                                        component={Editprofile}
                                        hideNavBar={true}
                                        key='Editprofile'
                                    />
                                      <Scene
                                        component={Termsandcondition}
                                        hideNavBar={true}
                                        key='Termsandcondition'
                                    />
                                       <Scene
                                        component={Privacypolicy}
                                        hideNavBar={true}
                                        key='Privacypolicy'
                                    />
                                        <Scene
                                        component={Contactus}
                                        hideNavBar={true}
                                        key='Contactus'
                                    />
                                        <Scene
                                        component={Newpassword}
                                        hideNavBar={true}
                                        key='Newpassword'
                                    />
                                       <Scene
                                        component={Aboutapp}
                                        hideNavBar={true}
                                        key='Aboutapp'
                                    />
                                        <Scene
                                        component={Userprofile}
                                        hideNavBar={true}
                                        key='Userprofile'
                                    />
                                        <Scene
                                        component={VideoCall}
                                        hideNavBar={true}
                                        key='VideoCall'
                                    />
                                        <Scene
                                        component={CallEnd}
                                        hideNavBar={true}
                                        key='CallEnd'
                                    />
                                </Scene>
                            </Scene>
                        </Stack>
                    </Scene>
                </RouterWithRedux>

            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};
export default connect(mapStateToProps)(Root)
console.disableYellowBox = true