import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, AsyncStorage, FlatList
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as firebase from 'firebase'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class UnlikedTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unLikedList: []
        }
    }

    async componentDidMount() {
        const myUid = await AsyncStorage.getItem('uid');
        // await firebase.database().ref('Users/' + myUid + '/liked').once("value")
        // .then((snapshot) => {
        //     snapshot.forEach((child)=>{
        //         const liked = child.child('liked').val();
        //         if(liked === 1) {
        //             const uid = child.child('uid').val();
        //             const ref = firebase.database().ref('Users/' + uid);
        //             ref.once('value').then((data) => {
        //                 const firstName = data.child('firstName').val();
        //                 const lastName = data.child('lastName').val();
        //                 const avatarUri = data.child('avatarUri').val();
        //                 this.setState({unLikedList: [...this.state.unLikedList, {firstName: firstName, lastName: lastName, avatarUri: avatarUri, uid: uid}]});
        //             })
        //         }
        //     });
        // });
        firebase.database().ref('Users/' + myUid + '/liked').on("value", snapshot => {
            this.setState({unLikedList: []});
            snapshot.forEach((child)=>{
                const liked = child.child('liked').val();
                if(liked === 1) {
                    const uid = child.child('uid').val();
                    const ref = firebase.database().ref('Users/' + uid);
                    ref.on('value', data => {
                        const firstName = data.child('firstName').val();
                        const lastName = data.child('lastName').val();
                        const avatarUri = data.child('avatarUri').val();
                        this.setState({unLikedList: [...this.state.unLikedList, {firstName: firstName, lastName: lastName, avatarUri: avatarUri, uid: uid}]});
                    })
                }
            });
        })
    }


    

    goToProfile(index) {
        AsyncStorage.setItem('selectedUid', this.state.unLikedList[index].uid)
        AsyncStorage.setItem('UserProfileType', 'unliked');
        Actions.Userprofile();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View>
                    <FlatList
                        data={this.state.unLikedList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity 
                                style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#000',padding:4}}
                                activeOpacity={0.7}
                                onPress={()=>this.goToProfile(index)}
                            >
                                <View>
                                    <Image source={{uri: item.avatarUri}}
                                        style={{ height: 70, width: 70, marginLeft:10 }}>
                                    </Image>
                                </View>
                                <View style={{marginLeft:20,alignSelf:'center'}}>
                                    <Text>{item.firstName + ' ' + item.lastName}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>

            </View>
        );
    }
}

export default UnlikedTab;
