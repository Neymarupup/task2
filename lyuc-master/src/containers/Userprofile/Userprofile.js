import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, FlatList, ImageBackground, ScrollView, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import ImageSlider from 'react-native-image-slider';
import AppHeader from '../../components/AppHeader';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import styles from './styles';
import * as firebase from 'firebase'

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

class Userprofile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 1,
            liked: -1,      //0: like, 1: unlike
            active: -1,      // 0: active, 1: inactive
            customStyleIndex: 0,
            customStyleIndex1: 0,
            firstName: '',
            lastName: '',
            fullName: '',
            occupation: '',
            age: '',
            aboutMe: '',
            avatarUri: '',
            gender: '',
            images: [],
            fInitialLike: -1,
            profileType: '',
            matched: -1,    //0: matched, 1: unmatched
        }
    }

    async componentDidMount() {
        
        const selectedUid = await AsyncStorage.getItem('selectedUid');
        const profileType = await AsyncStorage.getItem('UserProfileType');
        this.setState({profileType: profileType});
        

        const myUid = await AsyncStorage.getItem('uid');
        let data;
        await firebase.database().ref('Users/' + selectedUid).once('value', function (snapshot) {
            data = snapshot;
        }).then(() => {
            const today = new Date().getFullYear();
            const age = today - data.child('birthday').val().substring(0, 4);
            
            this.setState({firstName: data.child('firstName').val()});
            this.setState({lastName: data.child('lastName').val()});
            this.setState({occupation: data.child('occupation').val()});
            this.setState({aboutMe: data.child('aboutMe').val()});
            this.setState({avatarUri: data.child('avatarUri').val()});
            this.setState({age: age});
            this.setState({gender: data.child('gender').val()});  

            this.setState({images: [...this.state.images, data.child('avatarUri').val()]});
            for(index = 1; index <= data.child('pictures').numChildren(); index ++) {
                this.setState({images: [...this.state.images, data.child('pictures').child('picture' + index.toString()).val()]})
            }

            if(profileType === 'typical' || profileType === 'unliked') {
                firebase.database().ref('Users/' + myUid + '/liked').once("value")
                .then((snapshot) => {
                    snapshot.forEach((child)=>{
                        const uid = child.child('uid').val();
                        const liked = child.child('liked').val();
                        if(uid === selectedUid){
                            this.setState({liked: liked})
                            this.setState({fInitialLike: liked})
                            return;
                        }
                    });
                });
            }
            if(this.state.profileType === 'liked' || this.state.profileType === 'matched'  || this.state.profileType === 'unmatched' ) {
                firebase.database().ref('Users/' + myUid + '/matched/' + selectedUid).once("value")
                .then((snapshot) => {
                    const matched = snapshot.child('matched').val();
                    if(matched !== null)
                        this.setState({matched: matched});
                });
            }
            
            firebase.database().ref('Users/' + myUid + '/active/' + selectedUid).once("value")
            .then((snapshot) => {
                const active = snapshot.child('active').val();
                if(active !== null)
                    this.setState({active: active});
                else
                    this.setState({active: 0})
            });
            ////////
            // this.setState({searchResult: [...this.state.searchResult, {fullName: fullName, avatarUri: avatarUri, city: city, uid: uid}]});
            // this.setState({images: [...this.state.images, data.child('avatarUri').val()]});
        })
    }

    handleIndexChange = index => {
        if(this.state.profileType === 'typical' || this.state.profileType === 'unliked') {
            if(index === 0)
                this.setState({liked: 0});
            if(index === 1)
                this.setState({liked: 1});
        }
        if(this.state.profileType === 'liked' || this.state.profileType === 'matched' || this.state.profileType === 'unmatched') {
            if(index === 0)
                this.setState({matched: 0});
            if(index === 1)
                this.setState({matched: 1});
        }
    };

    handleIndexChange1 = index => {
        if(index === 0)
            this.setState({active: 0});
        if(index === 1)
            this.setState({active: 1});
    };


    async alreadyHaveUid(myUid, selectedUid) {
        
        const dataUrl = 'Users/' + myUid;
        let ref = firebase.database().ref(dataUrl + '/liked');
        await ref.once("value")
        .then((snapshot) => {
            snapshot.forEach((child)=>{
                const uid = child.child('uid').val();
                if(uid === selectedUid){
                    child.ref.remove();
                }
            });
        });

    }

    async saveAndGoBack() {

        const selectedUid = await AsyncStorage.getItem('selectedUid')
        const uid = await AsyncStorage.getItem('uid');


        /* active-inactive */
        firebase.database().ref('Users/' + uid + '/active/' + selectedUid).set({
            active: this.state.active,
            uid: selectedUid
        }).then({
        }).catch((error)=>{
            alert('save failed');
        })
        
        let dataUrl = 'Users/' + uid;
        
        /* matched-unmatched */
        if(this.state.profileType === 'liked' || this.state.profileType === 'matched' || this.state.profileType === 'unmatched') {
            firebase.database().ref('Users/' + uid + '/matched/' + selectedUid).set({
                matched: this.state.matched,
                uid: selectedUid
            }).then({
            }).catch((error)=>{
                alert('save failed');
            })
        }
        
        /* liked-unliked */
        if(this.state.profileType === 'typical' || this.state.profileType === 'unliked') {
            if(!(this.state.liked === -1 || this.state.liked === this.state.fInitialLike)){
                
                /* liked-unliked */
                await this.alreadyHaveUid(uid, selectedUid);
                firebase.database().ref(dataUrl + '/liked').push({
                    uid: selectedUid,
                    liked: this.state.liked
                }).then((data)=>{        
                }).catch((error)=>{
                    alert("save failed");
                });
            }
        }

        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    headerTitle={'USER PROFILE'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.saveAndGoBack()}
                />
                <ScrollView style={styles.container}>
                    <View style={{ height: 400 }}>
                        <ImageSlider
                            loopBothSides
                            // autoPlayWithInterval={3000}
                            images={this.state.images}
                            customSlide={({ index, item, style, width }) => (
                                // It's important to put style here because it's got offset inside
                                <View key={index} style={[style, styles.customSlide]}>
                                    <ImageBackground blurRadius={5} source={{uri: item}} style={{ height: 400, alignItems: 'center', justifyContent: 'center' }} >
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={{uri: item}} style={{ height: 130, width: 130, borderRadius: 130 / 2, borderWidth: 2, borderColor: '#fff' }} />
                                        </View>
                                        <View style={{ width: 150, marginTop: 20 }}>
                                            <SegmentedControlTab
                                                tabsContainerStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
                                                values={this.state.profileType === 'typical' || this.state.profileType === 'unliked' ? ['Like', 'Unlike'] : ['Matched', 'Unmatched']}
                                                selectedIndex={this.state.profileType === 'typical' || this.state.profileType === 'unliked' ? this.state.liked : this.state.matched }
                                                // values={['Like', 'Unlike']}
                                                // selectedIndex={this.state.liked}
                                                tabStyle={{ borderColor: '#e6005c' }}
                                                activeTabStyle={{ backgroundColor: '#e6005c' }}
                                                onTabPress={this.handleIndexChange}
                                                tabTextStyle={{ color: '#000', fontWeight: 'bold' }}
                                                activeTabTextStyle={{ color: '#fff' }}
                                            />
                                        </View>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', lineHeight: 25, }}>
                                                {this.state.firstName === '' ? '' : this.state.firstName + ' '}
                                                {this.state.lastName === '' ? '' : this.state.lastName}
                                            </Text>
                                            {this.state.profileType === 'matched' && (
                                                <TouchableOpacity activeOpacity={0.7} style={{backgroundColor: 'green', width: '70%', alignSelf: 'center', paddingHorizontal: 10, paddingVertical: 3}}>
                                                    <Text style={{color: 'white'}}>Message</Text>
                                                </TouchableOpacity>
                                            )}
                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', lineHeight: 25, textAlign: 'center' }}>
                                                {this.state.occupation === '' ? '' : this.state.occupation + ' '}
                                                {this.state.age === '' ? '' : this.state.age + ' yrs old '}
                                                {this.state.gender === '' ? '' : this.state.gender}
                                            </Text>
                                        </View>
                                        <View style={{ height: 1, width: '80%', backgroundColor: '#fff', alignSelf: 'center', marginTop: 8 }} />
                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', lineHeight: 25, textAlign: 'center' }}>
                                                I'm looking for: Male, 21-25 yrs old
                                            </Text>
                                        </View>
                                        <View style={{ width: 150, marginTop: 20 }}>
                                            <SegmentedControlTab
                                                tabsContainerStyle={{ backgroundColor: '#fff', borderRadius: 5 }}
                                                values={['Active', 'Inactive']}
                                                selectedIndex={this.state.active}
                                                tabStyle={{ borderColor: 'green' }}
                                                activeTabStyle={{ backgroundColor: 'green' }}
                                                onTabPress={this.handleIndexChange1}
                                                tabTextStyle={{ color: '#000', fontWeight: 'bold' }}
                                                activeTabTextStyle={{ color: '#fff' }}
                                            />
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
                        <Text style={{ textAlign: 'justify', fontSize: 12 }}>
                            {this.state.aboutMe === '' ? '' : this.state.aboutMe}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ marginLeft: 18, marginTop: 10, fontSize: 16, fontWeight: 'bold', color: 'grey' }}>VIDEO CLIPS</Text>
                    </View>
                    <View>
                        <Image style={{ height: 200, width: 340, marginTop: 15, alignSelf: 'center' }}
                            source={require('../../components/Images/profilemain.jpg')}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Userprofile;
