import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        flex:1,
        backgroundColor:'#fff',
    },
    container: {
        flex:1,
        backgroundColor:'#fff',
    },
    welcome: {
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    fieldView:{
        backgroundColor: '#f2f2f2',
        width:('88%'),
        height:40,
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'grey',
        marginTop: 10,
      },
      nameTextinputview:{
        alignSelf: 'center', 
        marginLeft:10,
        fontSize:16,
        width:('90%'),
      },
      lastnameoccupation:{
        backgroundColor: '#f2f2f2',
        width:('88%'),
        height:40,
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'grey',
        marginTop: 10,
      },
      lastnameinputview:{
        alignSelf: 'center', 
        marginLeft:10,
        fontSize:16,
        width:('90%'),
      },
      addressView:{
        backgroundColor: '#f2f2f2',
        width:('88%'),
        height:40,
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'grey',
        marginTop: 10,
      },
      aboutMe:{
        backgroundColor: '#f2f2f2',
        width:('88%'),
        height:100,
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'grey',
        marginTop: 10,
        padding:5
      },
      aboutmeinputview:{
        marginLeft:10,
        fontSize:16,
        width:('90%'),
      },
});