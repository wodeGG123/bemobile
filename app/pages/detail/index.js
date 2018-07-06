import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
} from 'react-native';
import styles from './style'
import LeftButton from './leftButton/index';
import LoadingOverlay from 'react-native-loading-overlay';
import Title from '../../components/navTitle/index';

export default class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    //组件在安卓中有bug，headerLeft、headerRight、都要设置，标题才能居中
    return {
      headerLeft: <LeftButton onPress={() => { navigation.pop() }} />,
      headerRight: <View></View>,
      headerTitle: <Title>{navigation.state.params.lang && navigation.state.params.lang.detail_title}</Title>,
    };
  }
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      loadingOverlayVisible: false,
    }
  }
  componentWillMount() {
    let { i18n: lang } = this.context.store.getState();
    this.props.navigation.setParams({ lang });
  }
  render() {
    console.log(this.context.store.getState())
    // http://10.0.6.24:8488/cas/login?service=http%3A%2F%2F10.0.5.63%3A8388%2Fsae%2Fj_security_check&token=1530687815569&locale=zh_CN&executor=http%3A%2F%2F10.0.5.63%3A8388%2Fsae%2Fstatic%2Frunner%2Findex.html%23%2F5a8caea555b24f64b7b1ef122f143556%2Fea45990ea8d84b6db0a03230e7d056ec
    // let uri = this.props.navigation.state.params.reportUrl + '/' + this.props.navigation.state.params.flowId + '/index.html'
    let uri = this.props.navigation.state.params.reportUrl + '/' + this.props.navigation.state.params.flowId + '/index.html'

    //在详情中展示webView
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          source={{ uri }}
          scalesPageToFit={true}
        // onLoadStart={()=>{this.setState({loadingOverlayVisible:true})}}
        // onLoadEnd={()=>{this.setState({loadingOverlayVisible:false})}}
        />
        <LoadingOverlay visible={this.state.loadingOverlayVisible} />
      </View>
    );
  }
}

