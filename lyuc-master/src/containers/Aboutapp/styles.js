import { StyleSheet,Dimensions } from 'react-native';
var width = Dimensions.get('window').width;

export const COLOR = {
    DARK: "#040207",
    PANTOME: '#ff6f61',
    LIGHT: "#ffffff",
    BLACK: "#000",
    GRAY: "#9A9A9A",
    LIGHT_GRAY: "#ffffff",
    DANGER: "#FF5370",
    RED: "#800000",
    WHITE: "#FFF",
    CYAN: "#09818F",
    LIGHT_ORANGE: "#ff944d"
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

});