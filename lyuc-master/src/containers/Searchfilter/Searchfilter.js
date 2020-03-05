import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput, FlatList, StyleSheet, AsyncStorage
} from "react-native";
import { Actions } from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Slider from "react-native-slider";
import * as firebase from 'firebase'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Searchfilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxAge: 30,
            maxDistance: 50,
            preferGender: 'male',
            searchResult: [],
            city: ''
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
    async saveFilter() {
        var ref = firebase.database().ref("Users/");
        const myUid = await AsyncStorage.getItem('uid');
        var myLat, myLng;

        await ref.child(myUid).once("value").then((snapshot) => {
            myLat = snapshot.child('lattitude').val();
            myLng = snapshot.child('longitude').val();
        })

        await ref.once("value")
        .then((snapshot) => {
            snapshot.forEach((child)=>{
                const today = new Date().getFullYear();

                const fullName = child.child('firstName').val() + ' ' + child.child('lastName').val();
                const avatarUri = child.child('avatarUri').val();
                const city = child.child('city').val();
                const uid = child.child('uid').val();
                const age = today - child.child('birthday').val().substring(0, 4);
                const gender = child.child('gender').val();
                const lat = child.child('lattitude').val();
                const lng = child.child('longitude').val();
                if((age < this.state.maxAge) && (this.state.preferGender === gender) && (myUid !== uid) && (city.toUpperCase().includes(this.state.city.toUpperCase()) === true)) {
                    const distBetween = this.distance(myLat, myLng, lat, lng);
                    if(distBetween < this.state.maxDistance * 100)
                        this.setState({searchResult: [...this.state.searchResult, {fullName: fullName, avatarUri: avatarUri, city: city, uid: uid}]});                    
                }
            });
        });
        this.props.navigation.navigate('Home', {update: true, searchResult: this.state.searchResult})
    }
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <AppHeader
                    headerTitle={'SEARCH FILTER'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: 'grey', fontSize: 14, fontWeight: 'bold' }}>PREFFERED GENDER</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={this.state.preferGender === 'male' ? customStyles.generSelected : customStyles.genderUnSelected}
                            onPress={() => {this.setState({preferGender: 'male'})}}
                        >
                        <Text style={this.state.preferGender === 'male' ? customStyles.genderSelectedFont : customStyles.genderUnSelectedFont}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={this.state.preferGender === 'female' ? {...customStyles.generSelected, marginLeft: 15} : {...customStyles.genderUnSelected, marginLeft: 15}}
                            onPress={() => {this.setState({preferGender: 'female'})}}
                        >
                        <Text style={this.state.preferGender === 'female' ? customStyles.genderSelectedFont : customStyles.genderUnSelectedFont}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>AGE</Text>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <Slider
                        minimumValue={0}
                        maximumValue={32}
                        value={this.state.maxAge - 18}
                        minimumTrackTintColor="grey"
                        thumbTintColor="#000"
                        onValueChange={(value) =>
                            this.setState({maxAge: value + 18})}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text style={{ color: '#000' }}>18</Text>
                    <Text style={{ color: '#000' }}>26</Text>
                    <Text style={{ color: '#000' }}>34</Text>
                    <Text style={{ color: '#000' }}>42</Text>
                    <Text style={{ color: '#000' }}>50</Text>
                </View>
                <View style={{ marginTop: 15 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>DISTANCE</Text>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="grey"
                            thumbTintColor="#000"
                            value={this.state.maxDistance}
                            onValueChange={(value1) =>
                                this.setState({maxDistance: value1})}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <Text style={{ color: '#000' }}>0mi</Text>
                        <Text style={{ color: '#000' }}>5kmi</Text>
                        <Text style={{ color: '#000' }}>10kmi</Text>
                    </View>
                </View>
                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>DESIRED CITY/LOCATION</Text>
                </View>
                <View style={styles.fieldView}>
                    <TextInput style={styles.nameTextinputview}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Here"
                        placeholderTextColor="#999999"
                        autoCapitalize="none"
                        value={this.state.search}
                        onChangeText={(text) => this.setState({ city: text })} />
                </View>

                <View style={{ marginTop: 25 }}>
                    <TouchableOpacity
                        onPress={()=>this.saveFilter()}
                        style={{
                            backgroundColor: '#000',
                            height: 40,
                            width: 180,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const customStyles = StyleSheet.create({
    generSelected: {
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      height: 35,
      width: 90,
      borderRadius: 10
    },
    genderUnSelected: {
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
      height: 35,
      width: 90,
      borderRadius: 10
    },
    genderSelectedFont: {
      color: '#fff'
    },
    genderUnSelectedFont: {
      color: '#000'
    }
  })
export default Searchfilter;
