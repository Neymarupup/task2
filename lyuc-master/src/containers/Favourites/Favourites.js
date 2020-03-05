import React from "react";
import {
    View, Text, Image, Dimensions, TouchableOpacity, TextInput,
} from "react-native";
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { Container, Tab, Tabs, ScrollableTab, Header} from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppHeader from '../../components/AppHeader';
import LikedTab from '../LikedTab';
import UnlikedTab from '../UnlikedTab';
import MatchedTab from '../MatchedTab';
import Unmatched from '../Unmatched';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class Favourites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <AppHeader
                    headerTitle={'MATCH LIST'}
                />
                <Container>
                    <Tabs renderTabBar={() => <ScrollableTab />} >
                        <Tab heading="Liked" >
                            <LikedTab />
                        </Tab>
                        <Tab heading="Unliked">
                            <UnlikedTab />
                        </Tab>
                        <Tab heading="Matched">
                            <MatchedTab />
                        </Tab>
                        <Tab heading="Unmatched">
                            <Unmatched />
                        </Tab>
                        
                    </Tabs>
                </Container>
            </View>
        );
    }
}

export default Favourites;
