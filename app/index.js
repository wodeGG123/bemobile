import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import RouterMaster from './routers'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import Orientation from 'react-native-orientation';//屏幕旋转插件
import config from './config/index';
import i18n from './statics/i18n/index';


var store = createStore(reducers);//创建store

//app wrap , you can init app in this component
class AppWrap extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    Orientation.lockToPortrait();//锁定竖屏
    //设置国际化，默认是中文，配置文件在config内
    this.context.store.dispatch({
      type: 'SET_LANGUAGE',
      data: i18n(config.LANGUAGE)
    })
  }
  render() {
    return (this.props.children)
  }
}

export default class Main extends Component {
  render() {
    //app入口并且设置全局store
    return (<Provider store={store}><AppWrap><RouterMaster /></AppWrap></Provider>);
  }
}
