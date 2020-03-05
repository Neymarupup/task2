import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        height:('7%'),
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
        width:('88%'),
      },

});