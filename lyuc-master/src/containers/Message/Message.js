import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, FlatList, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import * as firebase from 'firebase'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchedList: [],
        }
    }

    async componentDidMount() {
        const myUid = await AsyncStorage.getItem('uid');
        var ref = firebase.database().ref("Users/" + myUid + '/matched');
        ref.on('value', snapshot=>{
            this.setState({matchedList: []});
            snapshot.forEach((child) => {
                const matched = child.child('matched').val();
                if(matched === 0) {
                    const matchedUid = child.child('uid').val();
                    const dataRef = firebase.database().ref('Users/' + matchedUid);
                    dataRef.once('value').then((data) => {
                        const firstName = data.child('firstName').val();
                        const lastName = data.child('lastName').val();
                        const avatarUri = data.child('avatarUri').val();
                        this.setState({matchedList: [...this.state.matchedList, {firstName: firstName, lastName: lastName, avatarUri: avatarUri, matchedUid: matchedUid}]});
                    })
                }
            })
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    headerTitle={'CHAT AND VIDEO CALL'}
                />
                <FlatList
                    data={this.state.matchedList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => { 
                        Actions.MessageChat({
                            nameToChat: this.state.matchedList[index].firstName + ' ' + this.state.matchedList[index].lastName,
                            uidTo: this.state.matchedList[index].matchedUid,
                            avatarUri: this.state.matchedList[index].avatarUri 
                        })}
                    }>
                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderColor: '#000',
                            padding: 4,
                            justifyContent: 'space-between',
                            paddingHorizontal: 15
                        }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View>
                                    <Image source={{uri: item.avatarUri}}
                                        style={{ height: 80, width: 80, borderRadius: 40}}>
                                    </Image>
                                </View>
                                <View style={{ marginLeft: 20, alignSelf: 'center' }}>
                                    <Text>{item.firstName + ' ' + item.lastName}</Text>
                                </View>
                            </View>
                            {/* <View style={{ alignSelf: 'center', flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>
                                <Image source={item.image1}
                                    style={{ height: 20, width: 20, }}>
                                </Image>
                                <Image source={item.image2}
                                    style={{ height: 20, width: 20, marginLeft: 10, tintColor:'#800000',}}>
                                </Image>
                            </View> */}
                        </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

export default Message;
