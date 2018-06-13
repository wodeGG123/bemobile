import { combineReducers } from 'redux';
import userInfo from './user'
import device from './device'
import i18n from './i18n'


//引入reducers合并
export default combineReducers({
    userInfo,
    device,
    i18n
});