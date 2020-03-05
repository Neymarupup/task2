import { StyleSheet,Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {RFPercentage} from "react-native-responsive-fontsize";

var width = Dimensions.get('window').width; //full width
export default StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'#fff',
    },
    emailText: {
      color: '#999999',
      marginLeft: verticalScale(10),
      marginTop: verticalScale(10),
      fontWeight: '500',
      fontSize: RFPercentage(2.5)
    },
    fieldView:{
        backgroundColor: '#fff',
        width:('88%'),
        height:moderateScale(45, 0.7),
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'grey',
        marginTop: 10,
      },
      nameTextinputview:{
        alignSelf: 'center', 
        marginLeft:10,
        fontSize:17,
        width:('90%'),
      },
      passwordText:{
        color: '#999999', 
        marginLeft: verticalScale(10), 
        marginTop: verticalScale(15), 
        fontWeight: '500',
        fontSize:RFPercentage(2.5)
      },
      loginView:{
        width: width / 2 + 20,
        height: moderateScale(45, 0.7),
        borderRadius: moderateScale(15),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        marginTop: verticalScale(40),
      }

});