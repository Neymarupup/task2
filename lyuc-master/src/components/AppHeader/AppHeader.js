import React from 'react';
import {
  Body,
  Header,
  Left,
  Right,
  Title
} from 'native-base';
import { TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"


class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onPress, headerTitle, userimg, userprofile, notification,
       profile, backgo,image1,drawer,date } = this.props;
    return (

      <Header androidStatusBarColor ="#000"
      style={{ backgroundColor: '#000', borderBottomWidth:0 }}>
        <Left style={{ flex: 1 }}>
        {backgo !== undefined && 
          <TouchableOpacity onPress={onPress} >
            <Image source={backgo}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                tintColor: '#fff',
              }}>
            </Image>
          </TouchableOpacity>
        }
          {image1 !== undefined && 
          <TouchableOpacity onPress={drawer} >
            <Image source={image1}
              style={{
                width: 20,
                height: 25,
                marginLeft: 10,

              }}>
            </Image>
          </TouchableOpacity>
          }
        </Left>
        <View style={{
          flex: 3,
          justifyContent: 'center',
          alignContent: 'center'
        }}>
          <Title style={{
            color: '#fff',
            textAlign: "center",
            fontFamily:'DepotTrapharet',
            fontSize:RFPercentage(4)
          }}>
            {headerTitle}
          </Title>
          {date != undefined && 
          <Title style={{
            color: '#fff',
            textAlign: "center",
            fontSize:12
          }}>
            {date}
          </Title>
          }
        </View>
        <Right style={{ flexDirection: 'row', flex: 1, }}>
          <TouchableOpacity 
          style={{alignSelf:'center'}}
          onPress={notification} >
            <Image source={userimg}
              style={{
                width: 16,
                height: 16,
                marginRight: 20,
                tintColor: '#fff'
              }}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity 
          style={{alignSelf:'center'}}
          onPress={profile} >
            <Image source={userprofile}
              style={{ width: 22, height: 22, marginRight: 10,tintColor:"#fff" }}>
            </Image>
          </TouchableOpacity>

        </Right>

      </Header>

    );
  }
}

AppHeader.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.string,
  onPressRight: PropTypes.func,
  iconRight: PropTypes.string,
  headerTitle: PropTypes.string.isRequired
};

export default AppHeader;