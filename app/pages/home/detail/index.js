import React, { Component } from 'react';
import {
  Text,
  View,
  WebView,
  Animated,
  Dimensions,
} from 'react-native';
import styles from './style'
import LeftButton from './leftButton/index';
import LoadingOverlay from 'react-native-loading-overlay';
import Title from '../../../components/navTitle/index';
import Header from '../../../components/header/index';
var { height, width } = Dimensions.get('window');

export default class Main extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   //组件在安卓中有bug，headerLeft、headerRight、都要设置，标题才能居中
  //   return {
  //     headerLeft: <LeftButton onPress={() => { navigation.pop() }} />,
  //     headerRight: <View></View>,
  //     headerTitle: <Title>{navigation.state.params.lang && navigation.state.params.lang.detail_title}</Title>,
  //   };
  // }
  static contextTypes = {
    store: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      loadingOverlayVisible: false,
      fadeAnim: new Animated.Value(-width),
      uri: ''
    }
  }
  show(data) {
    let userInfo = this.context.store.getState().userInfo;
    let uri = userInfo.reportUrl + '/' + data.flowId + '/index.html'
    if (uri != this.state.uri) {
      this.setState({
        uri: ''
      }, () => {
        this.setState({
          uri
        })
      })

    }
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 0,        // Target
        duration: 100,    // Configuration
      },
    ).start();             // Don't forget start!
  }
  hide() {
    Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: -width,        // Target
        duration: 100,    // Configuration
      },
    ).start();             // Don't forget start!
  }
  componentWillMount() {

  }
  render() {
    let { i18n: lang } = this.context.store.getState();
    // let uri = this.props.navigation.state.params.reportUrl + '/' + this.props.navigation.state.params.flowId + '/index.html'
    // let uri = 'http://10.0.5.60:8388/sae/static/report/37e9ade5b8914136bb66b7a6ed03b169/index.html'
    //在详情中展示webView
    console.log(this.props.detailPreLoad)
    return (
      <Animated.View style={[styles.container, { left: this.state.fadeAnim }]}>
        <Header
          left={<LeftButton onPress={() => { this.hide() }} />}
        />
        <WebView
          style={styles.webView}
          source={{ uri: this.state.uri }}
          scalesPageToFit={true}
        // onLoadStart={() => { this.setState({ loadingOverlayVisible: true }) }}
        // onLoadEnd={() => { this.setState({ loadingOverlayVisible: false }) }}
        />
        <LoadingOverlay visible={this.state.loadingOverlayVisible} />
      </Animated.View>
    );
  }
}

