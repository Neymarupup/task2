import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput,ScrollView
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import RF from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Termsandcondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <AppHeader
                    headerTitle={'TERMS AND CONDITIONS'}
                    backgo={require("../../components/Images/leftarrow.png")}
                    onPress={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                <View style={{width:width-30,alignSelf:'center',marginTop:15}}>
                    <Text style={{textAlign:'justify'}}>
                    There are many variations of passages of Lorem Ipsum available, 
                    but the majority have suffered alteration in some form, by injected 
                    humour, or randomised words which don't look even slightly believable. 
                    If you are going to use a passage of Lorem Ipsum, you need to be sure
                    there isn't anything embarrassing hidden in the middle of text. 
                    All the Lorem Ipsum generators on the Internet tend to repeat 
                    predefined chunks as necessary, making this the first true generator
                    on the Internet. It uses a dictionary of over 200 Latin words, combined 
                    with a handful of model sentence structures, to generate Lorem Ipsum 
                    which looks reasonable. The generated Lorem Ipsum is therefore always 
                    free from repetition, injected humour, or non-characteristic words etc.
                    All the Lorem Ipsum generators on the Internet tend to repeat 
                    predefined chunks as necessary, making this the first true generator
                    on the Internet. It uses a dictionary of over 200 Latin words, combined 
                    with a handful of model sentence structures, to generate Lorem Ipsum 
                    which looks reasonable. The generated Lorem Ipsum is therefore always 
                    free from repetition, injected humour, or non-characteristic words etc.
                    </Text>
                    <Text style={{textAlign:'justify',marginTop:10}}>
                    There are many variations of passages of Lorem Ipsum available, 
                    but the majority have suffered alteration in some form, by injected 
                    humour, or randomised words which don't look even slightly believable. 
                    If you are going to use a passage of Lorem Ipsum, you need to be sure
                    there isn't anything embarrassing hidden in the middle of text. 
                    All the Lorem Ipsum generators on the Internet tend to repeat 
                    predefined chunks as necessary, making this the first true generator
                    on the Internet. It uses a dictionary of over 200 Latin words, combined 
                    with a handful of model sentence structures, to generate Lorem Ipsum 
                    which looks reasonable. The generated Lorem Ipsum is therefore always 
                    free from repetition, injected humour, or non-characteristic words etc.
                    
                    </Text>
                </View>
                </ScrollView>
            </View>
        );
    }
}


export default Termsandcondition;
