import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  AsyncStorage
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
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import { ActionSheet } from "native-base";
import * as firebase from 'firebase'

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
let searchResult;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchResult: []
    };
  }

  async componentDidMount() {
    var ref = firebase.database().ref("Users/");
    const myUid = await AsyncStorage.getItem('uid');
    
    ref.once("value")
      .then((snapshot) => {
        snapshot.forEach((child)=>{
          const fullName = child.child('firstName').val() + ' ' + child.child('lastName').val();
          const avatarUri = child.child('avatarUri').val();
          const city = child.child('city').val();
          const uid = child.child('uid').val();
          if(myUid !== uid) {
            this.setState({searchResult: [...this.state.searchResult, {fullName: fullName, avatarUri: avatarUri, city: city, uid: uid}]})
          }
        });
      });
      
  }
  _renderItem({item, index}) {
    return (
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem('selectedUid', searchResult[index].uid);
          AsyncStorage.setItem('UserProfileType', 'typical');
          Actions.Userprofile();
        }}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 20
        }}
      >
        <Image
          source={{uri: item.avatarUri}}
          style={{ width: wp("80%"), height: wp("80%"), borderRadius: 10 }} />
          <View style={{ alignSelf: "center", flex: 1, marginTop: 10 }}>
          <Text
            style={{
              color: "#000",
              fontSize: RFPercentage(2.8),
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: 25
            }}
          >
            {item.fullName}
          </Text>
          <Text
            style={{
              color: "#000",
              fontSize: RFPercentage(2.5),
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: 25
            }}
          >
            {item.city}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const update = this.props.navigation.getParam('update', false)
    searchResult = this.state.searchResult;
    if(update) {
      searchResult = this.props.navigation.getParam('searchResult')
    }
    return (
      <View style={styles.mainContainer}>
        <AppHeader headerTitle={"MEET PEOPLE"} />
        <View style={styles.fieldView}>
          <Image
            source={require("../../components/Images/magnifier.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: "grey",
              alignSelf: "center"
            }}
          ></Image>
          <TextInput
            style={styles.nameTextinputview}
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor="#999999"
            autoCapitalize="none"
            value={this.state.search}
            onChangeText={text => this.setState({ search: text })}
          />
        </View>
        <TouchableOpacity onPress={() => Actions.Searchfilter()}>
          <View
            style={{
              backgroundColor: "grey",
              height: moderateScale(45, 0.7),
              width: 200,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 15
            }}
          >
            <Text>Search filter</Text>
          </View>
        </TouchableOpacity>

        <View style={{ alignSelf: "flex-start", flex: 4 }}>
          <Carousel
            style={{ width: width - 100, height: height / 2 }}
            layout={"default"}
            data={searchResult}
            sliderWidth={wp("100%")}
            itemWidth={wp("80%")}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

export default Home;
