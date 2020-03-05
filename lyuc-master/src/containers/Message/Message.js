import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, FlatList, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const users = [
    {
        "image": require("../../components/Images/1.png"),
        "name": "Ana Stellie",
        "image1":require("../../components/Images/verified.png")
        
    },
    {
        "image": require("../../components/Images/profile2.png"),
        "name": "Timsthey Phillips",
        "image2":require("../../components/Images/error.png"),
        "image1":require("../../components/Images/verified.png")
    },
    {
        "image": require("../../components/Images/profile4.png"),
        "name": "Timsthey Phillips",
    },
    {
        "image": require("../../components/Images/profile6.png"),
        "name": "Timsthey Phillips",
    },
    {
        "image": require("../../components/Images/profile4.png"),
        "name": "Timsthey Phillips",
    },
    {
        "image": require("../../components/Images/1.png"),
        "name": "Timsthey Phillips",
    },
    {
        "image": require("../../components/Images/1.png"),
        "name": "Timsthey Phillips",
    },
    {
        "image": require("../../components/Images/profile4.png"),
        "name": "Timsthey Phillips",
    },
    {
        "image": require("../../components/Images/editimg.png"),
        "name": "Timsthey Phillips",
    },
]

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    headerTitle={'CHAT AND VIDEO CALL'}
                />
                <FlatList
                    data={users}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => Actions.MessageChat()}>
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
                                    <Image source={item.image}
                                        style={{ height: 80, width: 80, }}>
                                    </Image>
                                </View>
                                <View style={{ marginLeft: 20, alignSelf: 'center' }}>
                                    <Text>{item.name}</Text>
                                </View>
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>
                                <Image source={item.image1}
                                    style={{ height: 20, width: 20, }}>
                                </Image>
                                <Image source={item.image2}
                                    style={{ height: 20, width: 20, marginLeft: 10, tintColor:'#800000',}}>
                                </Image>
                            </View>
                        </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

export default Message;
