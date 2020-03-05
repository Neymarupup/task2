import { StyleSheet,Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { verticalScale,moderateScale} from 'react-native-size-matters';

var width = Dimensions.get('window').width; //full width

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:'#fff',
    },
    container: {
        flex:1,
        backgroundColor: "blue",
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    fieldView:{
        backgroundColor: '#fff',
        width: wp('95%'),
        height: hp('7%'),
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'grey',
        marginTop: 20,
      },
      nameTextinputview:{
        alignSelf: 'center', 
        marginLeft:10,
        fontSize:16,
        color:'#999999',
        width: wp('90%'),
      },
      createAccbtn:{
        width: width / 2 + 20,
        height: moderateScale(45, 0.7),
        borderRadius: moderateScale(15),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        marginTop: verticalScale(50)
      },
      dialoge:{
        width: width / 2 + 20,
        height: moderateScale(45, 0.7),
        borderRadius: moderateScale(15),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        marginTop: verticalScale(40)
      },

});