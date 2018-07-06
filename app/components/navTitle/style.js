import { StyleSheet, Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#F6B610',
        fontWeight: 'bold'
    }
});