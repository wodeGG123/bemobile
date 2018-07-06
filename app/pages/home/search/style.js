import { StyleSheet, Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    wrap: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 10,
        width: '100%',
        height: 32,
        backgroundColor: '#0C1322',
        borderRadius: 16,
    },
    icon: {
        fontSize: 22,
        marginLeft: 10,
        color: '#868584'
    },
    input: {
        width: '100%',
        fontSize: 14,
        color: '#868584',
        marginLeft: 5,
        borderWidth: 0,
        backgroundColor: 'transparent',
        marginBottom: 0,
        marginTop: 0,
        paddingBottom: 0,
        paddingTop: 0,
    }
});