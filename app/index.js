import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import RouterMaster from './routers'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import Orientation from 'react-native-orientation';//屏幕旋转插件


var store = createStore(reducers);//创建store

export default class Main extends Component {
  componentWillMount(){
    Orientation.lockToPortrait();//锁定竖屏
  }
  render() {
    //app入口并且设置全局store
    return (<Provider store={store}><RouterMaster /></Provider>);
  }
}
