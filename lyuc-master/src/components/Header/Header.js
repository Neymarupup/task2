import React, { Component } from "react";
import { Header, Left, Icon as NativeIcon, Button, Body, Title, Right,Picker,TextInput} from 'native-base';
import { View,TouchableOpacity,Text,Image } from "react-native";
import { COLOR } from "../config/styles";
import Icon from "react-native-vector-icons/FontAwesome";
//import { SearchBar } from 'react-native-elements';

import { NavigationActions } from 'react-navigation';
//import { Actions } from 'react-native-router-flux';
//import {Home}  from "../screens/home";
//import * as Animatable from 'react-native-animatable';


const navigation=this.props

const DrawerHeader = props => {
console.log(props)
    console.log("Check header value")
    
    return (
        <View>
            {/* transparent androidStatusBarColor={COLOR.DARK}  */}
            <Header style={{ backgroundColor: COLOR.PANTOME }}>
                <Left>
                    <Button transparent onPress={() => props.onPress()}>
                        <NativeIcon name={props.icon} />
                    </Button>
                </Left>
                <Body>
                    {/* <Title>{props.headerTitle}</Title> */}
                    <View style={{ width: 100, marginBottom:4}}>
                        <Picker
                            selectedValue={props.name}
                            style={{ height: 45, width: 90 }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) => { props.show(itemValue, itemIndex) } }
                        >
                            <Picker.Item label="Men" value="men" />
                            <Picker.Item label="Women" value="women" />
                        </Picker>


                    </View>

                
                </Body>
                <Right style={{}}>
                <View style={{ marginTop: 10, flexDirection: 'row',marginBottom:5, }}>
               <TouchableOpacity onClick={() => NavigationActions.navigate('Search')} >
                <Icon style={{marginRight:12}} name="search" color='white' size={24}  /></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Shoppingbag')}>
                <Icon style={{marginRight:8}} name="shopping-bag" color='white' size={24}/>
                </TouchableOpacity>
                    </View>
                </Right>
                
            </Header>
        </View>
    )
}

export default DrawerHeader
