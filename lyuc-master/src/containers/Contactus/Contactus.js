import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, ScrollView
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import RF from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Contactus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            firstname: '',
            subject: '',
            email: '',
            aboutme: ''
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <AppHeader
                    headerTitle={'CONTACT US'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <View>
                    <Text style={{ marginLeft: 15, fontSize: 16, marginTop: 10, fontWeight: '500', color: 'grey' }}>NAME</Text>
                </View>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.firstname}
                        onChangeText={(text) => this.setState({ firstname: text })} />
                </View>
                <View>
                        <Text style={{ marginLeft: 15, fontSize: 16, marginTop: 10,fontWeight:'500',color:'grey'}}>EMAIL ADDRESS</Text>
                    </View>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })} />
                </View>
                <View>
                        <Text style={{ marginLeft: 15, fontSize: 16, marginTop: 10,fontWeight:'500',color:'grey'}}>SUBJECT/CONCERN</Text>
                    </View>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.subject}
                        onChangeText={(text) => this.setState({ subject: text })} />
                </View>
                <View>
                        <Text style={{ marginLeft: 15, fontSize: 16, marginTop: 10,fontWeight:'500',color:'grey'}}>MESSAGE</Text>
                    </View>
                <View style={styles.aboutMe}>
                    <TextInput style={styles.aboutmeinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter here"
                        placeholderTextColor="#999999"
                        multiline={true}
                        autoCapitalize="none"
                        value={this.state.aboutme}
                        onChangeText={(text) => this.setState({ aboutme: text })} />
                    <Text style={{ alignSelf: 'flex-end', marginRight: 10, color: 'grey' }}>0/300 characters remaining</Text>
                </View>

                <TouchableOpacity style={{
                    width: width / 2 + 20,
                    height: moderateScale(45, 0.7),
                    borderRadius: moderateScale(15),
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000',
                    marginTop: verticalScale(40)
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Send</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default Contactus;
