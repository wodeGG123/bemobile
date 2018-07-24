import { StyleSheet, Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    leftWrap: {
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIcon: {
        color: '#F6B610',
        fontSize: 22,
        marginLeft: 10,
    },
});