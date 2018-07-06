import { StyleSheet, Dimensions, Platform } from 'react-native';
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: 0,
        backgroundColor: '#131D33',
    },
    scanAllWrap: {
        height: 40,
        width,
        backgroundColor: '#162540',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,

    },
    scanAllText: {
        color: '#F6B710',
        fontSize: 14,
    },
    scanAllIcon: {
        fontSize: 18,
        color: '#F6B710',
        marginLeft: 6,
    },
    listWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        flexWrap: 'wrap',
    },
    scanAllPlaceholder: {
        width,
        height: Platform.OS == 'ios' ? 64 : 40,
        backgroundColor: 'transparent',
    }
});