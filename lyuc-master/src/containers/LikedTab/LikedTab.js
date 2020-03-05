import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, AsyncStorage, FlatList
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as firebase from 'firebase'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class LikedTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likedList: []
        }
    }

    async componentDidMount() {
        const myUid = await AsyncStorage.getItem('uid');
        firebase.database().ref('Users/' + myUid + '/liked').on("value", snapshot => {
            this.setState({likedList: []});
            snapshot.forEach((child)=>{
                const liked = child.child('liked').val();
                if(liked === 0) {
                    const uid = child.child('uid').val();
                    const ref = firebase.database().ref('Users/' + uid);
                    ref.on('value', data => {
                        const firstName = data.child('firstName').val();
                        const lastName = data.child('lastName').val();
                        const avatarUri = data.child('avatarUri').val();
                        this.setState({likedList: [...this.state.likedList, {firstName: firstName, lastName: lastName, avatarUri: avatarUri, uid: uid}]});
                    })
                }                
            });
        });
    }
    goToProfile(index) {
        AsyncStorage.setItem('selectedUid', this.state.likedList[index].uid)
        AsyncStorage.setItem('UserProfileType', 'liked');
        Actions.Userprofile();
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View>
                    <FlatList
                        data={this.state.likedList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity 
                                style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#000',padding:4}} 
                                activeOpacity={0.7}
                                onPress={()=>this.goToProfile(index)}
                            >
                                <View>
                                    <Image source={{uri: item.avatarUri}}
                                        style={{ height: 70, width: 70, marginLeft:10, borderRadius: 35}}>
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

export default LikedTab;
