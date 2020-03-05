import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {RFPercentage} from "react-native-responsive-fontsize";

export default StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'#fff',
    },
    emailText: {
      color: '#999999',
      marginLeft: verticalScale(10),
      marginTop: verticalScale(20),
      fontWeight: '500',
      fontSize:  RFPercentage(2.5)
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
      emailvalText:{
        flexDirection: 'row',
        marginTop: verticalScale(20),
        marginLeft: verticalScale(40)
      },
      valImages:{
        height: 20, 
        width: 20,
      },
      passwordText:{
        color: '#999999', 
        marginLeft: verticalScale(10), 
        marginTop: verticalScale(30), 
        fontWeight: '500',
        fontSize: RFPercentage(2.5)
      },
      sixcharvalText:{
        flexDirection: 'row',
        marginTop: verticalScale(10),
        marginLeft: verticalScale(40)
      },
      valText:{
        flexDirection: 'row',
        marginTop: verticalScale(10),
        marginLeft: verticalScale(40)
      },
      checkpwdText:{
        color: '#999999', 
        alignSelf: 'center', 
        marginLeft: verticalScale(10),
        fontSize:RFPercentage(2.2)
      },
      pwdStrength:{
        color:'#999999',
        fontStyle:'italic',
        marginLeft:verticalScale(40),
        marginTop:verticalScale(20),
      },
      mediumText:{
        color:'#ff8c1a',
        fontStyle:'normal'
      }

});