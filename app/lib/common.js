import DeviceInfo from 'react-native-device-info';
import {
    NativeModules
} from 'react-native';
export default {
    getDevice: () => {
        let info = DeviceInfo.getModel();
        let info2 = DeviceInfo.getUserAgent();
        //平板
        if (info.indexOf('Pad') >= 0) {
            return 'tablet'
        }
        if (info2.indexOf('Pad') >= 0) {
            return 'tablet'
        }
        //手机
        if (info.indexOf('iPhone') >= 0) {
            return 'mobile'
        }
        if (info2.indexOf('iPhone') >= 0) {
            return 'mobile'
        }
        if (info2.indexOf('Mobile') >= 0) {
            return 'mobile'
        }
        return 'undefind'
    }
}