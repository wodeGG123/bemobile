import { combineReducers } from 'redux';
import userInfo from './user'
import device from './device'


//引入reducers合并
export default combineReducers({
    userInfo,
    device
});