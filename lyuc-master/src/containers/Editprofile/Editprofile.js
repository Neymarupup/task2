import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import Carousel from "react-native-snap-carousel";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AppHeader from "../../components/AppHeader";
import { verticalScale } from "react-native-size-matters";
import DatePicker from 'react-native-datepicker'
import ImagePicker from "react-native-image-crop-picker";
import * as firebase from 'firebase';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class Editprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      firstname: "",
      lastname: "",
      occupation: "",
      aboutme: "",
      filePath: {},
      imageUri: "",
      birthday: "",
      myPicture: [],
      gender: 'male',
      city: '',
      lattitude: 0,
      longitude: 0
    };
  }
  async componentDidMount() {
    firstname = await AsyncStorage.getItem('firstName');
    lastname = await AsyncStorage.getItem('lastName');
    occupation = await AsyncStorage.getItem('occupation');
    city = await AsyncStorage.getItem('city');
    aboutme = await AsyncStorage.getItem('aboutMe');
    birthday = await AsyncStorage.getItem('birthday');
    avatarUri = await AsyncStorage.getItem('avatarUri');
    gender = await AsyncStorage.getItem('gender')
    this.setState({firstname: firstname});
    this.setState({lastname: lastname});
    this.setState({occupation: occupation});
    this.setState({city: city});
    this.setState({aboutme: aboutme});
    this.setState({birthday: birthday});
    this.setState({imageUri: avatarUri});
    this.setState({gender: gender});
  }

  chooseFile = async () => {
    let response = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    });
    if (Array.isArray(response)) {
      response = response[0];
    }
    if(response){
        this.setState({imageUri: response.path});
        // alert(firebase.storage()
        // alert(firebase.auth().currentUser.email);
        
          // firebase
          // .storage()
          // .ref('st/1.png')
          // .put(response.path).then(()=>{
          //   alert("ss")
          // }).catch(()=>{
          //   alert('error');
          // })
      // alert("asdf");
    }
  }

  uploadMyPicture = async () => {
    let response = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    });
    if (Array.isArray(response)) {
      response = response[0];
    }
    if(response){
      this.setState({myPicture: [...this.state.myPicture, response.path]})
    }
  }

  onSaveChange = async () => {
    const emailAddress = await AsyncStorage.getItem('email');
    const firstName = this.state.firstname;
    const lastName = this.state.lastname;
    const occupation = this.state.occupation;
    const city = this.state.city;
    const birthday = this.state.birthday;
    const aboutMe = this.state.aboutme;
    const lattitude = this.state.lattitude;
    const longitude = this.state.longitude;
    const uid = await AsyncStorage.getItem('uid');
    const dataUrl = 'Users/' + uid;

    firebase.database().ref(dataUrl).update({
      emailAddress,
      firstName,
      lastName,
      occupation,
      city,
      birthday,
      aboutMe,
      avatarUri: this.state.imageUri,
      gender: this.state.gender,
      uid: uid,
      lattitude,
      longitude
    }).then((data)=>{
      AsyncStorage.setItem('firstName', this.state.firstName);
      AsyncStorage.setItem('lastName', this.state.lastName);
      AsyncStorage.setItem('occupation', this.state.occupation);
      AsyncStorage.setItem('birthday', this.state.birthday);
      AsyncStorage.setItem('city', this.state.city);
      AsyncStorage.setItem('aboutMe', this.state.aboutMe);     
      AsyncStorage.setItem('gender', this.state.gender);    
      this.props.navigation.navigate('Myprofile', {updata: true});
    }).catch((error)=>{
      alert("fail");
    })
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <AppHeader
          headerTitle={"EDIT PROFILE"}
          backgo={require("../../components/Images/leftarrow.png")}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView keyboardShouldPersistTaps='always'>
          <View>
            <View
              style={{
                alignSelf: "center",
                height: 100,
                width: 100,
                marginTop: 15,
                borderWidth: 2,
                borderColor: "#000",
                borderRadius: 100 / 2,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 5
              }}
            >
             <Image
                source={
                  this.state.imageUri !== ""
                    ? {
                        uri: this.state.imageUri
                      }
                    : require("../../components/Images/userimg.png")
                }
                style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
              />
            </View>
            <TouchableOpacity onPress={()=>this.chooseFile()}>
              <Text
                style={{
                  fontSize: RFPercentage(2.2),
                  marginTop: verticalScale(10),
                  textAlign: "center",
                  textDecorationLine: "underline",
                  fontWeight: "bold"
                }}
              >
                Upload Photo
              </Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "500",
                  color: "grey"
                }}
              >
                FIRST NAME
              </Text>
            </View>
            <View style={styles.fieldView}>
              <TextInput
                style={styles.nameTextinputview}
                underlineColorAndroid="transparent"
                placeholder="First name"
                placeholderTextColor="#999999"
                autoCapitalize="none"
                value={this.state.firstname}
                onChangeText={text => this.setState({ firstname: text })}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "500",
                  color: "grey"
                }}
              >
                LAST NAME
              </Text>
            </View>
            <View style={styles.lastnameoccupation}>
              <TextInput
                style={styles.lastnameinputview}
                underlineColorAndroid="transparent"
                placeholder="Last name"
                placeholderTextColor="#999999"
                autoCapitalize="none"
                value={this.state.lastname}
                onChangeText={text => this.setState({ lastname: text })}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ color: 'grey', fontSize: 14, fontWeight: 'bold', marginLeft: 14 }}>GENDER</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity 
                  activeOpacity={0.8} 
                  style={this.state.gender === 'male' ? customStyles.generSelected : customStyles.genderUnSelected}
                  onPress={() => {this.setState({gender: 'male'})}}
                >
                  <Text style={this.state.gender === 'male' ? customStyles.genderSelectedFont : customStyles.genderUnSelectedFont}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  activeOpacity={0.8} 
                  style={this.state.gender === 'female' ? {...customStyles.generSelected, marginLeft: 15} : {...customStyles.genderUnSelected, marginLeft: 15}}
                  onPress={() => {this.setState({gender: 'female'})}}
                >
                  <Text style={this.state.gender === 'female' ? customStyles.genderSelectedFont : customStyles.genderUnSelectedFont}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "500",
                  color: "grey"
                }}
              >
                OCCUPATION
              </Text>
            </View>
            <View style={styles.lastnameoccupation}>
              <TextInput
                style={styles.lastnameinputview}
                underlineColorAndroid="transparent"
                placeholder="Occupation"
                placeholderTextColor="#999999"
                autoCapitalize="none"
                value={this.state.occupation}
                onChangeText={text => this.setState({ occupation: text })}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "500",
                  color: "grey"
                }}
              >
                CITY
              </Text>
            </View>
            <View style={{marginHorizontal: 25, marginTop: 10}}>
              {this.state.city !== '' && (
                <GooglePlacesAutocomplete
                  placeholder="input your address"
                  minLength={2} // minimum length of text to search
                  autoFocus={false}
                  returnKeyType={"search"}
                  listViewDisplayed="false"
                  fetchDetails={true}
                  onPress={(data, detail=null)=> {
                    this.setState({city: data.description});
                    this.setState({lattitude: detail.geometry.location.lat});
                    this.setState({longitude: detail.geometry.location.lng});
                  }}
                  renderDescription={row =>
                    row.description || row.formatted_address || row.name
                  }
                  getDefaultValue={() => {
                    return this.state.city
                  }}
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyCyQpmp9mMFMVhjX9Dus1GlAvsxfOKERE0',
                    language: 'en', // language of the results
                    types: '(cities)', // default: 'geocode'
                  }}
                  styles={{
                    textInput: {
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginTop: 0,
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#000',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                  }}
                  filterReverseGeocodingByTypes={[
                    'locality',
                    'administrative_area_level_3',
                  ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "500",
                  color: "grey"
                }}
              >
                BIRTHDAY
              </Text>
            </View>
            <DatePicker
              style={{width: '80%', alignSelf: 'center'}}
              date={this.state.birthday}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              maxDate="2100-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({birthday: date})}}
            />
            <View>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 16,
                  marginTop: 10,
                  fontWeight: "500",
                  color: "grey"
                }}
              >
                ABOUT ME
              </Text>
            </View>
            <View style={styles.aboutMe}>
              <TextInput
                style={styles.aboutmeinputview}
                underlineColorAndroid="transparent"
                placeholder="About Me"
                placeholderTextColor="#999999"
                multiline={true}
                autoCapitalize="none"
                value={this.state.aboutme}
                onChangeText={text => this.setState({ aboutme: text })}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 16,
                marginTop: 10,
                fontWeight: "500",
                color: "grey"
              }}
            >
              MY PICTURES
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 15
            }}
          >
            <ScrollView horizontal={true} style={{marginHorizontal: 20}} >
              {this.state.myPicture.map(item => (
                <Image
                  source={{uri: item}}
                  style={{ width: 80, height: 80, marginRight: 20 }}/>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              paddingHorizontal: 18,
              marginTop: 8
            }}
            onPress={()=>this.uploadMyPicture()}
          >
            <Image
              source={require("../../components/Images/add.png")}
              style={{ width: 20, height: 20 }}
            ></Image>
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 16,
              marginTop: 10,
              fontWeight: "500",
              color: "grey"
            }}
          >
            MY INTRODUCTION VIDEO
          </Text>
          <View>
            <Image
              style={{
                height: 200,
                width: 340,
                marginTop: 15,
                alignSelf: "center"
              }}
              source={require("../../components/Images/profilemain.jpg")}
            />
          </View>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              paddingHorizontal: 18,
              marginTop: 8
            }}
          >
            <Image
              source={require("../../components/Images/add.png")}
              style={{ width: 20, height: 20 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              width: width / 2 + 40,
              marginTop: 20,
              marginBottom: 20
            }}
            onPress={()=>this.onSaveChange()}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </ScrollView>
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

export default Editprofile;
